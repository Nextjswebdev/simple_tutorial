'use client'

import { useState } from 'react';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';  // Adjust the import path if needed
import imageBg from '../../public/topic.png';
import loopBg from '../../public/loop.jpg';
 


export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-screen">
   <Sidebar setSelectedTopic={setSelectedTopic} />
      <div className="w-full md:w-3/4 p-8 bg-white overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {selectedTopic ? selectedTopic : 'Select a Topic'}
        </h1>
        <div className="text-gray-700">
          {selectedTopic === 'introduction' && (
            <>
              <p className="mb-4">JavaScript is a programming language commonly used in web development. It allows you to add interactivity and dynamic behavior to your websites.</p>
              <p className="mb-4">With JavaScript, you can:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Manipulate HTML content</li>
                <li>Modify CSS styles</li>
                <li>React to user actions</li>
                <li>Send and receive data from a server asynchronously</li>
                <li>Create animations and effects</li>
                <li>And much more!</li>
              </ul>
              <p className="mb-4">JavaScript code is executed on the client-side (in the user's web browser), making it fast and efficient for building responsive user interfaces.</p>
              <Image src={imageBg} width={400} height={200} alt="JavaScript" className="w-full mb-4" />

              <p className="mb-4">Below is an example of a simple JavaScript function:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World')); // Output: Hello, World!`}
                </code>
              </pre>
            </>
          )}
          {selectedTopic === 'basic-syntax' && (
            <>
              <p className="mb-4">The basic syntax of JavaScript is relatively simple and easy to understand. Here are some key concepts:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Variables:</strong> Used to store data values. Variables can be declared using the <code>var</code>, <code>let</code>, or <code>const</code> keywords.</li>
                <li><strong>Data Types:</strong> JavaScript supports several data types including numbers, strings, booleans, arrays, objects, and more.</li>
                <li><strong>Operators:</strong> Used to perform operations on variables and values. Common operators include arithmetic, assignment, comparison, and logical operators.</li>
                <li><strong>Control Structures:</strong> Used to control the flow of a program. This includes conditional statements (if, else if, else) and loops (for, while, do-while).</li>
                <li><strong>Functions:</strong> Blocks of reusable code that perform a specific task. Functions can accept parameters and return values.</li>
                <li><strong>Objects:</strong> Used to group related data and functionality into a single entity. Objects consist of key-value pairs called properties and methods.</li>
              </ul>
              <p className="mb-4">Understanding these fundamental concepts is essential for writing JavaScript code effectively.</p>
            </>
          )}
          {selectedTopic === 'variables' && (
            <>
              <p className="mb-4">Variables in JavaScript are containers for storing data values. You can think of them as named storage locations. Here's how you declare variables:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>var:</strong> Used to declare variables in older versions of JavaScript. Variables declared with <code>var</code> have function scope.</li>
                <li><strong>let:</strong> Introduced in ES6 (ECMAScript 2015). Variables declared with <code>let</code> have block scope.</li>
                <li><strong>const:</strong> Also introduced in ES6. Variables declared with <code>const</code> are constants and cannot be reassigned.</li>
              </ul>
              <Image src={imageBg} width={400} height={200} alt="JavaScript Variables" className="w-full mb-4" />

              <p className="mb-4">Here are examples of each:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`var name = 'John';
let age = 30;
const isDeveloper = true;

console.log(name); // Output: John
console.log(age); // Output: 30
console.log(isDeveloper); // Output: true`}
                </code>
              </pre>
            </>
          )}
          {selectedTopic === 'data-types' && (
            <>
              <p className="mb-4">JavaScript supports several data types including numbers, strings, booleans, arrays, objects, and more:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Numbers:</strong> Integers and floating-point numbers.</li>
                <li><strong>Strings:</strong> Textual data enclosed in single or double quotes.</li>
                <li><strong>Booleans:</strong> Logical values <code>true</code> or <code>false</code>.</li>
                <li><strong>Arrays:</strong> Ordered collections of values.</li>
                <li><strong>Objects:</strong> Complex data structures consisting of key-value pairs.</li>
              </ul>
            </>
          )}
          {selectedTopic === 'operators' && (
            <>
              <p className="mb-4">Operators in JavaScript are symbols that perform operations on operands. Here are some common types of operators:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Arithmetic Operators:</strong> Used for basic arithmetic operations like addition, subtraction, multiplication, division, etc.</li>
                <li><strong>Assignment Operators:</strong> Used to assign values to variables.</li>
                <li><strong>Comparison Operators:</strong> Used to compare values. They return true or false based on the comparison.</li>
                <li><strong>Logical Operators:</strong> Used to combine multiple conditions.</li>
                <li><strong>Unary Operators:</strong> Operators that work on a single operand.</li>
                <li><strong>Ternary Operator (Conditional Operator):</strong> An operator that takes three operands and returns a value based on a condition.</li>
              </ul>
            </>
          )}
          {selectedTopic === 'control-structures' && (
            <>
              <p className="mb-4">Control structures in JavaScript allow you to control the flow of your program. Here are some common control structures:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>if statement:</strong> Used to execute a block of code if a condition is true.</li>
                <li><strong>else statement:</strong> Used to execute a block of code if the same condition is false.</li>
                <li><strong>else if statement:</strong> Used to specify a new condition if the first condition is false.</li>
                <li><strong>switch statement:</strong> Used to perform different actions based on different conditions.</li>
                <li><strong>for loop:</strong> Used to run a block of code a specified number of times.</li>
                <li><strong>while loop:</strong> Used to run a block of code as long as a condition is true.</li>
                <li><strong>do-while loop:</strong> Similar to a while loop, but it will run at least once before checking the condition.</li>
              </ul>
            </>
          )}
          {selectedTopic === 'functions' && (
            <>
              <p className="mb-4">Functions in JavaScript are reusable blocks of code that perform a specific task. They help make your code modular and easier to maintain. Here's how you can define a function:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`function functionName(parameters) {
  // code to be executed
}

functionName(arguments); // Calling the function`}
                </code>
              </pre>
              <p className="mb-4">You can also define functions using the arrow function syntax introduced in ES6:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`const functionName = (parameters) => {
  // code to be executed
}

functionName(arguments); // Calling the function`}
                </code>
              </pre>
            </>
          )}
          {selectedTopic === 'objects' && (
            <>
              <p className="mb-4">Objects in JavaScript are used to store collections of data and more complex entities. An object is a collection of properties, and a property is an association between a name (or key) and a value. Here's an example:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  greet: function() {
    console.log('Hello, ' + this.firstName);
  }
};

