-- Add image_url column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update table comment
COMMENT ON TABLE public.products IS 'Pharmacy product inventory with separate wholesale and retail units and optional product images';