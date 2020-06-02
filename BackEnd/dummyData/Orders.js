let address = [
  {
    line1: "27042 Merchant Road",
    line2: null,
    city: "Wilmington",
    state: "Delaware",
    country: "United States",
    phone: null,
    pincode: null,
    user_id: "5ed4c71cbdfacb35cc08f0a6",
  },
  {
    line1: "0 Farragut Avenue",
    line2: "Summer Ridge",
    city: "New Haven",
    state: "Connecticut",
    country: "United States",
    phone: "203 997 4668",
    pincode: "96701",
    user_id: "5ed4c71cbdfacb35cc08f0a6",
  },
  {
    line1: "12859 Pawling Terrace",
    line2: "Nevada",
    city: "Sacramento",
    state: null,
    country: "United States",
    phone: "916 353 6034",
    pincode: null,
    user_id: `5ed4c729bdfacb35cc08f0ae`,
  },
  {
    line1: "1 Kipling Road",
    line2: null,
    city: "Wilmington",
    state: null,
    country: "United States",
    phone: null,
    pincode: null,
    user_id: `5ed4c729bdfacb35cc08f0ae`,
  },
  {
    line1: "62 Fordem Point",
    line2: null,
    city: "Kansas City",
    state: "Missouri",
    country: "United States",
    phone: null,
    pincode: null,
    user_id: `5ed4c727bdfacb35cc08f0aa`,
  },
  {
    line1: "657 Dwight Pass",
    line2: null,
    city: "Topeka",
    state: "Kansas",
    country: "United States",
    phone: null,
    pincode: null,
    user_id: `5ed4c727bdfacb35cc08f0aa`,
  },
  {
    line1: "11 Sundown Terrace",
    line2: null,
    city: "Philadelphia",
    state: null,
    country: "United States",
    phone: null,
    pincode: null,
    user_id: `5ed4c727bdfacb35cc08f0aa`,
  },
  {
    line1: "2390 Stuart Hill",
    line2: null,
    city: "Dallas",
    state: "Texas",
    country: "United States",
    phone: null,
    pincode: null,
    user_id: `5ed4c727bdfacb35cc08f0a7`,
  },
  {
    line1: "9 Grover Circle",
    line2: null,
    city: "Decatur",
    state: "Georgia",
    country: "United States",
    phone: null,
    pincode: "2",
    user_id: `5ed4c727bdfacb35cc08f0a7`,
  },
  {
    line1: "32970 Cody Crossing",
    line2: "Wayridge",
    city: "San Francisco",
    state: "California",
    country: "United States",
    phone: "858 572 6166",
    pincode: "9187",
    user_id: "5ed4c727bdfacb35cc08f0a7",
  },
];

let orderDetails = [
  {
    product_id: "5ed5f415ec066e36485c943f",
    quantity: 2,
  },
  {
    product_id: "5ed5f419ec066e36485c9440",
    quantity: 1,
  },
  {
    product_id: "5ed5f419ec066e36485c9441",
    quantity: 2,
  },
  {
    product_id: "5ed5f415ec066e36485c943f",
    quantity: 5,
  },
  {
    product_id: "5ed5f41bec066e36485c9447",
    quantity: 1,
  },
  {
    product_id: "5ed5f41cec066e36485c944a",
    quantity: 2,
  },
];

let orders = [
  {
    user_id: "5ed4c71cbdfacb35cc08f0a6",
    orders: [
      "5ed608b14307282494ed16c6",
      "5ed608b24307282494ed16c8",
      "5ed608b24307282494ed16ca",
    ],
  },
  {
    user_id: "5ed60865b674f71e0c8ac0ef",
    orders: ["5ed608b14307282494ed16c7", "5ed608b24307282494ed16c9"],
  },
  {
    user_id: "5ed4c727bdfacb35cc08f0aa",
    orders: ["5ed608b34307282494ed16cb"],
  },
];

module.exports = {
  address,
  orderDetails,
  orders,
};
