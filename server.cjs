const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure JSON parsing
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.end();
  }
});

// JSON parsing error middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Authentication routes
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 86400 * 1000); // 24 hours
    
    db.prepare('INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)')
      .run(uuidv4(), user.id, sessionToken, expiresAt.toISOString());

    res.json({ 
      user: { id: user.id, email: user.email, role: user.role },
      token: sessionToken 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/auth/current-user', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token);
    
    if (!session || new Date(session.expires_at) < new Date()) {
      return res.status(401).json({ error: 'Session expired' });
    }

    const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(session.user_id);
    res.json(user);

  } catch (error) {
    console.error('Current user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint pour créer des catégories
app.post('/api/categories', async (req, res) => {
  try {
    const { name, slug, order_index } = req.body;
    
    // Validation des données
    if (!name || !slug || typeof order_index !== 'number') {
      return res.status(400).json({ error: 'Invalid category data' });
    }

    const result = db.prepare(
      'INSERT INTO categories (id, name, slug, order_index) VALUES (?, ?, ?, ?)'
    ).run(uuidv4(), name, slug, order_index);

    res.status(201).json({
      id: uuidv4(),
      name,
      slug,
      order_index,
      created_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Category creation error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Category creation failed',
        details: error.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 100;
  let userId, sessionToken;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { email, password } = req.body;
      
      const transaction = db.transaction(() => {
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        userId = uuidv4();
        sessionToken = uuidv4();
        
        db.prepare('INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)')
          .run(userId, email, hashedPassword, 'user');
      });
      
      transaction();
      break;
    } catch (error) {
      if (error.code === 'SQLITE_BUSY' && attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        continue;
      }
      
      if (error.message === 'User already exists') {
        return res.status(400).json({ error: error.message });
      }
      
      console.error('Signup error:', error);
      return res.status(500).json({ 
        error: 'Database error', 
        code: error.code,
        message: error.message 
      });
    }
  }

  try {
    const expiresAt = new Date(Date.now() + 86400 * 1000); // 24 hours
    
    db.prepare('INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)')
      .run(uuidv4(), userId, sessionToken, expiresAt.toISOString());

    res.status(201).json({
      user: { id: userId, email: req.body.email, role: 'user' },
      token: sessionToken
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/signout', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    res.json({ success: true });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Start server
app.listen(3006, () => {
  console.log('Server running on http://localhost:3006');
});


const db = new Database('database.sqlite');

// Initialize database schema
db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    order_index INTEGER NOT NULL,
    created_at TEXT,
    updated_at TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    reference TEXT NOT NULL,
    category TEXT,
    sub_category TEXT,
    sub_sub_category TEXT,
    description TEXT,
    price_ht REAL,
    price_ttc REAL,
    images TEXT,
    technical_specs TEXT,
    technical_doc_url TEXT,
    video_url TEXT,
    stock INTEGER,
    is_available BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`).run();

// Categories endpoints
app.get('/api/categories', (req, res) => {
  try {
    res.header('Content-Type', 'application/json');
    
    const categories = db.prepare('SELECT * FROM categories ORDER BY order_index').all();
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
app.post('/api/categories', (req, res) => {
  try {
    const { name, slug, order_index } = req.body;
    
    // Vérifier si le slug existe déjà
    const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug);
    if (existing) {
      return res.status(400).json({ error: 'Ce slug est déjà utilisé' });
    }
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO categories (id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, slug, order_index || 0, now, now);

    res.json({ id, name, slug, order_index: order_index || 0, created_at: now, updated_at: now });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Échec de la création - vérifiez les données et l\'unicité du slug' });
  }
});

// Update a category
app.put('/api/categories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const now = new Date().toISOString();

    const setClause = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(updates), now, id];

    db.prepare(`
      UPDATE categories
      SET ${setClause}, updated_at = ?
      WHERE id = ?
    `).run(values);

    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category
app.delete('/api/categories/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Reorder categories
app.post('/api/categories/reorder', (req, res) => {
  try {
    const { orderedIds } = req.body;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE categories
      SET order_index = ?, updated_at = ?
      WHERE id = ?
    `);

    orderedIds.forEach((id, index) => {
      stmt.run(index, now, id);
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering categories:', error);
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

// Create a new subcategory
app.post('/api/subcategories', (req, res) => {
  try {
    const { category_id, name, slug, order_index } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO subcategories (id, category_id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, category_id, name, slug, order_index || 0, now, now);

    res.json({ id, category_id, name, slug, order_index: order_index || 0, created_at: now, updated_at: now });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
});

// Update a subcategory
app.put('/api/subcategories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const now = new Date().toISOString();

    const setClause = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(updates), now, id];

    db.prepare(`
      UPDATE subcategories
      SET ${setClause}, updated_at = ?
      WHERE id = ?
    `).run(values);

    const subcategory = db.prepare('SELECT * FROM subcategories WHERE id = ?').get(id);
    res.json(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
});

// Delete a subcategory
app.delete('/api/subcategories/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM subcategories WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
});

// Reorder subcategories
app.post('/api/subcategories/reorder', (req, res) => {
  try {
    const { categoryId, orderedIds } = req.body;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE subcategories
      SET order_index = ?, updated_at = ?
      WHERE id = ? AND category_id = ?
    `);

    orderedIds.forEach((id, index) => {
      stmt.run(index, now, id, categoryId);
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering subcategories:', error);
    res.status(500).json({ error: 'Failed to reorder subcategories' });
  }
});

// Create a new subsubcategory
app.post('/api/subsubcategories', (req, res) => {
  try {
    const { subcategory_id, name, slug, order_index } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO subsubcategories (id, subcategory_id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, subcategory_id, name, slug, order_index || 0, now, now);

    res.json({ id, subcategory_id, name, slug, order_index: order_index || 0, created_at: now, updated_at: now });
  } catch (error) {
    console.error('Error creating subsubcategory:', error);
    res.status(500).json({ error: 'Failed to create subsubcategory' });
  }
});

// Update a subsubcategory
app.put('/api/subsubcategories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const now = new Date().toISOString();

    const setClause = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(updates), now, id];

    db.prepare(`
      UPDATE subsubcategories
      SET ${setClause}, updated_at = ?
      WHERE id = ?
    `).run(values);

    const subsubcategory = db.prepare('SELECT * FROM subsubcategories WHERE id = ?').get(id);
    res.json(subsubcategory);
  } catch (error) {
    console.error('Error updating subsubcategory:', error);
    res.status(500).json({ error: 'Failed to update subsubcategory' });
  }
});

// Delete a subsubcategory
app.delete('/api/subsubcategories/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM subsubcategories WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting subsubcategory:', error);
    res.status(500).json({ error: 'Failed to delete subsubcategory' });
  }
});

// Reorder subsubcategories
app.post('/api/subsubcategories/reorder', (req, res) => {
  try {
    const { subcategoryId, orderedIds } = req.body;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE subsubcategories
      SET order_index = ?, updated_at = ?
      WHERE id = ? AND subcategory_id = ?
    `);

    orderedIds.forEach((id, index) => {
      stmt.run(index, now, id, subcategoryId);
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering subsubcategories:', error);
    res.status(500).json({ error: 'Failed to reorder subsubcategories' });
  }
});

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const { category, subCategory, id } = req.query;
    
    if (id) {
      const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
      return res.json(product);
    }

    if (category && subCategory) {
      const products = db.prepare(
        'SELECT * FROM products WHERE category = ? AND sub_category = ? ORDER BY created_at DESC'
      ).all(category, subCategory);
      return res.json(products);
    }

    if (category) {
      const products = db.prepare(
        'SELECT * FROM products WHERE category = ? ORDER BY created_at DESC'
      ).all(category);
      return res.json(products);
    }

    const allProducts = db.prepare('SELECT * FROM products').all();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const product = {
      ...req.body,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.prepare(
      'INSERT INTO products (id, name, reference, category, sub_category, sub_sub_category, '
      + 'description, price_ht, price_ttc, images, technical_specs, technical_doc_url, video_url, '
      + 'stock, is_available, created_at, updated_at) '
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(Object.values(product));

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const updates = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    const fields = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(updates), req.params.id];

    db.prepare(
      `UPDATE products SET ${fields} WHERE id = ?`
    ).run(values);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Authentication endpoints
app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Create user
    const userId = uuidv4();
    const now = new Date().toISOString();

    db.prepare(
      'INSERT INTO users (id, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(userId, email, passwordHash, 'user', now, now);

    // Create session
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    db.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)'
    ).run(uuidv4(), userId, token, expiresAt.toISOString());

    const responseData = {
      user: { id: userId, email, role: 'user' },
      token
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/api/auth/signin', (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    db.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)'
    ).run(uuidv4(), user.id, token, expiresAt.toISOString());

    const responseData = {
      user: { id: user.id, email: user.email, role: user.role },
      token
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error during signin:', error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// Current user endpoint
app.get('/api/auth/current-user', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const session = db.prepare(
      'SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime()'
    ).get(token);

    if (!session) return res.status(401).json({ error: 'Invalid or expired token' });

    const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(session.user_id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
});

// Admin check endpoint
app.get('/api/auth/is-admin', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.json({ isAdmin: false });

    const session = db.prepare(
      'SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime()'
    ).get(token);

    if (!session) return res.json({ isAdmin: false });

    const user = db.prepare('SELECT role FROM users WHERE id = ?').get(session.user_id);
    res.json({ isAdmin: user?.role === 'admin' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check admin status' });
  }
});

// Sign out endpoint
app.post('/api/auth/signout', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ error: 'No token provided' });

    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Error during signout:', error);
    return res.status(500).json({ error: 'Failed to sign out' });
  }
});

const PORT = 3006; // Change to an available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});