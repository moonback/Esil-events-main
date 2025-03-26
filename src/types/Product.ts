export interface Product {
  id: string;
  name: string;
  reference: string;
  category: string;
  subCategory: string;
  subSubCategory: string;
  description: string;
  priceHT: number;
  priceTTC: number;
  images: string[];
  colors?: string[];
  relatedProducts?: string[];
  technicalSpecs: Record<string, string>;
  technicalDocUrl: string | null | undefined;
  videoUrl: string | null | undefined;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  subSubCategories: SubSubCategory[];
}

export interface SubSubCategory {
  id: string;
  name: string;
  slug: string;
}

export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Mobilier & Déco',
    slug: 'mobilier',
    subCategories: [
      {
        id: '1-1',
        name: 'Tables',
        slug: 'tables',
        subSubCategories: [
          { id: '1-1-1', name: 'Tables basses', slug: 'tables-basses' },
          { id: '1-1-2', name: 'Tables hautes', slug: 'tables-hautes' },
          { id: '1-1-3', name: 'Tables de repas', slug: 'tables-repas' }
        ]
      },
      {
        id: '1-2',
        name: 'Chaises',
        slug: 'chaises',
        subSubCategories: [
          { id: '1-2-1', name: 'Chaises de repas', slug: 'chaises-repas' },
          { id: '1-2-2', name: 'Tabourets', slug: 'tabourets' },
          { id: '1-2-3', name: 'Fauteuils', slug: 'fauteuils' }
        ]
      },
      {
        id: '1-3',
        name: 'Canapés',
        slug: 'canapes',
        subSubCategories: [
          { id: '1-3-1', name: 'Canapés 2 places', slug: 'canapes-2-places' },
          { id: '1-3-2', name: 'Canapés 3 places', slug: 'canapes-3-places' },
          { id: '1-3-3', name: 'Canapés d\'angle', slug: 'canapes-angle' }
        ]
      },
      {
        id: '1-4',
        name: 'Luminaires',
        slug: 'luminaires',
        subSubCategories: [
          { id: '1-4-1', name: 'Lampadaires', slug: 'lampadaires' },
          { id: '1-4-2', name: 'Suspensions', slug: 'suspensions' },
          { id: '1-4-3', name: 'Appliques', slug: 'appliques' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Technique',
    slug: 'technique',
    subCategories: [
      {
        id: '2-1',
        name: 'Sonorisation',
        slug: 'son',
        subSubCategories: [
          { id: '2-1-1', name: 'Enceintes', slug: 'enceintes' },
          { id: '2-1-2', name: 'Micros', slug: 'micros' },
          { id: '2-1-3', name: 'Tables de mixage', slug: 'tables-mixage' }
        ]
      },
      {
        id: '2-2',
        name: 'Éclairage',
        slug: 'lumiere',
        subSubCategories: [
          { id: '2-2-1', name: 'Projecteurs LED', slug: 'projecteurs-led' },
          { id: '2-2-2', name: 'Lasers', slug: 'lasers' },
          { id: '2-2-3', name: 'Machines à fumée', slug: 'machines-fumee' }
        ]
      },
      {
        id: '2-3',
        name: 'Vidéo',
        slug: 'video',
        subSubCategories: [
          { id: '2-3-1', name: 'Écrans', slug: 'ecrans' },
          { id: '2-3-2', name: 'Vidéoprojecteurs', slug: 'videoprojecteurs' },
          { id: '2-3-3', name: 'Caméras', slug: 'cameras' }
        ]
      },
      {
        id: '2-4',
        name: 'Structure',
        slug: 'structure',
        subSubCategories: [
          { id: '2-4-1', name: 'Ponts', slug: 'ponts' },
          { id: '2-4-2', name: 'Pieds', slug: 'pieds' },
          { id: '2-4-3', name: 'Accessoires', slug: 'accessoires-structure' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Jeux & Animation',
    slug: 'jeux',
    subCategories: [
      {
        id: '3-1',
        name: 'Jeux d\'arcade',
        slug: 'arcade',
        subSubCategories: [
          { id: '3-1-1', name: 'Bornes d\'arcade', slug: 'bornes-arcade' },
          { id: '3-1-2', name: 'Flippers', slug: 'flippers' },
          { id: '3-1-3', name: 'Simulateurs', slug: 'simulateurs' }
        ]
      },
      {
        id: '3-2',
        name: 'Casino',
        slug: 'casino',
        subSubCategories: [
          { id: '3-2-1', name: 'Tables de poker', slug: 'tables-poker' },
          { id: '3-2-2', name: 'Roulettes', slug: 'roulettes' },
          { id: '3-2-3', name: 'Black Jack', slug: 'black-jack' }
        ]
      },
      {
        id: '3-3',
        name: 'Sport',
        slug: 'sport',
        subSubCategories: [
          { id: '3-3-1', name: 'Baby-foot', slug: 'baby-foot' },
          { id: '3-3-2', name: 'Tennis de table', slug: 'tennis-table' },
          { id: '3-3-3', name: 'Jeux d\'adresse', slug: 'jeux-adresse' }
        ]
      },
      {
        id: '3-4',
        name: 'Enfants',
        slug: 'enfants',
        subSubCategories: [
          { id: '3-4-1', name: 'Structures gonflables', slug: 'structures-gonflables' },
          { id: '3-4-2', name: 'Jeux en bois', slug: 'jeux-bois' },
          { id: '3-4-3', name: 'Animations', slug: 'animations-enfants' }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Signalétique',
    slug: 'signaletique',
    subCategories: [
      {
        id: '4-1',
        name: 'Stands',
        slug: 'stands',
        subSubCategories: [
          { id: '4-1-1', name: 'Stands parapluie', slug: 'stands-parapluie' },
          { id: '4-1-2', name: 'Roll-up', slug: 'roll-up' },
          { id: '4-1-3', name: 'Comptoirs', slug: 'comptoirs' }
        ]
      },
      {
        id: '4-2',
        name: 'Banderoles',
        slug: 'banderoles',
        subSubCategories: [
          { id: '4-2-1', name: 'Banderoles PVC', slug: 'banderoles-pvc' },
          { id: '4-2-2', name: 'Banderoles tissu', slug: 'banderoles-tissu' },
          { id: '4-2-3', name: 'Banderoles mesh', slug: 'banderoles-mesh' }
        ]
      },
      {
        id: '4-3',
        name: 'Totems',
        slug: 'totems',
        subSubCategories: [
          { id: '4-3-1', name: 'Totems lumineux', slug: 'totems-lumineux' },
          { id: '4-3-2', name: 'Totems extérieurs', slug: 'totems-exterieurs' },
          { id: '4-3-3', name: 'Totems sur mesure', slug: 'totems-sur-mesure' }
        ]
      },
      {
        id: '4-4',
        name: 'Drapeaux',
        slug: 'drapeaux',
        subSubCategories: [
          { id: '4-4-1', name: 'Drapeaux voile', slug: 'drapeaux-voile' },
          { id: '4-4-2', name: 'Drapeaux pavillon', slug: 'drapeaux-pavillon' },
          { id: '4-4-3', name: 'Mâts', slug: 'mats' }
        ]
      }
    ]
  }
]; 