'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let subItemHistorySchema = new Schema({
  historySubItemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
 subItemId: {
    type: String,
    default: '',
    
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
 operationName:{
    type: String,
    default: ''
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


mongoose.model('subItemHistoryModel', subItemHistorySchema);