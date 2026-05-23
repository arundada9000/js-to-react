const curriculum = [
  // ─── PHASE 1: JavaScript Foundations ───
  {
    phase: 1,
    title: "JavaScript Foundations",
    description: "The building blocks of every JavaScript program — variables, data types, and outputting values to the console.",
    color: "#6366f1",
    icon: "fa-solid fa-cube",
    topics: ["console.log", "let / const / var", "Data Types", "Template Literals", "Type Conversion", "Operators"],
    exercises: [
      {
        question: `Subekshya just moved to a new city! Create three variables: name (const), age (let), and city (const) with values "Subekshya", 22, and "Butwal". Print them using a template literal: "Subekshya is 22 years old and lives in Butwal."`,
        hint: "Use const for values that won't change, let for values that might. Template literals use backticks and ${} for variables.",
        solutionCode: `const name = "Subekshya";
let age = 22;
const city = "Butwal";

console.log(\`\${name} is \${age} years old and lives in \${city}.\`);`,
        expectedResult: "Subekshya is 22 years old and lives in Butwal."
      },
      {
        question: `Arun is comparing momo prices at two shops. Shop A charges "150" (a string) and Shop B charges 120 (a number). Convert Shop A's price to a number, then print the total cost for buying from both shops.`,
        hint: "Use Number() or parseInt() to convert a string to a number before doing math.",
        solutionCode: `const shopA = "150";
const shopB = 120;

const total = Number(shopA) + shopB;
console.log(\`Total momo cost: Rs. \${total}\`);`,
        expectedResult: "Total momo cost: Rs. 270"
      },
      {
        question: `Create variables to store info about your favorite Nepali food: name (string), price (number), isSpicy (boolean), and rating (number). Then use typeof to print the type of each variable.`,
        hint: "typeof returns a string like 'string', 'number', 'boolean'. You can call typeof on any variable.",
        solutionCode: `const foodName = "chatpate";
const price = 50;
const isSpicy = true;
const rating = 4.5;

console.log(typeof foodName);
console.log(typeof price);
console.log(typeof isSpicy);
console.log(typeof rating);`,
        expectedResult: `string
number
boolean
number`
      },
      {
        question: `Arun bought 3 plates of momo at Rs. 200 each and 2 glasses of lassi at Rs. 80 each. Calculate the total bill, apply a 13% VAT, and print: "Total with VAT: Rs. XXX". Round to 2 decimal places.`,
        hint: "Use toFixed(2) to round a number to 2 decimal places. It returns a string.",
        solutionCode: `const momoTotal = 3 * 200;
const lassiTotal = 2 * 80;
const subtotal = momoTotal + lassiTotal;
const vat = subtotal * 0.13;
const total = (subtotal + vat).toFixed(2);

console.log(\`Total with VAT: Rs. \${total}\`);`,
        expectedResult: "Total with VAT: Rs. 904.40"
      }
    ]
  },

  // ─── PHASE 2: Control Flow ───
  {
    phase: 2,
    title: "Control Flow",
    description: "Making decisions in your code — conditionals let your program choose different paths based on data.",
    color: "#f59e0b",
    icon: "fa-solid fa-code-branch",
    topics: ["if / else", "else if", "switch", "Comparison Operators", "Logical Operators (&&, ||, !)", "Ternary Operator"],
    exercises: [
      {
        question: `Subekshya is ordering food. Write a function orderFood(item) that:\n- Returns "Great choice! Momo coming right up!" if item is "momo"\n- Returns "Chatpate is the best snack!" if item is "chatpate"\n- Returns "Sorry, we only serve Nepali food here!" for anything else\nTest it with "momo".`,
        hint: "Use if/else if/else to check different values. Use toLowerCase() for case-insensitive comparison.",
        solutionCode: `function orderFood(item) {
  if (item === "momo") {
    return "Great choice! Momo coming right up!";
  } else if (item === "chatpate") {
    return "Chatpate is the best snack!";
  } else {
    return "Sorry, we only serve Nepali food here!";
  }
}

console.log(orderFood("momo"));`,
        expectedResult: "Great choice! Momo coming right up!"
      },
      {
        question: `Write a function gradeExam(score) that returns:\n- "A" for 90-100\n- "B" for 80-89\n- "C" for 70-79\n- "D" for 60-69\n- "Fail" for below 60\nSuRu (Subekshya) scored 85 on her JavaScript quiz. What grade does she get?`,
        hint: "Start checking from the highest score and work down. Use >= comparisons.",
        solutionCode: `function gradeExam(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "Fail";
  }
}

console.log(gradeExam(85));`,
        expectedResult: "B"
      },
      {
        question: `Use a switch statement to print the Nepali name for each day. Write a function getDayInNepali(day) where:\n- "Sunday" → "Aaitabar"\n- "Monday" → "Sombar"\n- "Tuesday" → "Mangalbar"\nDefault → "Unknown day"\nCall it with "Monday".`,
        hint: "switch checks a value against multiple cases. Don't forget the break statement after each case!",
        solutionCode: `function getDayInNepali(day) {
  switch (day) {
    case "Sunday":
      return "Aaitabar";
    case "Monday":
      return "Sombar";
    case "Tuesday":
      return "Mangalbar";
    default:
      return "Unknown day";
  }
}

console.log(getDayInNepali("Monday"));`,
        expectedResult: "Sombar"
      },
      {
        question: `Arun and Subekshya are deciding where to eat. Use the ternary operator and logical operators:\n- If it's raining AND they have an umbrella, go to "outdoor chatpate stall"\n- Otherwise, go to "indoor momo restaurant"\nSet isRaining = true and hasUmbrella = true.`,
        hint: "Ternary syntax: condition ? valueIfTrue : valueIfFalse. Use && to combine conditions.",
        solutionCode: `const isRaining = true;
const hasUmbrella = true;

const place = (isRaining && hasUmbrella)
  ? "outdoor chatpate stall"
  : "indoor momo restaurant";

console.log(\`Let's go to the \${place}!\`);`,
        expectedResult: "Let's go to the outdoor chatpate stall!"
      }
    ]
  },

  // ─── PHASE 3: Functions ───
  {
    phase: 3,
    title: "Functions",
    description: "Reusable blocks of code — functions are the core of how you organize logic in JavaScript and React.",
    color: "#10b981",
    icon: "fa-solid fa-gear",
    topics: ["Function Declarations", "Function Expressions", "Arrow Functions", "Parameters & Arguments", "Default Parameters", "Return Values", "Scope"],
    exercises: [
      {
        question: `Write three versions of a function that calculates the total price of N plates of momo at a given price per plate:\n1. Function declaration\n2. Function expression\n3. Arrow function\nCall the arrow function version with 4 plates at Rs. 180 each.`,
        hint: "Declaration: function name() {}. Expression: const name = function() {}. Arrow: const name = () => {}.",
        solutionCode: `// 1. Function declaration
function calcTotal1(plates, price) {
  return plates * price;
}

// 2. Function expression
const calcTotal2 = function(plates, price) {
  return plates * price;
};

// 3. Arrow function
const calcTotal3 = (plates, price) => plates * price;

console.log(\`Total: Rs. \${calcTotal3(4, 180)}\`);`,
        expectedResult: "Total: Rs. 720"
      },
      {
        question: `Create an arrow function greetUser that takes a name and a greeting with a default parameter greeting = "Namaste". If no greeting is provided, it should use "Namaste". Call it twice: once with just "Subekshya", and once with "Arun" and "Hey".`,
        hint: "Default parameters are set in the function signature: (param = defaultValue). They're used when no argument is passed.",
        solutionCode: `const greetUser = (name, greeting = "Namaste") => {
  return \`\${greeting}, \${name}!\`;
};

console.log(greetUser("Subekshya"));
console.log(greetUser("Arun", "Hey"));`,
        expectedResult: `Namaste, Subekshya!
Hey, Arun!`
      },
      {
        question: `Write a function createBill that takes a customer name and an array of item prices. It should return an object with: customer, itemCount, subtotal, vat (13%), and total. Call it with "Subekshya" and [200, 80, 150].`,
        hint: "Use reduce() or a loop to sum the prices array. Return an object with { customer, itemCount, subtotal, vat, total }.",
        solutionCode: `const createBill = (customer, prices) => {
  const subtotal = prices.reduce((sum, p) => sum + p, 0);
  const vat = subtotal * 0.13;
  const total = subtotal + vat;

  return {
    customer,
    itemCount: prices.length,
    subtotal,
    vat: parseFloat(vat.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};

const bill = createBill("Subekshya", [200, 80, 150]);
console.log(bill);`,
        expectedResult: `{customer: "Subekshya", itemCount: 3, subtotal: 430, vat: 55.9, total: 485.9}`
      },
      {
        question: `Demonstrate scope: create a function outerFn that defines a variable city = "Butwal". Inside it, define innerFn that defines food = "momo" and logs both city and food. Call outerFn(). Then try to log city outside — what happens?`,
        hint: "Variables defined inside a function are not accessible outside. Inner functions CAN access variables from outer functions (closure).",
        solutionCode: `function outerFn() {
  const city = "Butwal";

  function innerFn() {
    const food = "momo";
    console.log(\`\${food} from \${city}\`);
  }

  innerFn();
  // console.log(food); // Error! food is not defined here
}

outerFn();
// console.log(city); // Error! city is not defined here
console.log("city and food are not accessible outside their functions");`,
        expectedResult: `momo from Butwal
city and food are not accessible outside their functions`
      }
    ]
  },

  // ─── PHASE 4: Arrays ───
  {
    phase: 4,
    title: "Arrays",
    description: "Ordered collections of data — arrays are used everywhere in JavaScript and are essential for rendering lists in React.",
    color: "#3b82f6",
    icon: "fa-solid fa-list-ol",
    topics: ["Creating Arrays", "Accessing Elements", "push / pop / shift / unshift", "length", "indexOf / includes", "slice / splice", "for / for...of loops"],
    exercises: [
      {
        question: `Create an array of Subekshya's favorite Nepali foods: "momo", "dal bhat", "chatpate", "sel roti". Then:\n1. Add "thukpa" to the end\n2. Remove the first item\n3. Print the array length and the updated array.`,
        hint: "push() adds to end, shift() removes from start. .length gives the count.",
        solutionCode: `const foods = ["momo", "dal bhat", "chatpate", "sel roti"];

foods.push("thukpa");
foods.shift();

console.log(\`Count: \${foods.length}\`);
console.log(foods);`,
        expectedResult: `Count: 4
["dal bhat", "chatpate", "sel roti", "thukpa"]`
      },
      {
        question: `Arun has a list of cities he wants to visit in Nepal: ["Pokhara", "Kathmandu", "Lumbini", "Chitwan", "Janakpur", "Ilam"]. Use slice to get the first 3 cities without modifying the original. Then check if "Lumbini" is in the array and print its index.`,
        hint: "slice(start, end) returns a new array without modifying the original. indexOf() returns the position or -1 if not found.",
        solutionCode: `const cities = ["Pokhara", "Kathmandu", "Lumbini", "Chitwan", "Janakpur", "Ilam"];

const topThree = cities.slice(0, 3);
console.log("Top 3:", topThree);

const hasLumbini = cities.includes("Lumbini");
const lumbiniIndex = cities.indexOf("Lumbini");
console.log(\`Lumbini found: \${hasLumbini}, at index: \${lumbiniIndex}\`);`,
        expectedResult: `Top 3: ["Pokhara", "Kathmandu", "Lumbini"]
Lumbini found: true, at index: 2`
      },
      {
        question: `Use splice to modify an array in place. Start with Subekshya's schedule: ["Wake up", "Breakfast", "Netflix", "Lunch", "Netflix", "Dinner"]. Replace both "Netflix" entries with "Study JavaScript" and "Practice coding" using splice. Print the result.`,
        hint: "splice(startIndex, deleteCount, ...itemsToInsert) modifies the array in place. You may need to splice twice since indices shift.",
        solutionCode: `const schedule = ["Wake up", "Breakfast", "Netflix", "Lunch", "Netflix", "Dinner"];

// Replace first Netflix (index 2)
schedule.splice(2, 1, "Study JavaScript");
// After splice, second Netflix is now at index 4
schedule.splice(4, 1, "Practice coding");

console.log(schedule);`,
        expectedResult: `["Wake up", "Breakfast", "Study JavaScript", "Lunch", "Practice coding", "Dinner"]`
      },
      {
        question: `Use a for...of loop to iterate over an array of items Arun bought: [{name: "momo", qty: 2}, {name: "tea", qty: 3}, {name: "chatpate", qty: 1}]. Print each item like "2x momo" and also calculate the total number of items.`,
        hint: "for...of loops through each element directly. Keep a running total variable outside the loop.",
        solutionCode: `const items = [
  { name: "momo", qty: 2 },
  { name: "tea", qty: 3 },
  { name: "chatpate", qty: 1 }
];

let totalItems = 0;

for (const item of items) {
  console.log(\`\${item.qty}x \${item.name}\`);
  totalItems += item.qty;
}

console.log(\`Total items: \${totalItems}\`);`,
        expectedResult: `2x momo
3x tea
1x chatpate
Total items: 6`
      }
    ]
  },

  // ─── PHASE 5: Objects ───
  {
    phase: 5,
    title: "Objects",
    description: "Key-value data structures — objects model real-world entities and are the backbone of React state and props.",
    color: "#8b5cf6",
    icon: "fa-solid fa-cube",
    topics: ["Creating Objects", "Dot & Bracket Notation", "Adding / Modifying Properties", "Nested Objects", "Object Methods", "this keyword", "Object.keys / values / entries"],
    exercises: [
      {
        question: `Create a "restaurant" object with: name ("Subekshya's Kitchen"), location ("Butwal"), rating (4.8), and isOpen (true). Access the name using dot notation and the rating using bracket notation. Print both.`,
        hint: "Dot notation: obj.key. Bracket notation: obj['key']. Brackets are required when keys have spaces or are dynamic.",
        solutionCode: `const restaurant = {
  name: "Subekshya's Kitchen",
  location: "Butwal",
  rating: 4.8,
  isOpen: true
};

console.log(restaurant.name);
console.log(restaurant["rating"]);`,
        expectedResult: `Subekshya's Kitchen
4.8`
      },
      {
        question: `Create a nested object representing Arun's profile with an address object inside it (street, city, country). Also include an array of skills. Print the city from the address and the second skill.`,
        hint: "Access nested properties by chaining: obj.address.city. Arrays inside objects use index: obj.skills[1].",
        solutionCode: `const profile = {
  name: "Arun",
  age: 24,
  address: {
    street: "Main Road",
    city: "Butwal",
    country: "Nepal"
  },
  skills: ["JavaScript", "React", "Node.js"]
};

console.log(\`City: \${profile.address.city}\`);
console.log(\`Second skill: \${profile.skills[1]}\`);`,
        expectedResult: `City: Butwal
Second skill: React`
      },
      {
        question: `Create a calculator object with methods: add, subtract, multiply. Each method takes two parameters and returns the result. Also add a describe() method that uses 'this' to return the object's name property. Set name to "Nepali Calculator".`,
        hint: "Object methods are functions stored as properties. Use 'this' to refer to the object itself inside a method.",
        solutionCode: `const calculator = {
  name: "Nepali Calculator",
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  describe() {
    return \`This is \${this.name}\`;
  }
};

console.log(calculator.add(10, 5));
console.log(calculator.describe());`,
        expectedResult: `15
This is Nepali Calculator`
      },
      {
        question: `Given a menu object with food items and prices, use Object.keys(), Object.values(), and Object.entries() to:\n1. Print all food names\n2. Calculate the average price\n3. Print each entry as "momo: Rs. 200"`,
        hint: "Object.keys() returns an array of keys. Object.values() returns values. Object.entries() returns [key, value] pairs.",
        solutionCode: `const menu = {
  momo: 200,
  chatpate: 50,
  thukpa: 150,
  selRoti: 30
};

// 1. All food names
console.log("Foods:", Object.keys(menu));

// 2. Average price
const prices = Object.values(menu);
const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
console.log(\`Average price: Rs. \${avg}\`);

// 3. Print each entry
for (const [food, price] of Object.entries(menu)) {
  console.log(\`\${food}: Rs. \${price}\`);
}`,
        expectedResult: `Foods: ["momo", "chatpate", "thukpa", "selRoti"]
Average price: Rs. 107.5
momo: Rs. 200
chatpate: Rs. 50
thukpa: Rs. 150
selRoti: Rs. 30`
      }
    ]
  },

  // ─── PHASE 6: Modern ES6+ ───
  {
    phase: 6,
    title: "Modern ES6+",
    description: "Modern JavaScript syntax used heavily in React — destructuring, spread, and more make your code cleaner and shorter.",
    color: "#ec4899",
    icon: "fa-solid fa-wand-magic-sparkles",
    topics: ["Object Destructuring", "Array Destructuring", "Spread Operator", "Rest Parameters", "Short-circuit Evaluation", "Optional Chaining", "Nullish Coalescing"],
    exercises: [
      {
        question: `Subekshya's profile object has: name, age, city, hobby. Use object destructuring to extract name and city into variables in one line. Also rename 'hobby' to 'favoriteHobby' during destructuring. Print all three.`,
        hint: "Destructuring with rename: const { oldName: newName } = obj. This creates a variable called newName.",
        solutionCode: `const subekshya = {
  name: "Subekshya",
  age: 22,
  city: "Butwal",
  hobby: "coding"
};

const { name, city, hobby: favoriteHobby } = subekshya;

console.log(name);
console.log(city);
console.log(favoriteHobby);`,
        expectedResult: `Subekshya
Butwal
coding`
      },
      {
        question: `Arun has two arrays of favorite things: hobbies and foods. Use the spread operator to:\n1. Combine them into one array\n2. Create a copy of the hobbies array and add a new item to the copy (without changing the original)\nPrint both results.`,
        hint: "Spread in arrays: [...arr1, ...arr2]. To copy: const copy = [...original]. Then push to the copy.",
        solutionCode: `const hobbies = ["coding", "reading"];
const foods = ["momo", "dal bhat"];

// 1. Combine
const combined = [...hobbies, ...foods];
console.log("Combined:", combined);

// 2. Copy and extend
const hobbiesCopy = [...hobbies];
hobbiesCopy.push("gaming");
console.log("Copy:", hobbiesCopy);
console.log("Original:", hobbies);`,
        expectedResult: `Combined: ["coding", "reading", "momo", "dal bhat"]
Copy: ["coding", "reading", "gaming"]
Original: ["coding", "reading"]`
      },
      {
        question: `Write a function that takes a required "dish" name and uses rest parameters (...toppings) to collect any number of extra toppings. Print the dish and list all toppings. Call it with "momo", "chutney", "achaar", "chili flakes".`,
        hint: "Rest parameters collect remaining arguments into an array: function(first, ...rest). 'rest' becomes an array.",
        solutionCode: `const describeOrder = (dish, ...toppings) => {
  console.log(\`Dish: \${dish}\`);
  console.log(\`Toppings: \${toppings.join(", ")}\`);
  console.log(\`Total toppings: \${toppings.length}\`);
};

describeOrder("momo", "chutney", "achaar", "chili flakes");`,
        expectedResult: `Dish: momo
Toppings: chutney, achaar, chili flakes
Total toppings: 3`
      },
      {
        question: `Given a deeply nested object representing a user order, use optional chaining (?.) to safely access:\n1. user.address.city (exists)\n2. user.payment.card.number (payment is null)\nUse nullish coalescing (??) to provide defaults for missing values.`,
        hint: "Optional chaining: obj?.prop returns undefined instead of throwing an error if obj is null/undefined. ?? provides a fallback only for null/undefined.",
        solutionCode: `const order = {
  user: {
    name: "Subekshya",
    address: {
      city: "Butwal"
    },
    payment: null
  }
};

const city = order.user?.address?.city ?? "Unknown city";
const cardNumber = order.user?.payment?.card?.number ?? "No card on file";

console.log(\`City: \${city}\`);
console.log(\`Card: \${cardNumber}\`);`,
        expectedResult: `City: Butwal
Card: No card on file`
      }
    ]
  },

  // ─── PHASE 7: Array Methods (React Essentials) ───
  {
    phase: 7,
    title: "Array Methods (React Essentials)",
    description: "The most important methods for React — map, filter, find, and reduce are used constantly for rendering lists, filtering data, and computing values.",
    color: "#ef4444",
    icon: "fa-solid fa-fire",
    topics: ["map()", "filter()", "find()", "reduce()", "some() / every()", "sort()", "Chaining Methods"],
    exercises: [
      {
        question: `You have an array of friends: ["Arun", "Subekshya", "Ram", "Sita"]. Use .map() to create a new array where each name becomes an object with id and name properties. The id should be the index + 1. Print the result.`,
        hint: "map((item, index) => ...) gives you both the element and its index. Return a new object for each element.",
        solutionCode: `const friends = ["Arun", "Subekshya", "Ram", "Sita"];

const friendObjects = friends.map((name, index) => ({
  id: index + 1,
  name: name
}));

console.log(friendObjects);`,
        expectedResult: `[{id: 1, name: "Arun"}, {id: 2, name: "Subekshya"}, {id: 3, name: "Ram"}, {id: 4, name: "Sita"}]`
      },
      {
        question: `Given a menu array of objects with name, price, and isVeg properties, use:\n1. filter() to get only veg items\n2. find() to get the item named "momo"\n3. some() to check if any item costs more than 300\n4. every() to check if all items cost more than 20`,
        hint: "filter() returns a new array. find() returns the first match or undefined. some()/every() return booleans.",
        solutionCode: `const menu = [
  { name: "momo", price: 200, isVeg: false },
  { name: "dal bhat", price: 150, isVeg: true },
  { name: "chatpate", price: 50, isVeg: true },
  { name: "sekuwa", price: 350, isVeg: false }
];

const vegItems = menu.filter(item => item.isVeg);
console.log("Veg items:", vegItems.map(i => i.name));

const momo = menu.find(item => item.name === "momo");
console.log("Found:", momo.name, "Rs.", momo.price);

const hasExpensive = menu.some(item => item.price > 300);
console.log("Has item > Rs. 300:", hasExpensive);

const allAbove20 = menu.every(item => item.price > 20);
console.log("All above Rs. 20:", allAbove20);`,
        expectedResult: `Veg items: ["dal bhat", "chatpate"]
Found: momo Rs. 200
Has item > Rs. 300: true
All above Rs. 20: true`
      },
      {
        question: `Subekshya is tracking expenses for a trip to Pokhara. Given an array of expenses [{item, amount}], use reduce() to calculate the total. Then find the most expensive item.`,
        hint: "reduce((accumulator, current) => ..., initialValue) processes each element and builds a single result. Start with 0 for summing.",
        solutionCode: `const expenses = [
  { item: "Bus ticket", amount: 800 },
  { item: "Hotel", amount: 2500 },
  { item: "Boating", amount: 500 },
  { item: "Momo dinner", amount: 400 },
  { item: "Souvenirs", amount: 600 }
];

const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
console.log(\`Total spent: Rs. \${total}\`);

const mostExpensive = expenses.reduce((max, exp) =>
  exp.amount > max.amount ? exp : max
);
console.log(\`Most expensive: \${mostExpensive.item} (Rs. \${mostExpensive.amount})\`);`,
        expectedResult: `Total spent: Rs. 4800
Most expensive: Hotel (Rs. 2500)`
      },
      {
        question: `Chain multiple array methods together. Given students with name, score, and subject:\n1. Filter students who scored above 70\n2. Map them to just their names\n3. Sort alphabetically\nDo it all in one chain.`,
        hint: "Chain methods by calling .filter().map().sort() one after another. Each returns a new array that the next method works on.",
        solutionCode: `const students = [
  { name: "Subekshya", score: 92, subject: "JS" },
  { name: "Arun", score: 88, subject: "JS" },
  { name: "Ram", score: 65, subject: "JS" },
  { name: "Sita", score: 78, subject: "JS" },
  { name: "Hari", score: 45, subject: "JS" }
];

const topStudents = students
  .filter(s => s.score > 70)
  .map(s => s.name)
  .sort();

console.log("Top students:", topStudents);`,
        expectedResult: `Top students: ["Arun", "Sita", "Subekshya"]`
      }
    ]
  },

  // ─── PHASE 8: Asynchronous JavaScript ───
  {
    phase: 8,
    title: "Asynchronous JavaScript",
    description: "Handling operations that take time — fetching data, waiting for responses, and managing async flow with Promises and async/await.",
    color: "#06b6d4",
    icon: "fa-solid fa-clock",
    topics: ["Callbacks", "Promises", ".then() / .catch()", "async / await", "fetch API", "try / catch", "Working with JSON"],
    exercises: [
      {
        question: `Create a Promise called fetchOrder that simulates fetching Subekshya's food order. After 1 second, it should resolve with {item: "momo", quantity: 2, status: "ready"}. Handle it with .then() and .catch().`,
        hint: "new Promise((resolve, reject) => { ... }). Use setTimeout inside to simulate delay. Chain .then() for success and .catch() for errors.",
        solutionCode: `const fetchOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ item: "momo", quantity: 2, status: "ready" });
  }, 1000);
});

fetchOrder
  .then(order => {
    console.log(\`Order: \${order.quantity}x \${order.item}\`);
    console.log(\`Status: \${order.status}\`);
  })
  .catch(err => {
    console.log("Error:", err);
  });`,
        expectedResult: `Order: 2x momo
Status: ready`
      },
      {
        question: `Rewrite the previous exercise using async/await with try/catch. Create an async function getOrder() that awaits the promise and logs the result. Also handle potential errors.`,
        hint: "async functions always return a Promise. await pauses execution until the Promise resolves. Wrap in try/catch for error handling.",
        solutionCode: `const fetchOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ item: "momo", quantity: 2, status: "ready" });
    }, 1000);
  });
};

const getOrder = async () => {
  try {
    const order = await fetchOrder();
    console.log(\`Order: \${order.quantity}x \${order.item}\`);
    console.log(\`Status: \${order.status}\`);
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
};

getOrder();`,
        expectedResult: `Order: 2x momo
Status: ready`
      },
      {
        question: `Simulate a mini API: create a function fetchUsers() that returns a Promise resolving with a JSON string of users after 500ms. Parse the JSON, filter users from "Butwal", and print their names.`,
        hint: "JSON.parse() converts a JSON string to a JavaScript object/array. You can chain async operations with await.",
        solutionCode: `const fetchUsers = () => {
  return new Promise((resolve) => {
    const data = JSON.stringify([
      { name: "Arun", city: "Butwal" },
      { name: "Sita", city: "Kathmandu" },
      { name: "Subekshya", city: "Butwal" },
      { name: "Ram", city: "Pokhara" }
    ]);
    setTimeout(() => resolve(data), 500);
  });
};

const getLocalUsers = async () => {
  const raw = await fetchUsers();
  const users = JSON.parse(raw);
  const butwalis = users.filter(u => u.city === "Butwal");
  butwalis.forEach(u => console.log(u.name));
};

getLocalUsers();`,
        expectedResult: `Arun
Subekshya`
      },
      {
        question: `Create two async functions: fetchMenu() returns a list of foods after 300ms, and fetchPrices() returns a price map after 500ms. Use Promise.all to fetch both at the same time and combine the results.`,
        hint: "Promise.all([p1, p2]) runs promises in parallel and resolves when ALL are done. It returns an array of results in the same order.",
        solutionCode: `const fetchMenu = () => new Promise(resolve => {
  setTimeout(() => resolve(["momo", "thukpa", "chatpate"]), 300);
});

const fetchPrices = () => new Promise(resolve => {
  setTimeout(() => resolve({ momo: 200, thukpa: 150, chatpate: 50 }), 500);
});

const loadRestaurant = async () => {
  const [menu, prices] = await Promise.all([fetchMenu(), fetchPrices()]);

  menu.forEach(item => {
    console.log(\`\${item}: Rs. \${prices[item]}\`);
  });
};

loadRestaurant();`,
        expectedResult: `momo: Rs. 200
thukpa: Rs. 150
chatpate: Rs. 50`
      }
    ]
  },

  // ─── PHASE 9: DOM Manipulation ───
  {
    phase: 9,
    title: "DOM Manipulation",
    description: "Interacting with web pages — selecting elements, changing content, handling events. This is what React automates for you.",
    color: "#f97316",
    icon: "fa-solid fa-window-maximize",
    topics: ["getElementById / querySelector", "textContent / innerHTML", "classList", "createElement / appendChild", "addEventListener", "Event Object", "Forms & Input Values"],
    exercises: [
      {
        question: `Write code that selects an element with id="greeting", changes its text to "Namaste, Subekshya!", adds a CSS class "highlight" to it, and changes its color to blue. (Imagine the HTML element exists.)`,
        hint: "querySelector('#id') or getElementById('id') selects elements. .textContent sets text. .classList.add() adds CSS classes. .style.color sets inline color.",
        solutionCode: `// Assuming: <p id="greeting">Hello</p>
const el = document.getElementById("greeting");

el.textContent = "Namaste, Subekshya!";
el.classList.add("highlight");
el.style.color = "blue";

console.log(el.textContent);
console.log(el.classList.contains("highlight"));`,
        expectedResult: `Namaste, Subekshya!
true`
      },
      {
        question: `Write code to create a new <li> element with text "Learn React", add a class "todo-item" to it, and append it to an existing <ul> with id="todo-list". Then create two more items the same way.`,
        hint: "document.createElement('li') creates a new element. Set .textContent, then use parentEl.appendChild(newEl) to add it to the DOM.",
        solutionCode: `const todoList = document.getElementById("todo-list");

const todos = ["Learn React", "Build a project", "Get hired"];

todos.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("todo-item");
  todoList.appendChild(li);
});

console.log(\`Added \${todos.length} items to the list\`);`,
        expectedResult: `Added 3 items to the list`
      },
      {
        question: `Add a click event listener to a button with id="order-btn". When clicked, it should:\n1. Read the value from an input with id="food-input"\n2. Create a new <p> element showing "Ordered: [food]"\n3. Append it to a div with id="orders"\n4. Clear the input field`,
        hint: "addEventListener('click', callback). Get input value with inputEl.value. Clear it by setting .value = ''.",
        solutionCode: `const btn = document.getElementById("order-btn");
const input = document.getElementById("food-input");
const ordersDiv = document.getElementById("orders");

btn.addEventListener("click", () => {
  const food = input.value.trim();

  if (food === "") {
    console.log("Please enter a food item");
    return;
  }

  const p = document.createElement("p");
  p.textContent = \`Ordered: \${food}\`;
  ordersDiv.appendChild(p);

  input.value = "";
  console.log(\`\${food} has been ordered!\`);
});

// Simulating a click after setting input value
input.value = "momo";
btn.click();`,
        expectedResult: `momo has been ordered!`
      },
      {
        question: `Use querySelectorAll to select all elements with class "menu-item". Loop through them and add a click event to each that logs the item's data-price attribute and text. Use the event object to access the clicked element.`,
        hint: "querySelectorAll returns a NodeList. Use forEach to loop. event.target gives the clicked element. dataset.price accesses data-price attribute.",
        solutionCode: `// Assuming: <div class="menu-item" data-price="200">Momo</div> etc.
const items = document.querySelectorAll(".menu-item");

items.forEach(item => {
  item.addEventListener("click", (event) => {
    const name = event.target.textContent;
    const price = event.target.dataset.price;
    console.log(\`\${name} costs Rs. \${price}\`);
  });
});

console.log(\`Found \${items.length} menu items\`);`,
        expectedResult: `Found 3 menu items`
      }
    ]
  },

  // ─── PHASE 10: Putting It All Together ───
  {
    phase: 10,
    title: "Putting It All Together",
    description: "Combining everything you've learned — working with complex data, building app logic, and patterns you'll use daily in React.",
    color: "#14b8a6",
    icon: "fa-solid fa-trophy",
    topics: ["Combining Concepts", "Mini App Logic", "State Management Patterns", "Arrays of Objects", "CRUD Operations", "Data Transformation"],
    exercises: [
      {
        question: `Build a mini todo list manager. Create functions: addTodo(todos, text), toggleTodo(todos, id), and getStats(todos). Start with an empty array, add 3 todos about learning JavaScript, toggle one as complete, then print stats (total, completed, pending).`,
        hint: "Each todo should be an object with id, text, completed. Use map() to toggle. Use filter() to count completed/pending.",
        solutionCode: `let nextId = 1;

const addTodo = (todos, text) => {
  return [...todos, { id: nextId++, text, completed: false }];
};

const toggleTodo = (todos, id) => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

const getStats = (todos) => {
  const completed = todos.filter(t => t.completed).length;
  return {
    total: todos.length,
    completed,
    pending: todos.length - completed
  };
};

let todos = [];
todos = addTodo(todos, "Learn variables and functions");
todos = addTodo(todos, "Master array methods");
todos = addTodo(todos, "Build a React app with Arun");
todos = toggleTodo(todos, 1);

console.log(todos);
console.log(getStats(todos));`,
        expectedResult: `[{id: 1, text: "Learn variables and functions", completed: true}, {id: 2, text: "Master array methods", completed: false}, {id: 3, text: "Build a React app with Arun", completed: false}]
{total: 3, completed: 1, pending: 2}`
      },
      {
        question: `Build a contact list system for people in Butwal. Create functions:\n- addContact(contacts, name, phone)\n- searchContacts(contacts, query) — searches by name (case-insensitive)\n- deleteContact(contacts, id)\nAdd 4 contacts, search for one, delete one, then print the remaining list.`,
        hint: "Use filter() for search and delete. Use toLowerCase() and includes() for case-insensitive search. Spread operator to add new contacts immutably.",
        solutionCode: `let contactId = 1;

const addContact = (contacts, name, phone) => {
  return [...contacts, { id: contactId++, name, phone }];
};

const searchContacts = (contacts, query) => {
  return contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
};

const deleteContact = (contacts, id) => {
  return contacts.filter(c => c.id !== id);
};

let contacts = [];
contacts = addContact(contacts, "Subekshya", "9801234567");
contacts = addContact(contacts, "Arun", "9807654321");
contacts = addContact(contacts, "Sita Sharma", "9811111111");
contacts = addContact(contacts, "Sunil KC", "9812222222");

// Search
const results = searchContacts(contacts, "su");
console.log("Search 'su':", results.map(c => c.name));

// Delete contact with id 3
contacts = deleteContact(contacts, 3);
console.log("After delete:", contacts.map(c => c.name));`,
        expectedResult: `Search 'su': ["Subekshya", "Sunil KC"]
After delete: ["Subekshya", "Arun", "Sunil KC"]`
      },
      {
        question: `Build a simple expense tracker using closures and higher-order functions. Create a makeExpenseTracker(budget) function that returns an object with: addExpense(desc, amount), getBalance(), and getSummary(). Track expenses for a trip to Pokhara with Subekshya with budget Rs. 5000.`,
        hint: "Use closures to keep the expenses array and budget private. Return an object with methods that access these closed-over variables.",
        solutionCode: `const makeExpenseTracker = (budget) => {
  const expenses = [];

  return {
    addExpense(desc, amount) {
      expenses.push({ desc, amount });
      return \`Added: \${desc} (Rs. \${amount})\`;
    },

    getBalance() {
      const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
      return budget - spent;
    },

    getSummary() {
      const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
      return {
        budget,
        spent,
        balance: budget - spent,
        items: expenses.length
      };
    }
  };
};

const trip = makeExpenseTracker(5000);
console.log(trip.addExpense("Bus to Pokhara", 800));
console.log(trip.addExpense("Hotel room", 2000));
console.log(trip.addExpense("Lakeside momo", 400));
console.log(\`Balance: Rs. \${trip.getBalance()}\`);
console.log(trip.getSummary());`,
        expectedResult: `Added: Bus to Pokhara (Rs. 800)
Added: Hotel room (Rs. 2000)
Added: Lakeside momo (Rs. 400)
Balance: Rs. 1800
{budget: 5000, spent: 3200, balance: 1800, items: 3}`
      },
      {
        question: `Build a data transformation pipeline. Given raw order data (array of objects with nested info), write a pipeline that:\n1. Filters orders from "Butwal"\n2. Maps to a summary format\n3. Sorts by total amount (descending)\n4. Reduces to calculate grand total\nDo it all with chained methods.`,
        hint: "Chain .filter().map().sort() and use a separate .reduce() for the total. sort((a, b) => b.total - a.total) sorts descending.",
        solutionCode: `const orders = [
  { id: 1, customer: "Subekshya", city: "Butwal", items: ["momo", "tea"], total: 280 },
  { id: 2, customer: "Ram", city: "Kathmandu", items: ["dal bhat"], total: 150 },
  { id: 3, customer: "Arun", city: "Butwal", items: ["chatpate", "lassi", "momo"], total: 350 },
  { id: 4, customer: "Sita", city: "Pokhara", items: ["thukpa"], total: 180 },
  { id: 5, customer: "Hari", city: "Butwal", items: ["sel roti"], total: 60 }
];

const butwaliOrders = orders
  .filter(o => o.city === "Butwal")
  .map(o => ({
    customer: o.customer,
    itemCount: o.items.length,
    total: o.total
  }))
  .sort((a, b) => b.total - a.total);

console.log("Butwal orders:", butwaliOrders);

const grandTotal = butwaliOrders.reduce((sum, o) => sum + o.total, 0);
console.log(\`Grand total: Rs. \${grandTotal}\`);`,
        expectedResult: `Butwal orders: [{customer: "Arun", itemCount: 3, total: 350}, {customer: "Subekshya", itemCount: 2, total: 280}, {customer: "Hari", itemCount: 1, total: 60}]
Grand total: Rs. 690`
      }
    ]
  }
];