console.log(person.firstName); // Output: John
person.greet(); // Output: Hello, John`}
                </code>
              </pre>
            </>
          )}
          {selectedTopic === 'arrays' && (
            <>
              <p className="mb-4">Arrays in JavaScript are used to store multiple values in a single variable. They are a special type of object. Here's how you can create an array:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`const fruits = ['Apple', 'Banana', 'Cherry'];

console.log(fruits[0]); // Output: Apple
console.log(fruits.length); // Output: 3`}
                </code>
              </pre>
              <p className="mb-4">You can also perform various operations on arrays using built-in methods like <code>push()</code>, <code>pop()</code>, <code>shift()</code>, <code>unshift()</code>, <code>map()</code>, <code>filter()</code>, and more.</p>
            </>
          )}
          {selectedTopic === 'loops' && (
            <>
              <p className="mb-4">Loops in JavaScript are used to perform repeated actions. Here are some common types of loops:</p>
              <Image src={loopBg} width={400} height={200} alt="JavaScript" className="w-full mb-4" />
              <ul className="list-disc pl-6 mb-4">
                <li><strong>for loop:</strong> Repeats a block of code a specified number of times.</li>
                <li><strong>while loop:</strong> Repeats a block of code as long as a condition is true.</li>
                <li><strong>do-while loop:</strong> Similar to a while loop, but it executes the block of code once before checking the condition.</li>
                <li><strong>for...in loop:</strong> Iterates over the properties of an object.</li>
                <li><strong>for...of loop:</strong> Iterates over the values of an iterable object (like an array).</li>
              </ul>
            </>
          )}
          {selectedTopic === 'scope' && (
            <>
              <p className="mb-4">Scope in JavaScript refers to the accessibility of variables. There are three types of scope:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Global Scope:</strong> Variables declared outside any function have global scope and can be accessed from anywhere in the code.</li>
                <li><strong>Function Scope:</strong> Variables declared within a function have function scope and can only be accessed within that function.</li>
                <li><strong>Block Scope:</strong> Variables declared with <code>let</code> or <code>const</code> within a block (e.g., inside an <code>if</code> statement or a loop) have block scope and can only be accessed within that block.</li>
              </ul>
            </>
          )}
          {selectedTopic === 'dom-manipulation' && (
            <>
              <p className="mb-4">DOM (Document Object Model) manipulation in JavaScript allows you to interact with and modify the structure, style, and content of HTML documents. Here are some common methods for DOM manipulation:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>getElementById:</strong> Selects an element by its ID.</li>
                <li><strong>getElementsByClassName:</strong> Selects elements by their class name.</li>
                <li><strong>getElementsByTagName:</strong> Selects elements by their tag name.</li>
                <li><strong>querySelector:</strong> Selects the first element that matches a CSS selector.</li>
                <li><strong>querySelectorAll:</strong> Selects all elements that match a CSS selector.</li>
                <li><strong>createElement:</strong> Creates a new HTML element.</li>
                <li><strong>appendChild:</strong> Adds a new child element to a parent element.</li>
                <li><strong>removeChild:</strong> Removes a child element from a parent element.</li>
              </ul>
              <p className="mb-4">Here's an example of how to change the content of an HTML element:</p>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {`document.getElementById('myElement').innerHTML = 'New Content';`}
                </code>
              </pre>
            </>
          )}
          {/* Add more content for other topics here */}
        </div>
      </div>
    </div>
  );
}
