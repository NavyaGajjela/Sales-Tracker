const express = require("express");
const router = express.Router();
const {addCustomer, getCustomer,dealsList,weekdata,statusdata} = require("../controllers/customerController");

router.post("/", addCustomer);
router.get("/",getCustomer);
router.get("/deals", dealsList);
router.get("/week-data",weekdata)
router.get("/status-data",statusdata)
module.exports = router;


