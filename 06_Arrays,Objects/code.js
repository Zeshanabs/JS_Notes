/*Project 1 — Contact Manager (CRUD)
Covers: object creation, dot vs bracket, adding/deleting properties, Object.keys/values/entries, for...in, for...of, array methods (find, filter, map, reduce), JSON stringify/parse, destructuring, spread, shallow vs deep copy.*/

// contact-manager.js
// Simple in-memory Contact Manager demonstrating objects & arrays

// initial contacts array (array of objects)
let contacts = [
  { id: 1, name: "Ali Khan", phone: "0300-1111111", tags: ["friend"], address: { city: "Lahore", zip: "54000" } },
  { id: 2, name: "Sara Ahmed", phone: "0300-2222222", tags: ["work"], address: { city: "Islamabad", zip: "44000" } }
];

// Utility: generate next ID (simple)
function nextId() {
  return contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
}

// Create (add) a contact
function addContact({ name, phone, tags = [], address = {} }) {
  const contact = { id: nextId(), name, phone, tags, address };
  contacts.push(contact); // mutating original
  return contact;
}

// Read (find by id)
function getContactById(id) {
  return contacts.find(c => c.id === id) || null;
}

// Update: update with partial fields (immutable pattern using spread)
function updateContact(id, updates) {
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return null;
  // shallow merge (top-level); nested objects still shared (shallow)
  contacts[idx] = { ...contacts[idx], ...updates };
  return contacts[idx];
}

// Delete
function deleteContact(id) {
  const before = contacts.length;
  contacts = contacts.filter(c => c.id !== id); // non-mutating replacement
  return contacts.length < before;
}

// Find by name (case-insensitive) — demonstrates for...of + destructuring
function findByName(query) {
  const q = query.toLowerCase();
  const results = [];
  for (const { id, name, phone } of contacts) {
    if (name.toLowerCase().includes(q)) results.push({ id, name, phone });
  }
  return results;
}

// List keys and values for first contact — demonstrates Object.keys/values/entries + for...in
function inspectFirstContact() {
  if (!contacts.length) return;
  const c = contacts[0];
  console.log("Object.keys:", Object.keys(c));
  console.log("Object.values:", Object.values(c));
  console.log("Object.entries:");
  for (const [k, v] of Object.entries(c)) {
    console.log("  ", k, "=>", v);
  }
  // for...in (iterate enumerable props) and filter own props
  console.log("for...in with hasOwnProperty:");
  for (const k in c) {
    if (Object.prototype.hasOwnProperty.call(c, k)) {
      console.log("  ", k, ":", c[k]);
    }
  }
}

// Serialize & deserialize (JSON) — demonstrates JSON.stringify/parse (deep-ish)
function exportContacts() {
  return JSON.stringify(contacts);
}
function importContacts(json) {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error("Expected array");
    // Replace contacts (here we trust data)
    contacts = parsed;
    return true;
  } catch (e) {
    console.error("Invalid JSON:", e.message);
    return false;
  }
}

// Example usage (run this block to test)
function demo() {
  console.log("Initial contacts:", contacts);

  console.log("\nAdd a contact (dot vs bracket example):");
  const newC = addContact({ name: "Bilal", phone: "0300-3333333", tags: ["family"], address: { city: "Karachi", zip: "74000" } });
  // add a dynamic property via bracket notation
  const key = "nickname";
  newC[key] = "Bill";
  console.log("Added:", newC);

  console.log("\nUpdate contact (using spread for shallow merge):");
  console.log("Before:", getContactById(1));
  updateContact(1, { phone: "0300-9999999", tags: ["friend", "gym"] });
  console.log("After:", getContactById(1));

  console.log("\nFind by name 'ali':", findByName("ali"));
  console.log("\nInspect first contact:");
  inspectFirstContact();

  console.log("\nExporting contacts to JSON (string length):", exportContacts().length);
  console.log("\nDelete contact id=2:", deleteContact(2));
  console.log("\nFinal contacts:", contacts);
}

// Run demo if this file is run directly (node)
if (require && require.main === module) demo();

// Export functions for importing in tests or other modules
module.exports = {
  addContact, getContactById, updateContact, deleteContact, findByName, inspectFirstContact, exportContacts, importContacts
};


/*Project 2 — Shopping Cart (using this, methods, array ops)
Covers: object methods, this, arrow function vs normal function, find, map, reduce, mutating vs non-mutating, Object.freeze, computed property names, destructuring.*/

// shopping-cart.js
// Demonstrates object methods, this, arrow vs normal functions, and array ops.

