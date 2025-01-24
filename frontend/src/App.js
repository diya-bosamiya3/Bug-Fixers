import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

// Barcode Scanner Component (or input for product name)
const BarcodeScanner = ({ onScanSuccess }) => {
    const [scanResult, setScanResult] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Handle user input and make an API call for suggestions
    const handleScan = async (e) => {
        const query = e.target.value;
        setScanResult(query);

        // Fetch suggestions based on the typed input
        if (query.length > 0) {
            try {
                const response = await axios.get(`http://localhost:5000/suggest?q=${query}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="scanner-container">
            <input 
                type="text" 
                placeholder="Enter product name"
                value={scanResult}
                onChange={handleScan} 
                className="search-input" 
            />
            <div className="suggestions">
                {suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((product) => (
                            <li key={product.id} className="suggestion-item" onClick={() => onScanSuccess(product.name)}>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecommendations = async (productName) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/recommend', {
                input: productName // Sending product name from the user input
            });
            console.log(response.data);  // Debugging: Check response structure
            if (response.data.ecoFriendlyProducts && response.data.ecoFriendlyProducts.length > 0) {
                setRecommendations(response.data.ecoFriendlyProducts);
            } else {
                setRecommendations([]); // Clear recommendations if no match
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendations([]); // Clear recommendations in case of error
        }
        setLoading(false);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Eco-Friendly Product Recommendations</h1>
            <BarcodeScanner onScanSuccess={getRecommendations} />
            {loading ? (
                <p className="loading-text">Loading recommendations...</p>
            ) : (
                <div className="recommendation-container">
                    {recommendations.length > 0 ? (
                        <ul className="recommendation-list">
                            {recommendations.map((product) => (
                                <li key={product.id} className="recommendation-item">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-brand">{product.brand}</p>
                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="buy-now-link">
                                        Buy Now
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-recommendations">No recommendations found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';  // Import the CSS file

// const App = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');  // Search term for products
//   const [error, setError] = useState('');

//   // Function to fetch recommendations from the server based on search term
//   const getRecommendations = async (input) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5000/recommend', {
//         input: input // Sending product name
//       });
//       console.log(response.data);  // Debugging: Check response structure
//       if (response.data.ecoFriendlyProducts && response.data.ecoFriendlyProducts.length > 0) {
//         setRecommendations(response.data.ecoFriendlyProducts);
//       } else {
//         setRecommendations([]);
//       }
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       setError('No recommendations found');
//     }
//     setLoading(false);
//   };

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       getRecommendations(searchTerm);  // Fetch recommendations based on the search term
//     }
//   };

//   return (
//     <div className="App">
//       <h1 className="app-title">Plastic-Free Product Recommendations</h1>

//       <div className="search-container">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search for a product..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch} className="search-btn">Search</button>
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading recommendations...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <div className="recommendation-container">
//           {recommendations.length > 0 ? (
//             <ul className="recommendation-list">
//               {recommendations.map((product, index) => (
//                 <li key={index} className="recommendation-item">
//                   <p className="product-name">{product.product_name || product.name}</p>
//                   <p className="product-brand">{product.brands || product.brand}</p>
//                   <a
//                     href={product.url || product.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="buy-now-link"
//                   >
//                     Buy Now
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="no-recommendations">No recommendations found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Assuming you will style the app with your own CSS

// // Main App Component
// const App = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userInput, setUserInput] = useState('');

//   // Function to get eco-friendly recommendations based on user input
//   const getRecommendations = async (productName) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/recommend', { input: productName });
//       console.log(response.data); // Debugging: Check response structure
//       if (response.data.ecoFriendlyProducts && response.data.ecoFriendlyProducts.length > 0) {
//         setRecommendations(response.data.ecoFriendlyProducts);
//       } else {
//         setRecommendations([]); // Clear recommendations if no match
//       }
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       setRecommendations([]); // Clear recommendations in case of error
//     }
//     setLoading(false);
//   };

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSearch = () => {
//     if (userInput.trim()) {
//       getRecommendations(userInput);
//     }
//   };

//   return (
//     <div className="App">
//       <h1 className="app-title">Eco-Friendly Product Recommendations</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Type any product name (e.g., Plastic Bottle)"
//           className="input-barcode"
//           value={userInput}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSearch} className="search-btn">Search</button>
//       </div>

//       {loading ? (
//         <p>Loading recommendations...</p>
//       ) : (
//         <div className="recommendation-container">
//           {recommendations.length > 0 ? (
//             <ul className="recommendation-list">
//               {recommendations.map((product) => (
//                 <li key={product.id} className="recommendation-item">
//                   <p className="product-name">{product.name}</p>
//                   <p className="product-brand">{product.brand}</p>
//                   <a
//                     href={product.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="buy-now-link"
//                   >
//                     Buy Now
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No eco-friendly alternatives found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
