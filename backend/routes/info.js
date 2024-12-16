const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    title: "About Us",
  });
});

module.exports = router;
