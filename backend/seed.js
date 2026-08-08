const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/handbag_db';

const sampleBags = [
  {
    name: "Handcrafted Leather Tote",
    price: 2499,
    description: "Premium handcrafted genuine leather tote bag with spacious compartments.",
    category: "bags",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    stock: 12
  },
  {
    name: "Vintage Canvas Shoulder Bag",
    price: 1899,
    description: "Durable cotton canvas bag with embroidered patterns and leather trim.",
    category: "bags",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    stock: 8
  },
  {
    name: "Classic Jute Crossbody Bag",
    price: 1299,
    description: "Eco-friendly handmade jute crossbody bag with handcrafted wooden buttons.",
    category: "bags",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    stock: 20
  },
  {
    name: "Artisan Travel Duffel",
    price: 3499,
    description: "Spacious handcrafted duffel bag designed for weekend getaways.",
    category: "bags",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    stock: 5
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Product.deleteMany({ category: 'bags' });
    await Product.insertMany(sampleBags);
    console.log("Successfully seeded bag products!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
