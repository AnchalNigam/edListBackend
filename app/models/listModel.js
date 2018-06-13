'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let listSchema = new Schema({
  listId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  listName: {
    type: String,
    default: ''
  },
 creator:{
    type: String,
    default: ''
 },
 creatorId:{
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


mongoose.model('List', listSchema);