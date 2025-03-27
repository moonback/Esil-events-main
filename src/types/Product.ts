export interface Product {
  id: string;
  name: string;
  reference: string;
  category_id: string;
  subcategory_id?: string;
  subsubcategory_id?: string;
  description: string;
  price_ht: number;
  price_ttc: number;
  images: string[];
  colors?: string[];
  related_products?: string[];
  technical_specs: Record<string, any>;
  technical_doc_url?: string;
  video_url?: string;
  stock: number;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductFormData extends Omit<Product, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
}


