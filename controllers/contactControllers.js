const asyncHandler = require('express-async-handler')
const Contacts = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res)=>{
    const contactslist = await Contacts.find({user_id:req.user.id});
    // console.log(contactslist);
    res.status(200).json(contactslist);
});

//@desc create new contact
//@route POST /api/contacts/
//@access private
const createContact = asyncHandler(async (req,res)=>{
    console.log("The request body : "+req.body);
    const {name,email,phone} = req.body;
    if(!name||!email||!phone){
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }

    const contact = await Contacts.create({
        name,email,phone,
        user_id: req.user.id,
    });

    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//@desc Update a  contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res)=>{

    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(req.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Dont Have Permission to update Other's Contacts")
    }

    const UpdatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    )

    res.status(200).json(UpdatedContact);
});

//@desc delete a  contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res)=>{

    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(req.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Dont Have Permission to delete Other's Contacts")
    }

    await Contacts.deleteOne({_id: req.params.id});

    res.status(200).json(contact);
});



module.exports = {
    getContacts,
    deleteContact,
    createContact,
    getContact,
    updateContact};