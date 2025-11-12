const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// In-memory database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

// ✅ 1️⃣ POST - Create new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});

// ✅ 2️⃣ PATCH - Partial update
app.patch("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: "User updated (PATCH)", user });
});

// ✅ 3️⃣ PUT - Full replace
app.put("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Both name and email are required" });
  }

  users[index] = { id: parseInt(req.params.id), name, email };
  res.json({ message: "User replaced (PUT)", user: users[index] });
});

// ✅ 4️⃣ DELETE - Remove user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json({ message: "User deleted successfully", deletedUser });
});

// ✅ 5️⃣ GET - Return all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 CRUD API is running on port " + PORT);
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