const productsCatalog = [
  { id: "p1", name: "T-shirt", price: 15, metadata: { color: "blue" } },
  { id: "p2", name: "Sneakers", price: 60, metadata: { color: "white" } },
  { id: "p3", name: "Cap", price: 10, metadata: { color: "black" } }
];

// freeze a product (example of Object.freeze — shallow)
Object.freeze(productsCatalog[2]); // p3 is shallow frozen (no new top-level props)

const Cart = {
  items: [], // each item: { productId, qty, priceAtAdd }
  // add item (normal function so `this` refers to Cart when called as Cart.addItem())
  addItem(productId, qty = 1) {
    const product = productsCatalog.find(p => p.id === productId);
    if (!product) return false;
    const existing = this.items.find(it => it.productId === productId);
    if (existing) {
      existing.qty += qty; // mutates existing item
    } else {
      // store priceAtAdd to simulate snapshot pricing
      this.items.push({ productId, qty, priceAtAdd: product.price });
    }
    return true;
  },

  // remove item
  removeItem(productId) {
    const before = this.items.length;
    // non-mutating replacement (immutable pattern)
    this.items = this.items.filter(it => it.productId !== productId);
    return this.items.length < before;
  },

  // update quantity
  updateQuantity(productId, qty) {
    const it = this.items.find(i => i.productId === productId);
    if (!it) return false;
    if (qty <= 0) {
      this.removeItem(productId);
    } else {
      it.qty = qty; // mutate existing
    }
    return true;
  },

  // total cost (reduce)
  getTotal() {
    return this.items.reduce((sum, item) => {
      const product = productsCatalog.find(p => p.id === item.productId);
      const price = item.priceAtAdd ?? (product ? product.price : 0);
      return sum + price * item.qty;
    }, 0);
  },

  // show cart (demonstrates map + destructuring + computed property names)
  showCart() {
    console.log("Cart contents:");
    this.items.forEach((it, idx) => {
      const { productId, qty, priceAtAdd } = it;
      const product = productsCatalog.find(p => p.id === productId) || {};
      console.log(`${idx + 1}. ${product.name || "UNKNOWN"} (id:${productId}) x ${qty} @ ${priceAtAdd}`);
    });
    console.log("Total:", this.getTotal());
  },

  // example method that demonstrates arrow vs normal this behavior
  testThis() {
    console.log("Inside normal method, this === Cart ?", this === Cart); // true
    const arrow = () => {
      // arrow uses lexical this (in this case still Cart because outer this is Cart)
      console.log("Inside arrow defined inside method, this === Cart ?", this === Cart);
    };
    arrow();

    // But if we set a method as an arrow assigned directly on object:
    this.arrowMethod = () => {
      // lexical this here will be the scope where the object was defined (module/global), NOT the object if invoked later as Cart.arrowMethod()
      console.log("this in arrowMethod (attached as property) is likely not Cart:", this === Cart);
    };
  }
};

// Demo usage
function demoCart() {
  Cart.addItem("p1", 2);
  Cart.addItem("p2");
  Cart.addItem("p1", 1); // increment quantity for p1
  Cart.showCart();

  console.log("\nUpdate qty for p2 to 3:");
  Cart.updateQuantity("p2", 3);
  Cart.showCart();

  console.log("\nRemove p1:");
  Cart.removeItem("p1");
  Cart.showCart();

  console.log("\nDemonstrate this behavior:");
  Cart.testThis();
  // calling arrowMethod now:
  Cart.arrowMethod && Cart.arrowMethod();
}

if (require && require.main === module) demoCart();

module.exports = { Cart, productsCatalog };


/*Project 3 — Movie Library with Classes & Getters/Setters
Covers: class (constructor & prototype), getters/setters, Object.assign, shallow copy, Object.entries, hasOwnProperty, nested objects, for...in and for...of.*/

// movie-library.js
// Small movie library that shows classes, getters/setters, Object.assign, entries, etc.

class Movie {
  constructor({ id, title, year, genres = [], ratings = [] }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genres = genres;      // array
    this._ratings = ratings;   // internal storage
  }

  // getter - compute average rating
  get averageRating() {
    if (!this._ratings.length) return null;
    return this._ratings.reduce((a, b) => a + b, 0) / this._ratings.length;
  }

  // setter - push rating after validation
  set addRating(value) {
    const v = Number(value);
    if (!Number.isFinite(v) || v < 0 || v > 10) throw new Error("Rating must be 0-10 number");
    this._ratings.push(v);
  }

  // method to show info (uses 'this')
  info() {
    return `${this.title} (${this.year}) — Avg Rating: ${this.averageRating ?? "N/A"}`;
  }

