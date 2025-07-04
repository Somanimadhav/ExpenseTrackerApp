const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB Connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

const run = () => {
  cron.schedule("* * * * * *", () => {
    expenseEmail();
  });
};
run();

app.listen(process.env.PORT, () => {
  console.log(`Background services is running on port ${process.env.PORT}`);
});
