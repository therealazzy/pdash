# Building REST APIs with Express.js 🚀
*A Beginner's Guide to Creating Your First API*

---

## Table of Contents
1. [What is a REST API?](#1-what-is-a-rest-api)
2. [Project Structure](#2-project-structure)
3. [Setting Up an Express Server](#3-setting-up-an-express-server)
4. [Creating Routes](#4-creating-routes)
5. [Controllers](#5-controllers---where-the-magic-happens)
6. [Understanding Request & Response](#6-understanding-request--response)
7. [Step-by-Step Guide](#7-step-by-step-guide-to-create-your-own-api)
8. [Testing Your API](#8-testing-your-api)
9. [Best Practices](#9-best-practices)
10. [Common Status Codes](#10-common-status-codes)
11. [Practical Exercise](#practical-exercise)

---

## 1. What is a REST API? 🤔

Think of a REST API like a restaurant:
- 👨‍🍳 Waiters (API) take requests (orders)
- 🏃 Process them in the kitchen (server)
- 🍽️ Return responses (food)
- 📝 Use standard methods (like a menu's structure)

### Main HTTP Methods:
| Method | Purpose | Restaurant Analogy |
|--------|---------|-------------------|
| GET | Retrieve data | Reading the menu |
| POST | Create new data | Placing an order |
| PUT | Update existing data | Modifying your order |
| DELETE | Remove data | Canceling an order |

---

## 2. Project Structure 📁

```
project/
├── server.js           # Main application file
├── routes/            # Route definitions
│   └── noteRoutes.js   # Note-related routes
├── controllers/       # Business logic
│   └── notesController.js # Note operations
└── data/             # Data storage
    └── notes.json     # Where notes are stored
```

---

## 3. Setting Up an Express Server 🛠️

\`\`\`javascript
// server.js
import express from "express";
import cors from "cors";
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());                // Allows other websites to access your API
app.use(express.json());        // Lets your server understand JSON

// Start server
app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
\`\`\`

---

## 4. Creating Routes 🛣️

Routes are like a receptionist directing visitors to different departments:

\`\`\`javascript
// routes/noteRoutes.js
import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

export const noteRouter = express.Router();

// Define routes
noteRouter.get('/', getNotes);          // Get all notes
noteRouter.post('/', createNote);       // Create a new note
noteRouter.put('/:id', updateNote);     // Update a note
noteRouter.delete('/:id', deleteNote);  // Delete a note
\`\`\`

---

## 5. Controllers - Where the Magic Happens ✨

\`\`\`javascript
// controllers/notesController.js
export const createNote = (req, res) => {
    // 1. Get data from request
    const { title, content } = req.body;

    // 2. Validate data
    if(!title || !content){
        return res.status(400).json({ error: 'Title and content are required' });
    }

    // 3. Process data
    const newNote = { 
        id: Date.now(), 
        title, 
        content, 
        createdAt: new Date().toISOString() 
    };

    // 4. Save data
    notes.push(newNote);
    writeNotes(notes);

    // 5. Send response
    res.status(201).json(newNote);
}
\`\`\`

---

## 6. Understanding Request & Response 🔄

### Request (req) Properties:
| Property | Description | Example |
|----------|-------------|---------|
| req.body | Data sent in request body | \`{ title: "Note" }\` |
| req.params | URL parameters | \`/notes/:id\` |
| req.query | Query string parameters | \`?sort=desc\` |

### Response (res) Methods:
| Method | Purpose | Example |
|--------|---------|---------|
| res.json() | Send JSON data | \`res.json({ success: true })\` |
| res.status() | Set HTTP status | \`res.status(201)\` |
| res.send() | Send general data | \`res.send("OK")\` |

---

## 7. Step-by-Step Guide to Create Your Own API 📝

### Step 1: Setup
\`\`\`bash
# Create project directory
mkdir my-api
cd my-api

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors
\`\`\`

### Step 2: Create Basic Server
\`\`\`javascript
// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

### Step 3: Add Routes
\`\`\`javascript
// routes/myRoutes.js
import express from 'express';
export const myRouter = express.Router();

myRouter.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});
\`\`\`

### Step 4: Add Controller Logic
\`\`\`javascript
// controllers/myController.js
export const getData = (req, res) => {
    // Your logic here
    res.json({ data: "Some data" });
}
\`\`\`

---

## 8. Testing Your API 🧪

### Testing Methods:
1. **Postman** 
   - Import collection file
   - Create requests
   - Save for later use

2. **cURL Commands**
\`\`\`bash
# GET request
curl http://localhost:3001/notes

# POST request
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Content"}' \
  http://localhost:3001/notes
\`\`\`

3. **Browser** (GET requests only)
   - Simply visit the URL
   - Use browser dev tools

---

## 9. Best Practices 📌

1. **Organization**
   - Separate routes and controllers
   - Use meaningful file names
   - Group related functionality

2. **Validation**
   - Always validate input data
   - Check required fields
   - Validate data types

3. **Error Handling**
   - Use appropriate status codes
   - Provide meaningful error messages
   - Handle edge cases

4. **Middleware**
   - Use for common operations
   - Authentication/Authorization
   - Logging

5. **Response Format**
   - Be consistent
   - Include status indicators
   - Provide meaningful messages

---

## 10. Common Status Codes 📊

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal issues |

---

## Practical Exercise 💪

### Create a Todo List API

1. **Setup Project**
   - Create directory structure
   - Initialize Node.js project
   - Install dependencies

2. **Create Endpoints**
   - GET /todos (list all)
   - POST /todos (create)
   - PUT /todos/:id (update)
   - DELETE /todos/:id (remove)

3. **Implementation Steps**
   - [ ] Setup basic Express server
   - [ ] Create routes file
   - [ ] Implement controllers
   - [ ] Add data validation
   - [ ] Test all endpoints

4. **Testing**
   - Use Postman or cURL
   - Test each endpoint
   - Verify error handling

---

### 📚 Remember:
- Start simple
- Test as you build
- Add error handling
- Keep code organized
- Comment your code

---

*Happy coding! 🎉* 