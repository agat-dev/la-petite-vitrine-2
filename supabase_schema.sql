-- Table: customers
CREATE TABLE customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  firstName text,
  lastName text,
  phone text,
  password text NOT NULL,
  createdAt timestamptz DEFAULT now()
);

-- Table: orders
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customerId uuid REFERENCES customers(id),
  pack jsonb,
  maintenance jsonb,
  formData jsonb,
  totalPrice numeric,
  status text,
  createdAt timestamptz DEFAULT now()
);

-- Table: packs
CREATE TABLE packs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  description text,
  price numeric
);

-- Table: maintenance_options
CREATE TABLE maintenance_options (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  description text,
  price numeric
);

-- Table: social_options
CREATE TABLE social_options (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  description text,
  price numeric
);