  // toJSON controls JSON.stringify output (exclude internal _ratings if you want)
  toJSON() {
    // exclude private/internal fields if desired
    return {
      id: this.id,
      title: this.title,
      year: this.year,
      genres: [...this.genres],
      averageRating: this.averageRating
    };
  }
}

class Library {
  constructor() {
    this.movies = []; // array of Movie instances
  }

  addMovie(movieData) {
    const movie = new Movie(movieData);
    this.movies.push(movie);
    return movie;
  }

  findByTitle(q) {
    const qlc = q.toLowerCase();
    return this.movies.filter(m => m.title.toLowerCase().includes(qlc));
  }

  // update movie using Object.assign (shallow)
  updateMovie(id, updates) {
    const m = this.movies.find(x => x.id === id);
    if (!m) return null;
    // be careful: Object.assign will shallowly copy into the instance
    Object.assign(m, updates);
    return m;
  }

  // iterate movies and log properties via Object.entries
  inspectAll() {
    for (const movie of this.movies) {
      console.log("=== Movie ===");
      for (const [k, v] of Object.entries(movie)) {
        // show own properties (note: _ratings is internal array)
        console.log(k, "->", v);
      }
      console.log("Average (getter):", movie.averageRating);
    }
  }
}

// Demo
function demo() {
  const lib = new Library();
  lib.addMovie({ id: "m1", title: "The Start", year: 2020, genres: ["Action"], ratings: [8, 9] });
  lib.addMovie({ id: "m2", title: "Quiet Night", year: 2018, genres: ["Drama"], ratings: [7] });

  console.log("Find 'start':", lib.findByTitle("start").map(m => m.info()));
  console.log("Add rating to m2 using setter:");
  const m2 = lib.movies.find(m => m.id === "m2");
  m2.addRating = 9; // uses setter to push rating
  console.log("m2 avg rating:", m2.averageRating);

  console.log("\nUpdate m1 (Object.assign):");
  lib.updateMovie("m1", { title: "The New Start" });
  lib.inspectAll();

  console.log("\nSerialize library to JSON (uses Movie.toJSON):");
  console.log(JSON.stringify(lib.movies, null, 2));
}

if (require && require.main === module) demo();

module.exports = { Movie, Library };


/*Project 4 — Sales Data Analysis Utilities
Covers: arrays of objects, map, filter, reduce, sort, groupBy, destructuring, spread, Array.from, Array.isArray.*/

// sales-analysis.js
// Example dataset & common analysis using array + object utilities.

const sales = [
  { orderId: 1, product: "T-shirt", qty: 2, price: 15, region: "North" },
  { orderId: 2, product: "Sneakers", qty: 1, price: 60, region: "South" },
  { orderId: 3, product: "T-shirt", qty: 1, price: 15, region: "East" },
  { orderId: 4, product: "Cap", qty: 3, price: 10, region: "North" },
  { orderId: 5, product: "T-shirt", qty: 5, price: 15, region: "South" }
];

// total revenue
function totalRevenue(data) {
  return data.reduce((sum, { qty, price }) => sum + qty * price, 0);
}

// revenue per product (groupBy using reduce)
function revenueByProduct(data) {
  return data.reduce((acc, { product, qty, price }) => {
    acc[product] = (acc[product] || 0) + qty * price;
    return acc;
  }, {});
}

// top selling product by revenue
function topProductByRevenue(data) {
  const rev = revenueByProduct(data);
  const entries = Object.entries(rev); // [ [product, revenue], ... ]
  entries.sort((a, b) => b[1] - a[1]);
  return entries.length ? { product: entries[0][0], revenue: entries[0][1] } : null;
}

// sales in a region (filter + map)
function salesInRegion(data, region) {
  return data.filter(s => s.region === region).map(s => ({ id: s.orderId, product: s.product, subtotal: s.qty * s.price }));
}

// unique products (Array.from + Set or reduce)
function uniqueProducts(data) {
  return Array.from(new Set(data.map(s => s.product)));
}

// Demo
function demo() {
  console.log("Total revenue:", totalRevenue(sales));
  console.log("Revenue by product:", revenueByProduct(sales));
  console.log("Top product:", topProductByRevenue(sales));
  console.log("Sales in North:", salesInRegion(sales, "North"));
  console.log("Unique products:", uniqueProducts(sales));
  console.log("Is sales an array?", Array.isArray(sales));
}

if (require && require.main === module) demo();

module.exports = { totalRevenue, revenueByProduct, topProductByRevenue, salesInRegion, uniqueProducts };
