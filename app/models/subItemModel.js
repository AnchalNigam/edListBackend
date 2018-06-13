'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let subItemSchema = new Schema({
 subItemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  listId:{
    type: String,
    default: '',
    
  },
  itemId:{
    type: String,
    default: '',
    
  },
  subItemName: {
    type: String,
    default: ''
  },
 adder:{
    type: String,
    default: ''
 },
 adderId:{
    type: String,
    default: ''
 },
 status:{
    type: Number,
    default: 0
 },
  createdOn :{
    type:Date,
    default: new Date()
  },
  modifiedOn :{
    type:Date,
    default: new Date()
  }


})


mongoose.model('subItem', subItemSchema);