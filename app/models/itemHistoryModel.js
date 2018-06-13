'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let itemHistorySchema = new Schema({
 historyItemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  itemId: {
    type: String,
    default: '',
    
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


mongoose.model('ItemHistoryModel', itemHistorySchema);