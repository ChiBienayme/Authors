// ----------------PostgreSQL--------------------//
// const express = require("express");

// const dotenv = require("dotenv");
// dotenv.config({
//   path: "./config.env",
// });
// const { Pool } = require("pg");

// const app = express();
// app.use(express.json());

// const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// // Routes
// // 1 /
// app.get("/authors", async (_req, res) => {
//   let authors;
//   try {
//     authors = await Postgres.query("SELECT * FROM authors");
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({
//       message: "An error happened",
//     });
//   }

//   res.json(authors.rows);
// });

// // 2 /authors/:id
// app.get("/authors/:id", async (req, res) => {
//   const author = await Postgres.query(
//     "SELECT * FROM authors WHERE authors.id=$1",
//     [req.params.id]
//   );

//   res.json(author.rows);
// });

// //3 /authors/:id/books/
// app.get("/authors/:id/books", (req, res) => {
//   const author = await Postgres.query(
//     "SELECT books FROM authors WHERE authors.id=$1",
//     [req.params.id]
//   );

//   res.json(author.rows);
// });



// // Handle errors
// app.get("*", (req, res) => {
//   res.send("Page not found - 404");
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });


// ---------------- MongoDB --------------------//

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Author = require("./models/authorModel");

app.use(express.json());

// connect to db
mongoose
	.connect(	
        "mongodb+srv://chibienayme:ayUkqlOk180@cluster0.pg9q2.mongodb.net/authors?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
    }
	)
	.then(() => console.log("Connected to MongoDB"));

// routes
app.get("/", (_req, res) => {
	res.send("Authors");
});

app.get("/authors", async (_req, res) => {
	const authors = await Author.find().select("-__v");

	res.json(authors);
});

app.get("/authors/:id", async (req, res) => {
	const author = await Author.findById(req.params.id);

	res.json(author);
});

app.get("/v2/authors/:books", async (req, res) => {
	const author = await Author.findOne({ email: req.params.books });

	res.json(author);
});

app.patch("/authors/:id", async (req, res) => {
	await Author.findByIdAndUpdate(req.params.id, {
		nationality: req.body.nationality,
	});

	res.json({
		message: "Nationality updated",
	});
});

app.post("/authors", async (req, res) => {
	await Author.create(req.body);

	res.status(201).json({
		message: "Author created",
	});
});

app.listen(8000, () => console.log("Listening"));