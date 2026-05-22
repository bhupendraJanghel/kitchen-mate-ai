import { Ingredient } from '@/types';

export const INGREDIENTS: Ingredient[] = [
  // Vegetables
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', icon: '🍅' },
  { id: 'onion', name: 'Onion', category: 'Vegetables', icon: '🧅' },
  { id: 'potato', name: 'Potato', category: 'Vegetables', icon: '🥔' },
  { id: 'capsicum', name: 'Capsicum', category: 'Vegetables', icon: '🫑' },
  { id: 'carrot', name: 'Carrot', category: 'Vegetables', icon: '🥕' },
  { id: 'cucumber', name: 'Cucumber', category: 'Vegetables', icon: '🥒' },
  { id: 'cauliflower', name: 'Cauliflower', category: 'Vegetables', icon: '🥦' },
  { id: 'spinach', name: 'Spinach', category: 'Vegetables', icon: '🥬' },
  { id: 'peas', name: 'Green Peas', category: 'Vegetables', icon: '🫛' },
  { id: 'garlic', name: 'Garlic', category: 'Vegetables', icon: '🧄' },
  { id: 'ginger', name: 'Ginger', category: 'Vegetables', icon: '🫚' },
  { id: 'chilli', name: 'Green Chilli', category: 'Vegetables', icon: '🌶️' },
  { id: 'coriander', name: 'Coriander', category: 'Vegetables', icon: '🌿' },
  
  // Dairy
  { id: 'paneer', name: 'Paneer', category: 'Dairy', icon: '🧀' },
  { id: 'cheese', name: 'Cheese', category: 'Dairy', icon: '🧀' },
  { id: 'milk', name: 'Milk', category: 'Dairy', icon: '🥛' },
  { id: 'butter', name: 'Butter', category: 'Dairy', icon: '🧈' },
  { id: 'curd', name: 'Curd / Yogurt', category: 'Dairy', icon: '🥣' },

  // Grains & Flours
  { id: 'rice', name: 'Rice', category: 'Grains', icon: '🍚' },
  { id: 'wheat-flour', name: 'Wheat Flour', category: 'Grains', icon: '🌾' },
  { id: 'bread', name: 'Bread', category: 'Grains', icon: '🍞' },
  { id: 'oats', name: 'Oats', category: 'Grains', icon: '🥣' },
  { id: 'besan', name: 'Gram Flour (Besan)', category: 'Grains', icon: '🌾' },

  // Spices & Condiments
  { id: 'cumin', name: 'Cumin (Jeera)', category: 'Spices', icon: '🧂' },
  { id: 'turmeric', name: 'Turmeric', category: 'Spices', icon: '🟡' },
  { id: 'red-chilli-powder', name: 'Red Chilli Powder', category: 'Spices', icon: '🌶️' },
  { id: 'garam-masala', name: 'Garam Masala', category: 'Spices', icon: '🤎' },
  { id: 'salt', name: 'Salt', category: 'Spices', icon: '🧂' },

  // Snacks & Ready to Cook
  { id: 'maggi', name: 'Maggi', category: 'Snacks', icon: '🍜' },
  { id: 'pasta', name: 'Pasta', category: 'Snacks', icon: '🍝' },

  // Meat / Eggs
  { id: 'egg', name: 'Egg', category: 'Meat', icon: '🥚' },
  { id: 'chicken', name: 'Chicken', category: 'Meat', icon: '🍗' },
];

export const CATEGORIES = [
  'All',
  'Vegetables',
  'Dairy',
  'Grains',
  'Spices',
  'Snacks',
  'Meat'
] as const;
