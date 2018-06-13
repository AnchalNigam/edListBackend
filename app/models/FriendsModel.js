'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let friendSchema = new Schema({
  requestId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  reqSendId:{
    type:String,
    default:''
  },
  reqSendName:{
    type:String,
    default:''
  },
  reqRecId:{
      type:String,
      default:''
  },
  reqRecName:{
    type:String,
    default:''
  },
  status:{
    type:String,
    default:'Pending'
  },
  sendTime :{
    type:Date,
    default: new Date()
  }


})


mongoose.model('friend', friendSchema);