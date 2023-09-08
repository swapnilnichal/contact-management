//@desc get all contacts
//@route /api/contacts
//@access public
const getContacts = (req,res)=>{
    res.status(200).json({message: "get me contacts"});
}

//@desc get specific contact
//@route /api/contacts/:id
//@access public
const getContact = (req,res)=>{
    res.status(200).json({message: `get me contact of ${req.params.id}`});
}

//@desc post contacts
//@route /api/contacts
//@access public
const postContacts = (req,res)=>{
    res.status(200).json({message: "post contacts right away"});
}

//@desc update contact
//@route /api/contacts/:id
//@access public
const updateContacts = (req,res)=>{
    res.status(200).json({message: `update this contact of user ${req.params.id}`});
}

//@desc delete contact
//@route /api/contacts/:id
//@access public
const deleteContacts = (req,res)=>{
    res.status(200).json({message: `delete contact of ${req.params.id}`});
}

module.exports = {getContacts,getContact,postContacts,updateContacts,deleteContacts};