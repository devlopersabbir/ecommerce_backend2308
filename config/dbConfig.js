const { default: mongoose } = require("mongoose");

async function DbConnect() {
  console.log("connecting");
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = DbConnect;
