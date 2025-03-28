import { InsertPattern } from "@shared/schema";

/**
 * Collection of design patterns to populate the database
 */
export const patternsData: Omit<InsertPattern, "id">[] = [
  {
    name: "Singleton",
    slug: "singleton",
    description: "Ensures a class has only one instance and provides a global point of access to it",
    category: "javascript",
    difficulty: "beginner",
    type: "creational",
    content: `<p>The Singleton pattern is one of the simplest design patterns. Sometimes we need to have only one instance of our class. For example, we need to have only one database connection, or we need to have only one file manager.</p>
    <p>The Singleton pattern is used to restrict the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system.</p>`,
    codeExample: `class Singleton {
  private static instance: Singleton;
  
  // Private constructor to prevent direct construction calls with 'new'
  private constructor() { }
  
  // Static method to access the singleton instance
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    
    return Singleton.instance;
  }
  
  // Example method
  public someBusinessLogic() {
    console.log('Executing some business logic in the singleton');
  }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // true - both variables reference the same instance`,
    codeTemplate: `// Implement a Singleton pattern for a configuration manager
// It should store key-value pairs and ensure only one instance exists

class ConfigManager {
  // Your implementation here
}

// Test your implementation
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

config1.set('theme', 'dark');
console.log(config2.get('theme')); // Should output 'dark'
console.log(config1 === config2); // Should output true`,
    relatedPatterns: [
      {
        id: 2,
        name: "Factory Method",
        description: "Creates objects without specifying the exact class to create"
      },
      {
        id: 3,
        name: "Module Pattern",
        description: "Implements a module with private and public methods"
      }
    ],
    realWorldExamples: [
      {
        title: "Database Connection Pool",
        description: "Many applications use a singleton to manage database connections to ensure a single connection pool is reused throughout the application."
      },
      {
        title: "Configuration Settings",
        description: "Application settings often use singletons to ensure consistent configuration across the entire application."
      }
    ],
    benefits: [
      "Guarantees a single instance throughout application",
      "Provides a global access point to that instance",
      "The singleton object is initialized only when it's requested for the first time",
      "Avoids variable pollution in the global namespace"
    ],
    drawbacks: [
      "Can make unit testing more difficult",
      "Can hide dependencies instead of exposing them through interfaces",
      "Violates the Single Responsibility Principle",
      "Can cause issues in multithreaded environments"
    ],
    furtherReading: [
      {
        title: "Singleton Pattern in JavaScript",
        description: "A detailed explanation of the Singleton pattern implementation in JavaScript",
        url: "https://www.patterns.dev/posts/singleton-pattern"
      },
      {
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        description: "The original book by the Gang of Four describing design patterns including Singleton",
        url: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612"
      }
    ]
  },
  {
    name: "Factory Method",
    slug: "factory-method",
    description: "Defines an interface for creating an object, but lets subclasses decide which class to instantiate",
    category: "javascript",
    difficulty: "intermediate",
    type: "creational",
    content: `<p>The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.</p>
    <p>This pattern is particularly useful when you don't know ahead of time what class object you need. It provides a way to delegate the instantiation logic to child classes.</p>`,
    codeExample: `// Product interface
interface Product {
  operation(): string;
}

// Concrete Products
class ConcreteProduct1 implements Product {
  operation(): string {
    return 'Result of ConcreteProduct1';
  }
}

class ConcreteProduct2 implements Product {
  operation(): string {
    return 'Result of ConcreteProduct2';
  }
}

// Creator abstract class
abstract class Creator {
  // Factory method
  abstract createProduct(): Product;
  
  // Some business logic that uses the factory method
  someOperation(): string {
    const product = this.createProduct();
    return \`Creator: The same creator's code has just worked with \${product.operation()}\`;
  }
}

// Concrete Creators override the factory method to change the resulting product's type
class ConcreteCreator1 extends Creator {
  createProduct(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  createProduct(): Product {
    return new ConcreteProduct2();
  }
}

// Client code
function clientCode(creator: Creator) {
  console.log(creator.someOperation());
}

// Usage
console.log('App: Launched with ConcreteCreator1');
clientCode(new ConcreteCreator1());
console.log('App: Launched with ConcreteCreator2');
clientCode(new ConcreteCreator2());`,
    codeTemplate: `// Implement a Vehicle Factory pattern
// The factory should create different types of vehicles (Car, Truck, Motorcycle)

// Your implementation here

// Test your factory
const vehicleFactory = new VehicleFactory();
const car = vehicleFactory.createVehicle('car');
const truck = vehicleFactory.createVehicle('truck');
const motorcycle = vehicleFactory.createVehicle('motorcycle');

car.drive(); // Should output something like "Driving a car"
truck.drive(); // Should output something like "Driving a truck"
motorcycle.drive(); // Should output something like "Driving a motorcycle"`,
    relatedPatterns: [
      {
        id: 1,
        name: "Singleton",
        description: "Ensures a class has only one instance and provides a global point of access to it"
      },
      {
        id: 5,
        name: "Abstract Factory",
        description: "Provides an interface for creating families of related objects"
      }
    ],
    realWorldExamples: [
      {
        title: "UI Component Creation",
        description: "Framework libraries like React use factory methods to create different UI components based on the user's needs."
      },
      {
        title: "Document Generators",
        description: "Applications that generate different document types (PDF, Word, Excel) often use factory methods to create the appropriate document handler."
      }
    ],
    benefits: [
      "Eliminates the need to bind application-specific classes into your code",
      "Creates objects on demand instead of creating them at initialization time",
      "Provides hooks for subclasses to customize internal objects that a method uses",
      "Connects parallel class hierarchies"
    ],
    drawbacks: [
      "Can result in a huge number of small files (one for each class)",
      "May be overkill for simple applications",
      "Can increase complexity by requiring many new subclasses",
      "Clients might need to subclass just to create an appropriate Product object"
    ],
    furtherReading: [
      {
        title: "Factory Method Pattern in JavaScript",
        description: "A detailed tutorial on implementing factory method patterns in JavaScript",
        url: "https://www.patterns.dev/posts/factory-pattern"
      },
      {
        title: "Refactoring Guru: Factory Method",
        description: "Detailed explanation of the Factory Method pattern with examples and code",
        url: "https://refactoring.guru/design-patterns/factory-method"
      }
    ]
  },
  {
    name: "Module Pattern",
    slug: "module-pattern",
    description: "Implements a module with private and public methods using closures to encapsulate private state",
    category: "javascript",
    difficulty: "beginner",
    type: "structural",
    content: `<p>The Module pattern is one of the most commonly used design patterns in JavaScript. It provides a way to create private and public methods and variables, helping to shield particular parts from the global scope.</p>
    <p>This pattern uses closures to encapsulate private state, creating a 'module' with private and public parts. It's particularly useful in JavaScript where we don't have built-in support for private variables.</p>`,
    codeExample: `const ShoppingCart = (function() {
  // Private variables and methods
  let items = [];
  
  function calculateTotal() {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
  
  // Public API
  return {
    addItem: function(name, price, quantity = 1) {
      items.push({ name, price, quantity });
      console.log(\`\${name} added to cart\`);
    },
    
    removeItem: function(name) {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(\`\${name} removed from cart\`);
      }
    },
    
    getItemCount: function() {
      return items.length;
    },
    
    getTotal: function() {
      return calculateTotal();
    },
    
    listItems: function() {
      if (items.length === 0) {
        console.log('Your cart is empty');
        return;
      }
      
      console.log('Cart contents:');
      items.forEach(item => {
        console.log(\`\${item.name} - $\${item.price} x \${item.quantity}\`);
      });
      console.log(\`Total: $\${calculateTotal()}\`);
    }
  };
})();

// Usage
ShoppingCart.addItem('Laptop', 1200);
ShoppingCart.addItem('Headphones', 100, 2);
ShoppingCart.listItems();
console.log('Total items:', ShoppingCart.getItemCount());
ShoppingCart.removeItem('Headphones');
ShoppingCart.listItems();`,
    codeTemplate: `// Implement a Banking Module that manages a bank account
// It should include methods for deposit, withdraw, and checking balance
// Keep the balance private

const BankAccount = (function() {
  // Your implementation here
})();

// Test your implementation
BankAccount.deposit(100);
BankAccount.deposit(50);
console.log(BankAccount.getBalance()); // Should output 150
BankAccount.withdraw(30);
console.log(BankAccount.getBalance()); // Should output 120
BankAccount.withdraw(200); // Should show an error message about insufficient funds`,
    relatedPatterns: [
      {
        id: 1,
        name: "Singleton",
        description: "Ensures a class has only one instance and provides a global point of access to it"
      },
      {
        id: 4,
        name: "Revealing Module Pattern",
        description: "A variant of the Module pattern that aims to make the syntax cleaner"
      }
    ],
    realWorldExamples: [
      {
        title: "jQuery",
        description: "The jQuery library uses the Module pattern to provide a public API while keeping many utilities private."
      },
      {
        title: "State Management",
        description: "Many Redux-like state management solutions use module patterns to encapsulate state and provide controlled access."
      }
    ],
    benefits: [
      "Provides a clean way to encapsulate private functionality",
      "Reduces global namespace pollution",
      "Creates a clear separation between public and private methods",
      "Organizes code into self-contained modules"
    ],
    drawbacks: [
      "Private methods are not accessible for unit testing",
      "Fixing or extending private methods requires modifying the module itself",
      "Adding features later may lead to refactoring or breaking existing code",
      "Hard to extend or inherit from modular code"
    ],
    furtherReading: [
      {
        title: "JavaScript Module Pattern: In-Depth",
        description: "A comprehensive explanation of the Module pattern",
        url: "https://www.patterns.dev/posts/classic-design-patterns/#modulepatternjavascript"
      },
      {
        title: "Learning JavaScript Design Patterns",
        description: "A book by Addy Osmani covering the Module pattern and many others",
        url: "https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript"
      }
    ]
  },
  {
    name: "Observer Pattern",
    slug: "observer-pattern",
    description: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified",
    category: "javascript",
    difficulty: "intermediate",
    type: "behavioral",
    content: `<p>The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.</p>
    <p>This pattern is particularly useful for implementing distributed event handling systems, such as in MVC architectures, where the model notifies views when data changes.</p>`,
    codeExample: `class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(\`\${this.name} received update: \${data}\`);
  }
}

// Usage
const observable = new Observable();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');
const observer3 = new Observer('Observer 3');

observable.subscribe(observer1);
observable.subscribe(observer2);
observable.subscribe(observer3);

observable.notify('First notification!');

observable.unsubscribe(observer2);

observable.notify('Second notification!');`,
    codeTemplate: `// Implement a Weather Station using the Observer pattern
// The WeatherStation should notify all observers when the weather changes

// Your implementation here

// Test your implementation
const weatherStation = new WeatherStation();
const phoneDisplay = new PhoneDisplay();
const windowsDisplay = new WindowsDisplay();

weatherStation.addObserver(phoneDisplay);
weatherStation.addObserver(windowsDisplay);

weatherStation.setMeasurements(75, 65, 30.4);
weatherStation.setMeasurements(82, 70, 29.2);`,
    relatedPatterns: [
      {
        id: 6,
        name: "Publish-Subscribe",
        description: "A variation of the Observer pattern where publishers and subscribers don't know about each other"
      },
      {
        id: 7,
        name: "Mediator",
        description: "Defines an object that encapsulates how a set of objects interact"
      }
    ],
    realWorldExamples: [
      {
        title: "Event Listeners in DOM",
        description: "Adding event listeners to HTML elements follows the Observer pattern, where the element notifies all listeners when an event occurs."
      },
      {
        title: "React's State Management",
        description: "React components re-render when state changes, effectively implementing the Observer pattern for UI updates."
      }
    ],
    benefits: [
      "Follows the Open/Closed principle - you can add new observers without modifying the observable",
      "Establishes loose coupling between objects",
      "Allows sending data to multiple observers in one action",
      "Observers can be added or removed at runtime"
    ],
    drawbacks: [
      "If not implemented carefully, observers might be notified in an unpredictable order",
      "Memory leaks can occur if observers are not properly unsubscribed",
      "Complex update dependencies can lead to cascading updates",
      "Can decrease performance with many observers or frequent updates"
    ],
    furtherReading: [
      {
        title: "JavaScript Observer Pattern",
        description: "A detailed explanation of the Observer pattern",
        url: "https://www.patterns.dev/posts/observer-pattern"
      },
      {
        title: "Observer vs Pub-Sub",
        description: "Understanding the differences between Observer and Publish-Subscribe patterns",
        url: "https://medium.com/better-programming/observer-vs-pub-sub-pattern-50d3b27f838c"
      }
    ]
  },
  {
    name: "Middleware Pattern",
    slug: "middleware-pattern",
    description: "Provides a way to process requests through a chain of handlers or filters",
    category: "nodejs",
    difficulty: "intermediate",
    type: "behavioral",
    content: `<p>The Middleware pattern is widely used in Node.js applications, particularly in Express.js and similar frameworks. It allows you to process requests through a series of functions or "middleware".</p>
    <p>Each middleware can perform operations on the request and response objects, can end the request-response cycle, or can call the next middleware in the stack.</p>`,
    codeExample: `class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this; // For chaining
  }

  executeMiddleware(index, context, done) {
    // Exit if all middlewares have been executed
    if (index >= this.middlewares.length) {
      return done && done();
    }

    const current = this.middlewares[index];

    current(context, (err) => {
      // If there's an error, skip to the done callback
      if (err) {
        return done && done(err);
      }

      // Process the next middleware in the stack
      this.executeMiddleware(index + 1, context, done);
    });
  }

  run(context, done) {
    this.executeMiddleware(0, context, done);
  }
}

// Example usage
const manager = new MiddlewareManager();

// Middleware 1: Logging
manager.use((context, next) => {
  console.log(\`Processing request: \${context.request}\`);
  next();
});

// Middleware 2: Authentication
manager.use((context, next) => {
  if (context.user === 'admin') {
    console.log('Authentication successful');
    next();
  } else {
    next(new Error('Authentication failed'));
  }
});

// Middleware 3: Final handler
manager.use((context, next) => {
  console.log('Request processed successfully');
  context.result = 'Success';
  next();
});

// Execute the middleware chain
const context = { request: 'GET /api/data', user: 'admin' };
manager.run(context, (err) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Final result:', context.result);
  }
});`,
    codeTemplate: `// Implement an HTTP server with middleware support similar to Express.js
// Your implementation should allow adding middleware functions that can process requests

// Your implementation here

const app = new Application();

// Add middleware to log requests
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
  next();
});

// Add middleware to check authentication
app.use((req, res, next) => {
  if (req.headers.authorization === 'secret-token') {
    next();
  } else {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
});

// Add route handler
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});`,
    relatedPatterns: [
      {
        id: 8,
        name: "Chain of Responsibility",
        description: "Passes a request along a chain of handlers until one of them handles it"
      },
      {
        id: 9,
        name: "Decorator",
        description: "Dynamically adds responsibilities to objects"
      }
    ],
    realWorldExamples: [
      {
        title: "Express.js Middleware",
        description: "Express.js uses middleware functions to handle HTTP requests, perform operations, and control the request-response cycle."
      },
      {
        title: "Redux Middleware",
        description: "Redux uses middleware to provide extension points for handling actions, like logging, crash reporting, routing, etc."
      }
    ],
    benefits: [
      "Increases modularity and reusability of code",
      "Allows separating cross-cutting concerns from business logic",
      "Provides a flexible mechanism for adding functionality",
      "Makes it easy to build extensible applications"
    ],
    drawbacks: [
      "Can lead to performance issues if there are too many middleware functions",
      "Debugging can be challenging when errors occur in the middleware chain",
      "Order of middleware registration matters and can be a source of bugs",
      "Can overcomplicate simple applications"
    ],
    furtherReading: [
      {
        title: "Understanding Express.js Middleware",
        description: "A deep dive into middleware in Express.js applications",
        url: "https://expressjs.com/en/guide/using-middleware.html"
      },
      {
        title: "Building Custom Middleware in Node.js",
        description: "Tutorial on creating custom middleware functions for Node.js applications",
        url: "https://blog.logrocket.com/building-custom-middleware-in-node-js/"
      }
    ]
  },
  {
    name: "Component Pattern",
    slug: "component-pattern",
    description: "Breaks UI into reusable, composable pieces that can be combined to create complex interfaces",
    category: "react",
    difficulty: "intermediate",
    type: "structural",
    content: `<p>The Component pattern is a fundamental concept in React development. It encourages breaking your UI into small, reusable pieces that can be composed together to build complex interfaces.</p>
    <p>In React, components encapsulate their own logic, state, and UI. They can be function components or class components, and they can be composed together to create larger components.</p>`,
    codeExample: `// Button component
function Button({ text, onClick, type = 'primary', disabled = false }) {
  const buttonStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  return (
    <button
      className={\`px-4 py-2 rounded \${buttonStyles[type]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// Modal component that uses the Button component
function Modal({ title, content, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded p-6 z-10 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-6">{content}</div>
        <div className="flex justify-end space-x-2">
          <Button text="Cancel" type="secondary" onClick={onClose} />
          <Button text="Confirm" type="primary" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}

// Using the components
function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    alert('Action confirmed!');
    handleCloseModal();
  };
  
  return (
    <div className="p-6">
      <Button text="Open Modal" onClick={handleOpenModal} />
      
      <Modal
        title="Confirm Action"
        content="Are you sure you want to perform this action?"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}`,
    codeTemplate: `// Implement a Card component and a CardList component in React
// The Card component should display a title, content, and optional image
// The CardList component should render a list of Cards

// Your implementation here

// Example usage
function App() {
  const cards = [
    { id: 1, title: 'Card 1', content: 'This is the first card', image: 'https://picsum.photos/200/100' },
    { id: 2, title: 'Card 2', content: 'This is the second card' },
    { id: 3, title: 'Card 3', content: 'This is the third card', image: 'https://picsum.photos/200/100' }
  ];
  
  return (
    <div className="app">
      <h1>Card List Example</h1>
      <CardList cards={cards} />
    </div>
  );
}`,
    relatedPatterns: [
      {
        id: 10,
        name: "Composite Pattern",
        description: "Composes objects into tree structures to represent part-whole hierarchies"
      },
      {
        id: 11,
        name: "Render Props",
        description: "A technique for sharing code between React components using a prop whose value is a function"
      }
    ],
    realWorldExamples: [
      {
        title: "React UI Libraries",
        description: "Libraries like Material-UI and Chakra UI provide pre-built components that can be composed to create complex UIs."
      },
      {
        title: "Design Systems",
        description: "Companies like Airbnb and Shopify have built their own design systems with reusable components for consistent UIs across their products."
      }
    ],
    benefits: [
      "Promotes code reusability and DRY principles",
      "Makes the codebase more maintainable and easier to understand",
      "Enables composition of complex UIs from simple building blocks",
      "Facilitates testing as components can be tested in isolation"
    ],
    drawbacks: [
      "Can lead to 'component explosion' with too many small components",
      "Requires careful API design for components to be truly reusable",
      "May add complexity when managing state across multiple components",
      "Performance can suffer if components are not optimized properly"
    ],
    furtherReading: [
      {
        title: "Thinking in React",
        description: "Official React documentation on breaking UI into components",
        url: "https://reactjs.org/docs/thinking-in-react.html"
      },
      {
        title: "Composing Components",
        description: "Best practices for composing React components",
        url: "https://reactjs.org/docs/composition-vs-inheritance.html"
      }
    ]
  },
  {
    name: "Hooks Pattern",
    slug: "hooks-pattern",
    description: "Lets you use state and other React features without writing classes, enabling better code organization",
    category: "react",
    difficulty: "intermediate",
    type: "behavioral",
    content: `<p>The Hooks pattern is a modern approach to building React components introduced in React 16.8. Hooks allow you to use state and other React features without writing a class.</p>
    <p>Custom hooks enable you to extract component logic into reusable functions, making your code more modular and easier to test.</p>`,
    codeExample: `import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup function
    return () => abortController.abort();
  }, [url]); // Re-run effect when URL changes

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Function to update both state and local storage
  const setValue = (value) => {
    try {
      // Allow value to be a function to have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Component using both custom hooks
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`https://api.example.com/users/\${userId}\`);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className={\`user-profile \${theme}\`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Website: {user.website}</p>
    </div>
  );
}`,
    codeTemplate: `// Implement a custom useForm hook for handling form state and validation
