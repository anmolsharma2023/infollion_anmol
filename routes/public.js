const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Public Page: Accessible by everyone');
});

module.exports = router;
