-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

CREATE TABLE authors(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	nationality VARCHAR(30),
	books VARCHAR(100)
);

INSERT INTO authors(name, nationality, books) VALUES
('Lawrence Nowell', 'UK', 'Beowulf'),
('William Shakespeare', 'US', '{{Hamlet}, {Othello}, {Romeo and Juliet}, {MacBeth}'),
('Charles Dickens', 'UK', '{{Oliver Twist}, {A Christmas Carol}}'),
('Oscar Wilde', 'UK', '{{The Picture of Dorian Gray}, {The Importance of Being Earnest}}')

SELECT * FROM authors;
