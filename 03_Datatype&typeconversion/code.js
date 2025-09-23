// Create object
let student = {
  name: "Ali",
  age: 20,
  isEnrolled: true
};

// Print values individually
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Is Enrolled:", student.isEnrolled);

alert("Name: " + student.name + 
      "\nAge: " + student.age + 
      "\nIs Enrolled: " + student.isEnrolled);


      
let userInput = prompt("Enter a number (e.g., '42'):");

// Convert to number
let numberValue = Number(userInput);

// Add 10
let result = numberValue + 10;

// Print result
alert("Result: " + result);
console.log("Result:", result);