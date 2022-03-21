const express = require("express");
const app = express();

const authors = [
	{
		name: "Lawrence Nowell",
		nationality: "UK",
		books: ["Beowulf"],
	},
	{
		name: "William Shakespeare",
		nationality: "UK",
		books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"],
	},
	{
		name: "Charles Dickens",
		nationality: "US",
		books: ["Oliver Twist", "A Christmas Carol"],
	},
	{
		name: "Oscar Wilde",
		nationality: "UK",
		books: [
			"The Picture of Dorian Gray",
			"The Importance of Being Earnest",
		],
	},
];

// Routes
// 1 /
app.get("/", (_req, res) => {
  res.send("Authors API !");
});

// 2 /authors/:id
app.get("/authors/:id", (req, res) => {
	// const author = authors.find((x, index) => {
	// 	const id = index + 1;
	// 	return req.params.id === id.toString();
	// });

	const author = authors[req.params.id - 1];

	res.send(`${author.name}, ${author.nationality}`);
});

//3 /authors/:id/books/
app.get("/authors/:id/books", (req, res) => {
	const books = authors[req.params.id - 1].books;
	res.send(books.join(", "));
});

// 4a /json/authors/:id
app.get("/json/authors/:id", (req, res) => {
	const author = authors[req.params.id];
	delete author.books;
	res.json(author);
});

// 4b /json/authors/:id/books
app.get("/json/authors/:id/books", (req, res) => {
	const books = authors[req.params.id].books;
	res.json({
		books,
	});
});

// Handle errors
app.get("*", (req, res) => {
	res.send("Page not found - 404");
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
