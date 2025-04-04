import { MenuItem, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Drinks', type: 'drinks' },
  { id: '2', name: 'Food', type: 'food' },
  { id: '3', name: 'Biscuits', type: 'biscuits' },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 2.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    description: 'Fresh salad with grilled chicken breast',
    price: 8.99,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
    isSpecial: true,
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    description: 'Freshly baked chocolate chip cookies',
    price: 1.99,
    category: 'biscuits',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
    price: 7.49,
    category: 'food',
    image: 'https://www.superhealthykids.com/wp-content/uploads/2023/08/homemade-chicken-caesar-salad-10-768x1152.jpg?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '5',
    name: 'Margarita Pizza',
    description: 'Thin crust pizza topped with fresh tomatoes, mozzarella, and basil.',
    price: 11.99,
    category: 'food',
    image: 'https://simply-delicious-food.com/wp-content/uploads/2020/06/Grilled-Pizza-Margherita-1-367x550.jpg?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '6',
    name: 'Iced Coffee',
    description: 'Refreshing iced coffee served with milk and sugar.',
    price: 3.50,
    category: 'drinks',
    image: 'https://ourcraftymom.com/wp-content/uploads/2021/07/Vegan-Iced-Coffee-13-640x960.jpg?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '7',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with creamy sauce, pancetta, and parmesan.',
    price: 12.50,
    category: 'food',
    image: 'https://www.fifteenspatulas.com/wp-content/uploads/2012/03/Spaghetti-Carbonara-Fifteen-Spatulas-12-500x500.jpg?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '8',
    name: 'Fruit Tart',
    description: 'Delicious tart filled with pastry cream and topped with fresh fruits.',
    price: 4.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1598511726428-9c1b6d6e7c6f?auto=format&fit=crop&q=80&w=500',
  },
];
