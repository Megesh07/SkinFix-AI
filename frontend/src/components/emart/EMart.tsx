import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  type: 'allopathic' | 'ayurvedic';
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Vitamin C Serum",
    type: "allopathic",
    price: 29.99,
    description: "Brightening and anti-aging serum with 20% Vitamin C",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"
  },
  {
    id: 2,
    name: "Neem Face Pack",
    type: "ayurvedic",
    price: 19.99,
    description: "Natural face pack with neem and turmeric for clear skin",
    image: "https://www.thebodycare.co.in/wp-content/uploads/2018/12/Neem-face-pack-2.jpg"
  },
  {
    id: 3,
    name: "Hyaluronic Moisturizer",
    type: "allopathic",
    price: 34.99,
    description: "Deep hydrating moisturizer with hyaluronic acid",
    image: "https://th.bing.com/th/id/OIP.jzOhJtp6Vj1e0sifliS7OQHaHa?rs=1&pid=ImgDetMain"
  },
  {
    id: 4,
    name: "Kumkumadi Oil",
    type: "ayurvedic",
    price: 24.99,
    description: "Traditional ayurvedic facial oil for glowing skin",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80"
  },
  {
    id: 5,
    name: "Retinol Night Cream",
    type: "allopathic",
    price: 39.99,
    description: "Anti-aging night cream with retinol and peptides",
    image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&q=80"
  },
  {
    id: 6,
    name: "Aloe Vera Gel",
    type: "ayurvedic",
    price: 14.99,
    description: "Pure aloe vera gel for soothing and healing skin",
    image: "https://m.media-amazon.com/images/I/81+gXxwgSnL.jpg"
  },
  {
    id: 7,
    name: "Peptide Complex Serum",
    type: "allopathic",
    price: 45.99,
    description: "Advanced anti-aging serum with multiple peptides",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"
  },
  {
    id: 8,
    name: "Saffron Face Cream",
    type: "ayurvedic",
    price: 29.99,
    description: "Luxurious face cream with saffron for radiant skin",
    image: "https://m.media-amazon.com/images/I/51IV9n47CfL._SL1100_.jpg"
  }
];

export default function EMart() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-[#D2691E] bg-clip-text text-transparent">
          SkinLuxe
        </h1>
        <div className="flex space-x-4">
          <button className="bg-gradient-to-r from-pink-500 to-[#D2691E] text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transition-all duration-300">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart (0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 mb-2 
                    ${product.type === 'allopathic' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-[#FFE4E1] text-[#D2691E]'}`}>
                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                  </span>
                </div>
                <span className="text-lg font-bold text-pink-600">${product.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-[#D2691E] text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}