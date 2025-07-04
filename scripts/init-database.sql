-- Create projects table for gallery
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create consultations table for form submissions
CREATE TABLE IF NOT EXISTS consultations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  needs TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq')
ON CONFLICT (username) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (name, category, image_url, description) VALUES
('Gedung Perkantoran Modern', 'Pembangunan', '/placeholder.svg?height=300&width=400', 'Pembangunan gedung perkantoran 15 lantai dengan desain modern'),
('Renovasi Rumah Klasik', 'Renovasi', '/placeholder.svg?height=300&width=400', 'Renovasi total rumah klasik dengan sentuhan modern'),
('Pemeliharaan Jembatan', 'Pemeliharaan', '/placeholder.svg?height=300&width=400', 'Pemeliharaan rutin jembatan layang kota')
ON CONFLICT DO NOTHING;
