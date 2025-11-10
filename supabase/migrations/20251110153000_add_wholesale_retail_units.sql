-- Add wholesale_unit and retail_unit columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS wholesale_unit TEXT,
ADD COLUMN IF NOT EXISTS retail_unit TEXT;

-- Update table comment
COMMENT ON TABLE public.products IS 'Pharmacy product inventory with separate wholesale and retail units';