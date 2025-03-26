INSERT INTO users (email, password_hash, role) VALUES ('admin@example.com', crypt('adminpassword', gen_salt('bf')), 'admin');
-- Vérifier l'unicité de l'email avant insertion
INSERT INTO users (email, password_hash, role)
SELECT 'admin@example.com', crypt('adminpassword', gen_salt('bf')), 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');