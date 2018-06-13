'use strict'
/**
 * Module Dependencies
 */
const time = require('./../libs/timeLib');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let HistoryItemSchema = new Schema({
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
    type:String,
    default: time.getLocalTime()
  },
  modifiedOn :{
    type:String,
    default: time.getLocalTime()
  }


})


mongoose.model('HistoryItemModel', HistoryItemSchema);