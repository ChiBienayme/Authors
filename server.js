const express = require("express");
const app = express();

var authorsList = [
  {
    id: 1,
    name: "Lawrence Nowell",
    nationality: "UK",
    books: ["Beowulf"],
  },
  {
    id: 2,
    name: "William Shakespeare",
    nationality: "UK",
    books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"],
  },
  {
    id: 3,
    name: "Charles Dickens",
    nationality: "US",
    books: ["Oliver Twist", "A Christmas Carol"],
  },
  {
    id: 4,
    name: "Oscar Wilde",
    nationality: "UK",
    books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"],
  },
];

// 1 /
app.get("/", (req, res) => {
  res.send("Authors API !");
});

// 2 /authors/1/
app.get("/authors/1/", (req, res) => {
  res.send("Lawrence Nowell, UK");
});
app.get("/authors/2/", (req, res) => {
  res.send("William Shakespeare, UK");
});
app.get("/authors/3/", (req, res) => {
  res.send("Charles Dickens, US");
});
app.get("/authors/4/", (req, res) => {
  res.send("Oscar Wilde, UK");
});

//3 /authors/1/books/
app.get("/authors/1/books/", (req, res) => {
  res.send("Beowulf");
});

app.get("/authors/2/books/", (req, res) => {
  res.send("Hamlet, Othello, Romeo and Juliet, MacBeth");
});

app.get("/authors/3/books/", (req, res) => {
  res.send("Oliver Twist, A Christmas Carol");
});

app.get("/authors/4/books/", (req, res) => {
  res.send("Oliver Twist, A Christmas Carol");
});

// 4a /json/authors/:id
app.get("/json/authors/:authorId", (req, res) => {
  const authors = authorsList.find((author) => {
    return author.id.toString() === req.params.authorId;
  });

  if (!authors) {
    res.json({
      message: " This author is not exist",
    });
  }

  res.json(authors);
});

// 4b /json/authors/:id/books
app.get("/json/authors/:authorId/books", (req, res) => {
  const authors = authorsList[parseInt(req.params.authorId)] ;
  

  if (!authors) {
    res.json({
      message: " This book is not found",
    });
  }

  res.json({books : authors.books});
});


// 4b /json/authors/:id/books
// app.get("/json/authors/:authorId/books", (req, res) => {
//   const author = authorsList[req.params.authorId];

//   if (!author) {
//     res.json({
//       message: " This author is not exist",
//     });
//   }

//   const book = (({ books }) => ({ books }))(author);

//   res.json(book);
// });

// In the end of file
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
