/// IMPORT ///
import express from "express";
import nunjucks from "nunjucks";
import { MongoClient } from "mongodb";
import "dotenv/config";
/// IMPORTANT EXPRESS ///
const app = express();
app.use(express.static("Public"));

/// IMPORTANT NUNJUCKS ///
nunjucks.configure("views", { autoescape: true, express: app });
app.set("view engine", "njk");

/// IMPORTANT MONGODB ///
const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const client = new MongoClient(databaseUrl);

client.connect().then((client) => {
  const db = client.db();
  app.get("/", (request, response) => {
    db.collection("StarWarsV2")
      .find()
      .toArray()
      .then((data) => {
        response.render("home", { data });
      });
  });
  app.get("/Director", (request, response) => {
    db.collection("Director")
      .find()
      .toArray()
      .then((data) => {
        const arrayDirector = data.map((element) => element.DirectorMovies);

        response.render("Director", { data, arrayDirector });
      });
  });
  app.get("/Producer", (request, response) => {
    db.collection("Producer")
      .find()
      .toArray()
      .then((data) => {
        response.render("Producer", { data });
      });
  });
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
