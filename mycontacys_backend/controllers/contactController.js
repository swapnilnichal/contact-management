const asyncHandler = require('express-async-handler')
//@desc get all contacts
//@route /api/contacts
//@access public
const getContacts = asyncHandler(async(req,res)=>{
    res.status(200).json({message: "get me contacts"});
})

//@desc get specific contact
//@route /api/contacts/:id
//@access public
const getContact =asyncHandler(async(req,res)=>{
    res.status(200).json({message: `get me contact of ${req.params.id}`});
})

//@desc post contacts
//@route /api/contacts
//@access public
const postContacts = asyncHandler(async(req,res)=>{
    console.log("body request is :", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory !");
    }
    res.status(200).json({message: "post contacts right away"});
})

//@desc update contact
//@route /api/contacts/:id
//@access public
const updateContacts = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `update this contact of user ${req.params.id}`});
})

//@desc delete contact
//@route /api/contacts/:id
//@access public
const deleteContacts = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `delete contact of ${req.params.id}`});
})

module.exports = {getContacts,getContact,postContacts,updateContacts,deleteContacts};