// The hook should track input values, validation, submission, and form reset

// Your implementation here

// Example usage
function RegistrationForm() {
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: { username: '', email: '', password: '' },
    validate: (values) => {
      const errors = {};
      if (!values.username) errors.username = 'Username is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // In a real app, you would submit the form data to a server
      resetForm();
    }
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          value={values.username} 
          onChange={handleChange} 
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={values.email} 
          onChange={handleChange} 
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={values.password} 
          onChange={handleChange} 
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      
      <button type="submit">Register</button>
    </form>
  );
}`,
    relatedPatterns: [
      {
        id: 6,
        name: "Component Pattern",
        description: "Breaks UI into reusable, composable pieces that can be combined to create complex interfaces"
      },
      {
        id: 12,
        name: "Provider Pattern",
        description: "Uses React context to pass data through the component tree without prop drilling"
      }
    ],
    realWorldExamples: [
      {
        title: "React Query",
        description: "A popular library that uses hooks like useQuery and useMutation to manage asynchronous data fetching and state."
      },
      {
        title: "Redux Toolkit",
        description: "Modern Redux uses hooks like useSelector and useDispatch to interact with the global state store."
      }
    ],
    benefits: [
      "Enables reuse of stateful logic without changing component hierarchy",
      "Allows splitting complex components into smaller functions based on related logic",
      "Makes code more readable and maintainable with cleaner functional components",
      "Eliminates the confusion with 'this' keyword and lifecycle methods"
    ],
    drawbacks: [
      "Introduces a new mental model that requires learning React's rules of hooks",
      "Can lead to 'hook hell' with deeply nested hook calls",
      "Requires careful attention to the dependencies array in useEffect",
      "Makes it harder to use TypeScript with complex hook implementations"
    ],
    furtherReading: [
      {
        title: "Introducing Hooks",
        description: "Official React documentation explaining the hooks pattern",
        url: "https://reactjs.org/docs/hooks-intro.html"
      },
      {
        title: "Building Your Own Hooks",
        description: "Guide to extracting component logic into reusable custom hooks",
        url: "https://reactjs.org/docs/hooks-custom.html"
      }
    ]
  }
];