const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route /api/contacts
//@access public
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

//@desc get specific contact
//@route /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      res.status(400);
      throw new Error ("Invalid data ! contact not found");
    }
    res.status(200).json(contact);
});

//@desc post contacts
//@route /api/contacts
//@access public
const postContacts = asyncHandler(async(req,res)=>{
    console.log("body request is :", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(404);
        throw new Error("all fields are mandatory !");
    }
    const contact = await Contact.create({
      name,email,phone
    });
    res.status(200).json(contact);
})

//@desc update contact
//@route /api/contacts/:id
//@access public
const updateContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      res.status(404);
      throw new Error ("contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
})

//@desc delete contact
//@route /api/contacts/:id
//@access public
const deleteContacts = asyncHandler(async (req, res) => {
    const id = req.params.id; 
    try {
      const contact = await Contact.findById(id); 
      if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
      } 
      await Contact.deleteOne({ _id: id }); 
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = {getContacts,getContact,postContacts,updateContacts,deleteContacts};