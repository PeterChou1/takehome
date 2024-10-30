const express = require("express");
const cors = require("cors");
const path = require('path');
const { body, validationResult } = require("express-validator");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// In-memory data storage
let issues = [];
let nextId = 1;

// Helper function to find an issue by ID
const findIssueById = (id) => issues.find(issue => issue.id === id);

// Create a new issue
app.post("/issues",
  [
    body("title").isString().notEmpty().withMessage("Title is required and must be a string."),
    body("description").optional().isString().withMessage("Description must be a string if provided."),
    body("status")
      .isString()
      .isIn(["Open", "In Progress", "Resolved"])
      .withMessage("Status must be one of: 'Open', 'In Progress', 'Resolved'."),
    body("priority")
    .isString()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Status must be one of: 'Low', 'Medium', 'High'."),
  ],
  (req, res) => {
  const errors = validationResult(req);
  const { title, description, status, priority } = req.body;
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const newIssue = {
    id: nextId++,
    title,
    description,
    status,
    priority,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  issues.push(newIssue);
  res.status(201).json(newIssue);
});

// List all issues
app.get("/issues", (req, res) => {
  res.json(issues);
});

// Get issue details by ID
app.get("/issues/:id",
  (req, res) => {
  const id = parseInt(req.params.id);
  const issue = findIssueById(id);

  if (!issue) {
    return res.status(404).json({ message: "Issue not found" });
  }

  res.json(issue);
});

// Update issue status by ID
app.put(
  "/issues/:id",
  [
    // Optional validation rules
    body("title").optional().isString().withMessage("Title must be a string if provided."),
    body("description").optional().isString().withMessage("Description must be a string if provided."),
    body("status")
      .optional()
      .isIn(["Open", "In Progress", "Resolved"])
      .withMessage("Status must be one of: 'Open', 'In Progress', 'Resolved'."),
    body("priority")
      .optional()
      .isString()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Status must be one of: 'Low', 'Medium', 'High'."),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Parse and find the issue by ID
    const id = parseInt(req.params.id);
    const issue = findIssueById(id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Update only provided fields
    const { title, description, status, priority } = req.body;
    if (title !== undefined) issue.title = title;
    if (description !== undefined) issue.description = description;
    if (status !== undefined) issue.status = status;
    if (priority !== undefined) issue.priority = priority;

    // Update the updatedDate field
    issue.updatedDate = new Date();

    // Respond with the updated issue
    res.json(issue);
  }
);

// Delete an issue by ID
app.delete("/issues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex(issue => issue.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Issue not found" });
  }

  const deletedIssue = issues.splice(index, 1);
  res.json(deletedIssue[0]);
});


// The catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

