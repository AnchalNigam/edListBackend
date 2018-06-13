'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let itemSchema = new Schema({
 itemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  listId:{
    type: String,
    default: '',
    
  },
  itemName: {
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


mongoose.model('Item', itemSchema);