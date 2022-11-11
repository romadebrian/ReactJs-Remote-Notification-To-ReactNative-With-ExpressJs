var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("API test Post Data");
});

router.post("/", (req, res) => {
  console.log("Got a POST request");

  // console.log("reqruitment: ", req);
  // console.log("result: ", res);

  // console.log("reqruitment: ", req.body);

  res.send("Got a POST request");
});

module.exports = router;
