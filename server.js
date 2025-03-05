const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Movie = require("./model/movie");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

app.get("/movies", function (req, res) {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/movies", function (req, res) {
  const newMovie = new Movie(req.body);
  newMovie
    .save()
    .then((movie) => res.status(201).json(movie))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/movies/:id", function (req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMovie) => res.json(updatedMovie))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.delete("/movies/:id", function (req, res) {
  Movie.findByIdAndDelete(req.params.id)
    .then((deletedMovie) => res.json(deletedMovie))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
