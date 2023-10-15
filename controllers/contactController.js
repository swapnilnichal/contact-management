const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route /api/contacts
//@access private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id : req.user.id}); 
    res.status(200).json(contacts);
})

//@desc get specific contact
//@route /api/contacts/:id
//@access private
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
//@access private
const postContacts = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ error: "All fields are mandatory!" });
      return;
    }
    const duplicate = await Contact.find({phone: req.body.phone}) ;
    if(duplicate.length>0){
      M.toast({ html: "Contact with this phone number already exists", classes: "#f44336 red" });
      res.status(403).json({ message: "Contact with this phone number already exists" });
      return;
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(201).json(contact); 
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc get contacts
//@route /api/contacts/search
//@access private
const searchContacts = asyncHandler(async (req, res) => {
  const query = req.query.query; 
  try {
    const matchingContacts = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive name match
        { email: { $regex: query, $options: 'i' } }, // Case-insensitive email match
        { phone: { $regex: query, $options: 'i' } }, // Case-insensitive phone match
      ],
    });
    if (matchingContacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    res.status(200).json(matchingContacts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(err);
  }
});


//@desc update contact
//@route /api/contacts/:id
//@access private
const updateContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      res.status(404);
      throw new Error ("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id ){
      res.status(403);
      throw new Error ("Unauthorized User can't update a contact");
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
//@access private
const deleteContacts = asyncHandler(async (req, res) => {
    const id = req.params.id; 
    try {
      const contact = await Contact.findById(id); 
      if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
      } 
      if (contact.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error ("Unauthorized User is can't delete a contact");
      }
       await Contact.deleteOne({ _id: id }); 
       res.status(200).json({message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = {getContacts,getContact,postContacts,updateContacts,deleteContacts,searchContacts};