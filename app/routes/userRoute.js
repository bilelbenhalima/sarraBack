const express = require("express");
const router = express.Router();
const userCtrl = require('../controller/userController')
const formulaireCtrl= require('../controller/formulaireController')
const auth = require('../middleware/auth');
var passport = require("passport");



router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/AddFomulaire', formulaireCtrl.AddFomulaire);
router.get('/getFomulaireByID/:id', formulaireCtrl.getFomulaireByID);
router.post('/SubmitReponces', formulaireCtrl.SubmitReponces);



module.exports = router;
