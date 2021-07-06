const express = require('express');
const mongoose = require('mongoose');

//create schema
var Schema = mongoose.Schema;
var Schema = mongoose.Schema;
var AdminUserSchema = new Schema({

    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
    
})

module.exports = mongoose.model('Admin_User', AdminUserSchema);