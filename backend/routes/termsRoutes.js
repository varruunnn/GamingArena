const express = require("express");
const router = express.Router();

let acceptedTerms = false;
router.post("/accept", (req, res) => {
  const { accepted } = req.body;
  if (accepted) {
    acceptedTerms = true;
    res.status(200).send({ message: "Terms accepted." });
  } else {
    res.status(400).send({ message: "Failed to accept terms." });
  }
});

router.get("/status", (req, res) => {
  res.status(200).send({ accepted: acceptedTerms });
});

module.exports = router;
