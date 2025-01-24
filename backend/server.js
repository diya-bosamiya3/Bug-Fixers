const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable cross-origin requests
app.use(cors());

// Use JSON parsing middleware
app.use(express.json());

// Sample product data (mocked database)
const products = [
  { id: 1, name: 'Storage Container', category: 'Beverage', ecoFriendly: true, brand: 'EcoBottles', url: 'https://www.etsy.com/in-en/search?q=eco+friendly+products+storage+%26+organisation&ref=narrow_by_theme&explicit=1' },
  { id: 2, name: 'Steel Straws', category: 'Beverage', ecoFriendly: true, brand: 'Ecostraw', url: 'https://www.etsy.com/in-en/search?q=reusable+straws&ref=search_bar' },
  { id: 3, name: 'Reusable Bag', category: 'Accessories', ecoFriendly: true, brand: 'EcoBags', url: 'https://www.etsy.com/in-en/search?q=reusable+bag&ref=auto-1&as_prefix=reusa' },
  { id: 4, name: 'Plastic Cutlery', category: 'Kitchenware', ecoFriendly: true, brand: 'PlasticCo', url: 'www.amazon.com' },
  { id: 5, name: 'Glass Bottle', category: 'Beverage', ecoFriendly: true, brand: 'EcoBottles', url: 'https://www.etsy.com/in-en/search?q=glass+bottle&ref=search_bar' },
  { id: 6, name: 'Bamboo Cutlery', category: 'Kitchenware', ecoFriendly: true, brand: 'EcoBags', url: 'https://www.etsy.com/in-en/search?q=bamboo+curtley&ref=search_bar' },
  { id: 7, name: 'Home Decor', category: 'Accessories', ecoFriendly: true, brand: 'decor', url: 'https://www.etsy.com/in-en/search?explicit=1&q=eco+friendly+products+home+decor&ref=narrow_by_them' },
  { id: 8, name: 'Bamboo Bags', category: 'Accessories', ecoFriendly: true, brand: 'EcoBags', url: 'https://www.etsy.com/in-en/search?q=bamboo%20bags&ref=search_bar' },
];

// Basic route for home page
app.get('/', (req, res) => {
  res.send('Welcome to the Eco-Friendly Product Recommendation Engine!');
});

// Route for product suggestions using query parameter
app.get('/suggest', (req, res) => {
  const searchQuery = req.query.q?.trim().toLowerCase();

  if (searchQuery) {
    // Find products that match the search query (partial match)
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery) && product.ecoFriendly
    );

    return res.json(filteredProducts);
  } else {
    return res.status(400).json({ message: 'Please provide a valid search query.' });
  }
});

// Route for full product recommendation
app.post('/recommend', (req, res) => {
  const userInput = req.body.input?.trim().toLowerCase();  // Ensure no extra spaces are included

  if (userInput) {
    // Find matching eco-friendly products
    const ecoFriendlyProducts = products.filter(product =>
      product.name.toLowerCase().includes(userInput) && product.ecoFriendly
    );

    if (ecoFriendlyProducts.length === 0) {
      return res.status(404).json({ message: `No eco-friendly alternatives found for: ${userInput}` });
    } else {
      return res.json({
        message: `Here are some eco-friendly alternatives for: ${userInput}`,
        ecoFriendlyProducts
      });
    }
  } else {
    return res.status(400).json({ message: 'Please provide a valid product name.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const port = 5000;

// // Enable cross-origin requests
// app.use(cors());

// // Use JSON parsing middleware
// app.use(express.json());

// // Sample product data (mocked database)
// const products = [
//   { id: 1, name: 'Plastic Bottle', category: 'Beverage', ecoFriendly: true, brand: 'PlasticCo', url: 'https://brownliving.in/collections/eco-friendly-bottles?srsltid=AfmBOopvyHL16xZY1VBoWESD4hqKh-poO3cdkfRgjpgKDLC9Z1TwyqYv' },
//   { id: 2, name: 'Glass Bottle', category: 'Beverage', ecoFriendly: true, brand: 'EcoBottles', url: 'https://brownliving.in/collections/eco-friendly-bottles?srsltid=AfmBOopvyHL16xZY1VBoWESD4hqKh-poO3cdkfRgjpgKDLC9Z1TwyqYv' },
//   { id: 3, name: 'Plastic Utensils', category: 'Kitchenware', ecoFriendly: false, brand: 'PlasticCo', url: 'https://plasticco.com/plastic-utensils' },
//   { id: 4, name: 'Reusable Bag', category: 'Accessories', ecoFriendly: true, brand: 'EcoBags', url: 'https://ecobags.com/reusable-bag' },
//   { id: 5, name: 'Plastic Straws', category: 'Beverage', ecoFriendly: false, brand: 'PlasticCo', url: 'https://plasticco.com/plastic-straws' },
//   { id: 6, name: 'Bamboo Straws', category: 'Beverage', ecoFriendly: true, brand: 'EcoStraws', url: 'https://ecostraws.com/bamboo-straws' },
//   { id: 7, name: 'Plastic Cutlery', category: 'Kitchenware', ecoFriendly: false, brand: 'PlasticCo', url: 'https://plasticco.com/plastic-cutlery' },
//   { id: 8, name: 'Bamboo Cutlery', category: 'Kitchenware', ecoFriendly: true, brand: 'EcoBags', url: 'https://ecobags.com/bamboo-cutlery' },
//   { id: 9, name: 'Plastic Shopping Bags', category: 'Accessories', ecoFriendly: false, brand: 'PlasticCo', url: 'https://plasticco.com/plastic-bags' },
//   { id: 10, name: 'Reusable Shopping Bags', category: 'Accessories', ecoFriendly: true, brand: 'EcoBags', url: 'https://ecobags.com/reusable-shopping-bags' }
// ];

// // Basic route for home page
// app.get('/', (req, res) => {
//   res.send('Welcome to the Plastic-Free Product Recommendation Engine!');
// });

// // Example of a route for recommendations using POST request
// app.post('/recommend', (req, res) => {
//   const userInput = req.body.input?.trim();  // Ensure no extra spaces are included
//   console.log('User input:', userInput); // Debugging: Check input

//   if (userInput) {
//     // Filter eco-friendly products based on user input
//     const ecoFriendlyProducts = products.filter(p =>
//       p.name.toLowerCase().includes(userInput.toLowerCase()) && p.ecoFriendly
//     );

//     console.log('Filtered eco-friendly products:', ecoFriendlyProducts); // Debugging: Check filtered products

//     if (ecoFriendlyProducts.length === 0) {
//       return res.status(404).json({ message: `No plastic-free alternatives found for: ${userInput}` });
//     } else {
//       return res.json({
//         message: `Here are some plastic-free alternatives for: ${userInput}`,
//         ecoFriendlyProducts
//       });
//     }
//   } else {
//     return res.status(400).json({ message: 'Please provide input to get recommendations.' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
