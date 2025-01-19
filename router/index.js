const express = require("express");
const router = express.Router();
const api = require("./api");

// localhost:5000
const baseurl = process.env.BASE_URL;
// localhost:5000/api/v1
router.use(baseurl, api);

router.use(baseurl, (req, res) => {
  res.status(404).send({ error: "No api found on this route" });
});

module.exports = router;
