const express = require("express");

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Routes
// 1 /
app.get("/authors", async (_req, res) => {
  let authors;
  try {
    authors = await Postgres.query("SELECT * FROM authors");
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error happened",
    });
  }

  res.json(authors.rows);
});

// 2 /authors/:id
app.get("/authors/:id", async (req, res) => {
  const author = await Postgres.query(
    "SELECT * FROM authors WHERE authors.id=$1",
    [req.params.id]
  );

  res.json(author.rows);
});

//3 /authors/:id/books/
app.get("/authors/:id/books", (req, res) => {
  const author = await Postgres.query(
    "SELECT books FROM authors WHERE authors.id=$1",
    [req.params.id]
  );

  res.json(author.rows);
});



// Handle errors
app.get("*", (req, res) => {
  res.send("Page not found - 404");
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
