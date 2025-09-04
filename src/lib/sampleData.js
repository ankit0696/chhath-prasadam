// src/lib/sampleData.js - Sample Prasad Products for Testing

export const sampleProducts = [
  {
    name: "Complete Chhath Prasad Box",
    description: "Complete set of traditional Chhath Puja prasad including thekua, kheer, fruits, and all essential items for the holy celebration.",
    price: 599,
    originalPrice: 699,
    category: "Special Boxes",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    availability: true,
    stock: 50,
    ingredients: "Thekua, Rice Kheer, Bananas, Apples, Coconut, Sugarcane, Gur, Traditional Sweets",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500"
    ]
  },
  {
    name: "Traditional Thekua (1kg)",
    description: "Authentic handmade thekua prepared with jaggery, wheat flour, and ghee following traditional Chhath Puja recipes.",
    price: 299,
    category: "Prasad Items",
    imageURL: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500",
    availability: true,
    stock: 100,
    ingredients: "Wheat flour, Jaggery (Gur), Pure Ghee, Coconut, Dry fruits",
    images: [
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500"
    ]
  },
  {
    name: "Rice Kheer (500ml)",
    description: "Creamy rice kheer made with full cream milk, basmati rice, and cardamom, specially prepared for Chhath offering.",
    price: 199,
    category: "Prasad Items", 
    imageURL: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    availability: true,
    stock: 75,
    ingredients: "Basmati Rice, Full Cream Milk, Sugar, Cardamom, Almonds, Pistachios"
  },
  {
    name: "Mixed Dry Fruits Box",
    description: "Premium quality mixed dry fruits including almonds, cashews, raisins, and dates for Chhath Puja offerings.",
    price: 799,
    originalPrice: 899,
    category: "Fruits",
    imageURL: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500",
    availability: true,
    stock: 30,
    ingredients: "Almonds, Cashews, Raisins, Dates, Walnuts, Pistachios"
  },
  {
    name: "Fresh Banana (1 dozen)",
    description: "Fresh, ripe bananas carefully selected for Chhath Puja offerings. Essential fruit for the holy celebration.",
    price: 89,
    category: "Fruits",
    imageURL: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=500",
    availability: true,
    stock: 200,
    ingredients: "Fresh Ripe Bananas"
  },
  {
    name: "Coconut Set (5 pieces)",
    description: "Fresh coconuts with intact water, essential for Chhath Puja rituals and offerings to Surya Dev.",
    price: 149,
    category: "Fruits",
    imageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500",
    availability: true,
    stock: 80,
    ingredients: "Fresh Coconuts with Water"
  },
  {
    name: "Marigold Garland",
    description: "Fresh marigold flower garlands for decorating the Chhath Puja altar and offering to the Sun God.",
    price: 99,
    category: "Flowers",
    imageURL: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    availability: true,
    stock: 150,
    ingredients: "Fresh Marigold Flowers"
  },
  {
    name: "Sugarcane (4 pieces)",
    description: "Fresh, sweet sugarcane sticks, a must-have offering for Chhath Puja celebrations.",
    price: 79,
    category: "Fruits",
    imageURL: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=500",
    availability: true,
    stock: 120,
    ingredients: "Fresh Sugarcane"
  },
  {
    name: "Gur Laddu (500g)",
    description: "Traditional jaggery laddus made with pure desi ghee, perfect for Chhath Puja prasad distribution.",
    price: 249,
    category: "Sweets",
    imageURL: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500",
    availability: true,
    stock: 90,
    ingredients: "Pure Jaggery (Gur), Ghee, Sesame Seeds, Cardamom"
  },
  {
    name: "Diya Set (12 pieces)",
    description: "Traditional clay diyas (lamps) for lighting during Chhath Puja ceremonies and evening prayers.",
    price: 69,
    category: "Puja Items",
    imageURL: "https://images.unsplash.com/photo-1605207171742-3abe6711d1fc?w=500",
    availability: true,
    stock: 200,
    ingredients: "Pure Clay Diyas"
  },
  {
    name: "Incense Sticks Bundle",
    description: "Aromatic incense sticks with traditional fragrance for creating a sacred atmosphere during Chhath Puja.",
    price: 59,
    category: "Puja Items",
    imageURL: "https://images.unsplash.com/photo-1583926505971-d19d84d23b4d?w=500",
    availability: true,
    stock: 300,
    ingredients: "Natural Herbs, Sandalwood, Rose Petals"
  },
  {
    name: "Seasonal Fruit Basket",
    description: "Carefully selected seasonal fruits including apples, oranges, and pomegranates for Chhath offerings.",
    price: 399,
    category: "Fruits",
    imageURL: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
    availability: true,
    stock: 60,
    ingredients: "Apples, Oranges, Pomegranates, Seasonal Fruits"
  }
];

export const sampleCategories = [
  {
    id: "prasad-items",
    name: "Prasad Items",
    description: "Traditional prasad items for Chhath Puja",
    imageURL: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300"
  },
  {
    id: "sweets",
    name: "Sweets",
    description: "Traditional sweets and desserts",
    imageURL: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300"
  },
  {
    id: "fruits",
    name: "Fruits",
    description: "Fresh fruits for puja offerings",
    imageURL: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=300"
  },
  {
    id: "flowers",
    name: "Flowers",
    description: "Fresh flowers for decoration and offerings",
    imageURL: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300"
  },
  {
    id: "puja-items",
    name: "Puja Items",
    description: "Essential items for puja ceremonies",
    imageURL: "https://images.unsplash.com/photo-1605207171742-3abe6711d1fc?w=300"
  },
  {
    id: "special-boxes",
    name: "Special Boxes",
    description: "Complete prasad boxes for convenience",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"
  }
];

// Function to add sample data to Firestore (for testing)
export async function addSampleDataToFirestore() {
  const { productOperations } = await import('./firestore');
  const { collection, addDoc } = await import('firebase/firestore');
  const { db } = await import('../firebase/config');

  try {
    console.log('Adding sample products to Firestore...');
    
    // Add categories first
    const categoriesRef = collection(db, 'categories');
    for (const category of sampleCategories) {
      await addDoc(categoriesRef, {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log('Categories added successfully');

    // Add products
    for (const product of sampleProducts) {
      await productOperations.addProduct(product);
    }
    
    console.log('Sample data added successfully!');
    return { success: true, message: 'Sample data added successfully!' };
  } catch (error) {
    console.error('Error adding sample data:', error);
    return { success: false, message: error.message };
  }
}

// Function to clear all sample data (for testing)
export async function clearSampleData() {
  const { getDocs, deleteDoc, collection } = await import('firebase/firestore');
  const { db } = await import('../firebase/config');

  try {
    console.log('Clearing sample data...');
    
    // Clear products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const deletePromises = productsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Clear categories  
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const deleteCategoryPromises = categoriesSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deleteCategoryPromises);

    console.log('Sample data cleared successfully!');
    return { success: true, message: 'Sample data cleared successfully!' };
  } catch (error) {
    console.error('Error clearing sample data:', error);
    return { success: false, message: error.message };
  }
}