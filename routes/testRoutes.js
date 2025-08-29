const express = require('express');
const { textingController } = require('../controllers/textController');


// router object 
const router = express.Router();

// Routes
router.get('/', textingController)

// export 
module.exports = router