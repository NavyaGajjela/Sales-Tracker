const Customer = require("../models/Customer");

const addCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: "$email",  
          name: { $first: "$name" },  
          contact: { $first: "$contact" },  
          count: { $sum: 1 }  
        }
      },
      {
        $project: {  
          _id: 0,  
          email: "$_id",
          name: 1, 
          contact: 1,
          count: 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const dealsList = async(req,res) =>{
  try{
    const customerList = await Customer.find()
    res.json(customerList);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
}

const weekdata=async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 

const statusdata=async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addCustomer,getCustomer,dealsList,weekdata,statusdata
};