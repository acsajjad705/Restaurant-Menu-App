// js/data.js
// Local sample data for categories and menu items.
// Each category has a short_name and name. Menu items are grouped by category short_name.

const DC_DATA = (function () {
  const categories = [
    { short_name: "L", name: "Lunch" },
    { short_name: "D", name: "Dinner" },
    { short_name: "S", name: "Sushi" },
    { short_name: "B", name: "Breakfast" },
    { short_name: "SP", name: "Specials" }
  ];

  const menuItems = {
    "L": [
      { name: "Club Sandwich", description: "Turkey, bacon, lettuce, tomato", price: "$8.99" },
      { name: "Caesar Salad", description: "Romaine, parmesan, croutons", price: "$7.50" }
    ],
    "D": [
      { name: "Grilled Salmon", description: "Served with seasonal veggies", price: "$15.99" },
      { name: "Ribeye Steak", description: "12oz with garlic butter", price: "$22.00" }
    ],
    "S": [
      { name: "California Roll", description: "Crab, avocado, cucumber", price: "$6.50" },
      { name: "Spicy Tuna Roll", description: "Tuna, spicy mayo", price: "$7.00" }
    ],
    "B": [
      { name: "Pancake Stack", description: "Three pancakes with syrup", price: "$5.99" },
      { name: "Omelette", description: "Three eggs with cheese and veggies", price: "$6.50" }
    ],
    "SP": [
      { name: "Chef's Surprise", description: "Ask your server", price: "$12.00" }
    ]
  };

  return {
    getCategories: function () {
      // return a copy
      return categories.slice();
    },
    getMenuItemsForCategory: function (shortName) {
      return (menuItems[shortName] || []).slice();
    },
    getCategoryByShortName: function (shortName) {
      return categories.find(c => c.short_name === shortName) || null;
    }
  };
})();
