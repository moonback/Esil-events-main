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


//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

//     const token = authHeader.split(' ')[1];
//     const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token);
    
//     if (!session || new Date(session.expires_at) < new Date()) {
//       return res.status(401).json({ error: 'Session expired' });
//     }

//     const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(session.user_id);
//     res.json(user);

//   } catch (error) {
//     console.error('Current user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.post('/api/auth/signup', async (req, res) => {
//   const MAX_RETRIES = 3;
//   const RETRY_DELAY = 100;
//   let userId, sessionToken;
  
//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//     try {
//       const { email, password } = req.body;
      
//       const transaction = db.transaction(() => {
//         const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        
//         if (existingUser) {
//           throw new Error('User already exists');
//         }

//         const hashedPassword = bcrypt.hashSync(password, 10);
//         userId = uuidv4();
//         sessionToken = uuidv4();
        
//         db.prepare('INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)')
//           .run(userId, email, hashedPassword, 'user');
//       });
      
//       transaction();
//       break;
//     } catch (error) {
//       if (error.code === 'SQLITE_BUSY' && attempt < MAX_RETRIES) {
//         await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
//         continue;
//       }
      
//       if (error.message === 'User already exists') {
//         return res.status(400).json({ error: error.message });
//       }
      
//       console.error('Signup error:', error);
//       return res.status(500).json({ 
//         error: 'Database error', 
//         code: error.code,
//         message: error.message 
//       });
//     }
//   }

//   try {
//     const expiresAt = new Date(Date.now() + 86400 * 1000); // 24 hours
    
//     db.prepare('INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)')
//       .run(uuidv4(), userId, sessionToken, expiresAt.toISOString());

//     res.status(201).json({
//       user: { id: userId, email: req.body.email, role: 'user' },
//       token: sessionToken
//     });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// app.post('/api/auth/signout', (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

//     const token = authHeader.split(' ')[1];
//     db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
//     res.json({ success: true });

//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Logout failed' });
//   }
// });

// Start server
app.listen(3007, () => {
  console.log('Server running on http://localhost:3007');
});


const db = new Database('database.sqlite');

