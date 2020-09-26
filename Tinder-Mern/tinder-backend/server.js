//imports
import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

//app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = `mongodb+srv://admin:cGSHJMKSeErvPZKA@cluster0.snbu7.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//middlewares
app.use(express.json());
app.use(Cors());

//Db config
mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  console.log("DB connected")
);

//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  console.log(dbCard);
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listen
app.listen(port, () => {
  console.log(`listening to localhost: ${port}`);
});
