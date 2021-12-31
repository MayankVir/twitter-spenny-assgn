const app = require("express")();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(require("express").json());

const mongourl = process.env.MONGO_URI;

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`Error in connecting to database ${err}`);
  });

const register_route = require("./routes/register");
const login_route = require("./routes/login");
const tweet_route = require("./routes/tweet");
const verify_route = require("./routes/verify");
const user_route = require("./routes/user");
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // app.get("/", (req, res) => {
  //   res.send("API is running..");
  // });
}

app.use("/api/register", register_route);
app.use("/api/login", login_route);
app.use("/api/tweet", tweet_route);
app.use("/api/verify", verify_route);
app.use("/api/user", user_route);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running at 5000");
});