// Initialize database schema
db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    order_index INTEGER,
    created_at DATETIME,
    updated_at DATETIME
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS subcategories (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    order_index INTEGER,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS subsubcategories (
    id TEXT PRIMARY KEY,
    subcategory_id TEXT NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    order_index INTEGER,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY(subcategory_id) REFERENCES subcategories(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    slug TEXT,
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    category_id TEXT NOT NULL,
    subcategory_id TEXT,
    subsubcategory_id TEXT,
    description TEXT,
    price_ht REAL CHECK (price_ht >= 0),
    price_ttc REAL CHECK (price_ttc >= 0),
    images TEXT CHECK (json_valid(images) OR images IS NULL),
    technical_specs TEXT CHECK (json_valid(technical_specs) OR technical_specs IS NULL),
    technical_doc_url TEXT,
    video_url TEXT,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    is_available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY(subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
    FOREIGN KEY(subsubcategory_id) REFERENCES subsubcategories(id) ON DELETE SET NULL
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
    const categories = db.prepare(`
      SELECT 
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug,
        c.order_index as category_order,
        c.created_at as category_created,
        c.updated_at as category_updated,
        s.id as sub_id,
        s.name as sub_name,
        s.slug as sub_slug,
        s.order_index as sub_order,
        s.created_at as sub_created,
        s.updated_at as sub_updated,
        ss.id as subsub_id,
        ss.name as subsub_name,
        ss.slug as subsub_slug,
        ss.order_index as subsub_order,
        ss.created_at as subsub_created,
        ss.updated_at as subsub_updated
      FROM categories c
      LEFT JOIN subcategories s ON s.category_id = c.id
      LEFT JOIN subsubcategories ss ON ss.subcategory_id = s.id
      ORDER BY 
        c.order_index, 
        s.order_index, 
        ss.order_index
    `).all();

    console.log('Database query result:', categories);
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/categories', (req, res) => {
  try {
    const { name, slug, order_index } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO categories (id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, slug, order_index || 0, now, now);

    res.status(201).json({
      id,
      name,
      slug,
      order_index: order_index || 0,
      created_at: now,
      updated_at: now
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
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

// Product endpoints
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    const formattedProducts = products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]'),
      colors: product.colors ? JSON.parse(product.colors) : undefined,
      relatedProducts: product.relatedProducts ? JSON.parse(product.relatedProducts) : undefined,
      technicalSpecs: JSON.parse(product.technical_specs || '{}')
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images || '[]'),
      colors: product.colors ? JSON.parse(product.colors) : undefined,
      relatedProducts: product.relatedProducts ? JSON.parse(product.relatedProducts) : undefined,
      technicalSpecs: JSON.parse(product.technical_specs || '{}')
    };
    res.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const productData = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    const product = {
      id,
      ...productData,
      created_at: now,
      updated_at: now,
      images: JSON.stringify(productData.images || []),
      colors: productData.colors ? JSON.stringify(productData.colors) : null,
      relatedProducts: productData.relatedProducts ? JSON.stringify(productData.relatedProducts) : null,
      technical_specs: JSON.stringify(productData.technicalSpecs || {})
    };

    db.exec("ALTER TABLE products ADD COLUMN slug TEXT");
    const stmt = db.prepare(`
      INSERT INTO products (
        id, name, slug, reference, category_id, subcategory_id, subsubcategory_id,
        description, price_ht, price_ttc, images, colors, related_products,
        technical_specs, technical_doc_url, video_url, stock, is_available,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      product.slug,
      product.id,
      product.name,
      product.slug,
      product.reference,
      product.category_id,
      product.subcategory_id,
      product.subsubcategory_id,
      product.description,
      product.price_ht,
      product.price_ttc,
      product.images,
      product.colors,
      product.relatedProducts,
      product.technical_specs,
      product.technical_doc_url,
      product.video_url,
      product.stock,
      product.is_available ? 1 : 0,
      product.created_at,
      product.updated_at
    );

    res.status(201).json({
      ...productData,
      id,
      created_at: now,
      updated_at: now
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const now = new Date().toISOString();

    const product = {
      ...productData,
      updated_at: now,
      images: JSON.stringify(productData.images || []),
      colors: productData.colors ? JSON.stringify(productData.colors) : null,
      relatedProducts: productData.relatedProducts ? JSON.stringify(productData.relatedProducts) : null,
      technical_specs: JSON.stringify(productData.technicalSpecs || {})
    };

    db.prepare(`
      UPDATE products SET
        name = ?, reference = ?, category_id = ?, subcategory_id = ?, subsubcategory_id = ?,
        description = ?, price_ht = ?, price_ttc = ?, images = ?, colors = ?,
        related_products = ?, technical_specs = ?, technical_doc_url = ?, video_url = ?,
        stock = ?, is_available = ?, updated_at = ?
      WHERE id = ?
    `).run(
      product.name,
      product.reference,
      product.category_id,
      product.subcategory_id,
      product.subsubcategory_id,
      product.description,
      product.price_ht,
      product.price_ttc,
      product.images,
      product.colors,
      product.relatedProducts,
      product.technical_specs,
      product.technical_doc_url,
      product.video_url,
      product.stock,
      product.is_available ? 1 : 0,
      product.updated_at,
      id
    );

    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const formattedProduct = {
      ...updatedProduct,
      images: JSON.parse(updatedProduct.images || '[]'),
      colors: updatedProduct.colors ? JSON.parse(updatedProduct.colors) : undefined,
      relatedProducts: updatedProduct.relatedProducts ? JSON.parse(updatedProduct.relatedProducts) : undefined,
      technicalSpecs: JSON.parse(updatedProduct.technical_specs || '{}')
    };
    res.json(formattedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
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
    console.log('Creating new subcategory:', req.body);
    const { category_id, name, slug, order_index } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO subcategories (id, category_id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, category_id, name, slug, order_index || 0, now, now);

    console.log('Subcategory created successfully:', { id, category_id, name, slug });
    res.json({ id, category_id, name, slug, order_index: order_index || 0, created_at: now, updated_at: now });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
});

// Update a subcategory
app.put('/api/subcategories/:id', (req, res) => {
  try {
    console.log('Updating subcategory:', { id: req.params.id, updates: req.body });
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
    console.log('Subcategory updated successfully:', subcategory);
    res.json(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
});

// Delete a subcategory
app.delete('/api/subcategories/:id', (req, res) => {
  try {
    console.log('Deleting subcategory:', req.params.id);
    const { id } = req.params;
    db.prepare('DELETE FROM subcategories WHERE id = ?').run(id);
    console.log('Subcategory deleted successfully');
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
    console.log('Creating new subsubcategory:', req.body);
    const { subcategory_id, name, slug, order_index } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO subsubcategories (id, subcategory_id, name, slug, order_index, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, subcategory_id, name, slug, order_index || 0, now, now);

    console.log('Subsubcategory created successfully:', { id, subcategory_id, name, slug });
    res.json({ id, subcategory_id, name, slug, order_index: order_index || 0, created_at: now, updated_at: now });
  } catch (error) {
    console.error('Error creating subsubcategory:', error);
    res.status(500).json({ error: 'Failed to create subsubcategory' });
  }
});

// Update a subsubcategory
app.put('/api/subsubcategories/:id', (req, res) => {
  try {
    console.log('Updating subsubcategory:', { id: req.params.id, updates: req.body });
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
    console.log('Subsubcategory updated successfully:', subsubcategory);
    res.json(subsubcategory);
  } catch (error) {
    console.error('Error updating subsubcategory:', error);
    res.status(500).json({ error: 'Failed to update subsubcategory' });
  }
});

// Delete a subsubcategory
app.delete('/api/subsubcategories/:id', (req, res) => {
  try {
    console.log('Deleting subsubcategory:', req.params.id);
    const { id } = req.params;
    db.prepare('DELETE FROM subsubcategories WHERE id = ?').run(id);
    console.log('Subsubcategory deleted successfully');
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