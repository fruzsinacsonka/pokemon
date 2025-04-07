const express = require("express");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:5175", credentials: true }));
app.use(cookieParser());

const db = require("./models");

//Routers
const userRouter = require("./routes/Users");
app.use("/users", userRouter);
const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);
const pokemonsRouter = require("./routes/Pokemons");
app.use("/pokemons", pokemonsRouter);
const abilityRouter = require("./routes/Ability");
app.use("/ability", abilityRouter);
const helditemRouter = require("./routes/HeldItems");
app.use("/helditem", helditemRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on 3001");
  });
});
