import { Product } from '@/types';

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Headphones',
    category: 'Electronics',
    rating: 4.5,
    reviews: 120,
    description: 'Immerse yourself in music with these high-fidelity wireless headphones. Featuring active noise cancellation, a 30-hour battery life, and crystal-clear microphone for calls. Perfect for travel, work, and leisure.',
    inStock: true,
    comments: [
        { author: 'Alice', text: 'Absolutely amazing sound quality!', date: '2024-07-20' },
        { author: 'Bob', text: 'The noise cancellation is a game-changer on my commute.', date: '2024-07-21' },
    ]
  },
  {
    id: 2,
    name: 'Smartwatch Series 8',
    price: 399.00,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Smartwatch',
    category: 'Wearables',
    rating: 4.8,
    reviews: 250,
    description: 'Stay connected and track your fitness with the latest smartwatch. Water-resistant with a bright, always-on display, ECG app, and blood oxygen monitoring. Your essential companion for a healthy life.',
    inStock: true,
    comments: []
  },
  {
    id: 3,
    name: 'Professional DSLR Camera',
    price: 1250.50,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Camera',
    category: 'Cameras',
    rating: 4.9,
    reviews: 95,
    description: 'Capture stunning photos and 4K video with this professional-grade DSLR camera. Includes a versatile 18-55mm lens, a 32MP sensor, and fast autofocus system for capturing life\'s moments in breathtaking detail.',
    inStock: false,
    comments: []
  },
  {
    id: 4,
    name: 'Ultra-Thin Laptop',
    price: 1199.99,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Laptop',
    category: 'Computers',
    rating: 4.7,
    reviews: 180,
    description: 'A powerful and portable laptop for work and play. Features a 13-inch Retina display, a super-fast SSD, the latest M3 processor, and an all-day battery life in a sleek, lightweight design.',
    inStock: false,
    comments: []
  },
  {
    id: 5,
    name: 'Bluetooth Portable Speaker',
    price: 89.99,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Speaker',
    category: 'Audio',
    rating: 4.3,
    reviews: 300,
    description: 'Take your music anywhere with this compact and waterproof Bluetooth speaker. Delivers surprisingly big sound and deep bass, with a 15-hour playtime and a rugged design for any adventure.',
    inStock: true,
    comments: []
  },
  {
    id: 6,
    name: 'Gaming Mouse',
    price: 75.00,
    image: 'https://placehold.co/600x600/f0f0f0/333?text=Mouse',
    category: 'Peripherals',
    rating: 4.6,
    reviews: 150,
    description: 'Gain a competitive edge with this ergonomic gaming mouse, featuring customizable RGB lighting, programmable buttons, and a high-precision 16,000 DPI optical sensor for ultimate speed and accuracy.',
    inStock: true,
    comments: []
  }
];
