const express = require('express')
const router = express.Router()

// ====home/index route======
router.get("/", (req, res) => {
  res.send("hello world this is my first rest api");
});


module.exports = router