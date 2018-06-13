// calling the module 
var express = require('express');
const mongoose = require('mongoose');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const shortid = require('shortid');
/* Models */
const FriendsModel = mongoose.model('friend');
const ItemModel = mongoose.model('Item');
const subItemModel = mongoose.model('subItem');
const ItemHistoryModel = mongoose.model('ItemHistoryModel');
const subItemHistoryModel = mongoose.model('subItemHistoryModel');
// const ItemHistoryModel = mongoose.model('HistoryItemModel');
// const subItemHistoryModel = mongoose.model('subItemHistoryModel');

//creating an instance 
var app = express();

// we have to include events module - core nodejs 
var events = require('events');

// you have create an instance of event emitter
var eventEmitter = new events.EventEmitter();

//method to save friend request in our database
eventEmitter.on('save-request',reqSendData=>{
    console.log('save-request');
    let newFriendRequest=new FriendsModel({
        requestId:reqSendData.requestId,
        reqSendId:reqSendData.reqSendId,
        reqRecId:reqSendData.reqRecId,
        reqSendName:reqSendData.reqSendName,
        reqRecName:reqSendData.reqRecName

    })
    newFriendRequest.save((err,newRequest)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'save-request event: sendFriendRequest', 10)
           
        } else {
            logger.info('Request saved', 'save-request event: sendFriendRequest', 10)
            
        }

    })



});// end saving reequest

//method to update friend request database
eventEmitter.on('update-request',reqApprovalData=>{
    let findDetails={
        reqSendId: reqApprovalData.reqSendId,
        reqRecId: reqApprovalData.reqRecId
    }
    let updateQuery = {
       status:'Accepted'
      }

      FriendsModel.update(findDetails, updateQuery, {multi: true})
    .exec((err,res)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Socket Library :  update request', 10)
           
        } else if (check.isEmpty(res)) {
            logger.info('No chat Found', 'Socket Library : No friend request')
            
        }
        else{
            console.log(`Friend Request Updated`);
           
        }
    });


});

//method to save items list in our database
eventEmitter.on('save-item',itemObject=>{
    console.log('save-item');
    let newItem=new ItemModel({
         itemId:itemObject.itemId,
         listId:itemObject.listId,
         itemName:itemObject.itemName,
         adder:itemObject.adder,
         adderId:itemObject.adderId,
        

    });

    newItem.save((err,newItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'save-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'save-item event: item-save', 10)
            
        }

    })

});//end item save

//method to save items list in our history maintainence database
eventEmitter.on('history-save-item',itemObject=>{
    console.log('history-save-item');
    let newHistoryItem=new ItemHistoryModel({
         historyItemId:shortid.generate(),
         itemId:itemObject.itemId,
         listId:itemObject.listId,
         itemName:itemObject.itemName,
         adder:itemObject.adder,
         adderId:itemObject.adderId,
       
         operationName:itemObject.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-save-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-save-item event: item-save', 10)
            
        }

    })

});//end item save

//method to save items list in our database
eventEmitter.on('save-sub-item',subItemObject=>{
    console.log('save-sub-item');
    let newItem=new subItemModel({
         subItemId:subItemObject.subItemId,
         itemId:subItemObject.itemId,
         listId:subItemObject.listId,
         subItemName:subItemObject.subItemName,
         adder:subItemObject.adder,
         adderId:subItemObject.adderId,
         
    });

    newItem.save((err,newItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'save-sub-item event: sub-item-save', 10)
           
        } else {
            logger.info('Item saved', 'save-sub-item event:sub- item-save', 10)
            
        }

    })

});//end item save

//method to save subitems list in our history maintainence database
eventEmitter.on('history-save-sub-item',subItemObject=>{
    console.log('history-save-sub-item');
    let subItem=subItemObject;
    let newHistoryItem=new subItemHistoryModel({
         historySubItemId:shortid.generate(),
         subItemId:subItem.subItemId,
         itemId:subItem.itemId,
         listId:subItem.listId,
         subItemName:subItem.subItemName,
         adder:subItem.adder,
         adderId:subItem.adderId,
        
         operationName:subItemObject.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-save-sub-item event:sub- item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-save-sub-item event:sub- item-save', 10)
            
        }

    })

});//end item save

//method to add delete items list in our history maintainence database
eventEmitter.on('history-delete-item',deleteData=>{
    let itemObject=deleteData.deletedItem;
    console.log('history-delete-item');
    let newHistoryItem=new ItemHistoryModel({
        historyItemId:shortid.generate(),
         itemId:itemObject.itemId,
         listId:itemObject.listId,
         itemName:itemObject.itemName,
         adder:itemObject.adder,
         adderId:itemObject.adderId,
         
         status:itemObject.status,
         operationName:deleteData.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-delete-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-delete-item event: item-save', 10)
            
        }

    })

});//end item save

//method to delete items list in our  database
eventEmitter.on('delete-item',itemId=>{
    ItemModel.remove({ 'itemId': itemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'deleteItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'deleteItem event',10)
           
        } else {
           logger.info('Delete item','deleteItem event',10);
        }
    });// end user model find and remove




});//end

//method to add delete subitems list in our history maintainence database
eventEmitter.on('history-delete-sub-item',deleteSubItem=>{
     console.log(`subitemdelete ${deleteSubItem}`)
    console.log('history-delete-sub-item');
    let newHistoryItem=new subItemHistoryModel({
         historySubItemId:shortid.generate(),
         subItemId:deleteSubItem.subItemId,
         itemId:deleteSubItem.itemId,
         listId:deleteSubItem.listId,
         subItemName:deleteSubItem.subItemName,
         adder:deleteSubItem.adder,
         adderId:deleteSubItem.adderId,
         
         status:deleteSubItem.status,
         operationName:deleteSubItem.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-delete-sub-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-delete-sub-item event: item-save', 10)
            
        }

    })

});//end item save in subitem history database

//method to delete items list in our  database
eventEmitter.on('delete-sub-item',subItemId=>{
    console.log(`subitemdelete ${subItemId}`)
    subItemModel.remove({ 'subItemId': subItemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'deletesubItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'deletesubItem event',10)
           
        } else {
           logger.info('Delete item','deletesubItem event',10);
        }
    });// end subitem model

});//end

//method to update items list in our history maintainence database
eventEmitter.on('history-update-item',updateData=>{
    let itemObject=updateData.beforeUpdateItem;
    console.log('history-update-item');
    let newHistoryItem=new ItemHistoryModel({
         historyItemId:shortid.generate(),
         itemId:itemObject.itemId,
         listId:itemObject.listId,
         itemName:itemObject.itemName,
         adder:itemObject.adder,
         adderId:itemObject.adderId,
        
         status:0,
         operationName:updateData.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-update-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-update-item event: item-save', 10)
            
        }

    })

});//end update save

//method to update items list in our  database
eventEmitter.on('update-item',itemId=>{
    let updateQuery = {
        status:1,
        modifiedOn:new Date()
      }
    ItemModel.update({ 'itemId': itemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'updateItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'updateItem event',10)
           
        } else {
           logger.info('update item','updateItem event',10);
        }
    });// end user model 




});//end

//method to update subitems list in our history maintainence database
eventEmitter.on('history-update-sub-item',updateSubItem=>{
    let subItemObject=updateSubItem.beforeUpdateItem;
    console.log(subItemObject.subItemId);
    console.log('history-update-sub-item');
    let newHistoryItem=new subItemHistoryModel({
         historySubItemId:shortid.generate(),
         subItemId:subItemObject.subItemId,
         itemId:subItemObject.itemId,
         listId:subItemObject.listId,
         subItemName:subItemObject.subItemName,
         adder:subItemObject.adder,
         adderId:subItemObject.adderId,
        
         status:0,
         operationName:updateSubItem.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-update-sub-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-update-sub-item event: item-save', 10)
            
        }

    })

});//end update save

//method to update subitems list in our  database
eventEmitter.on('update-sub-item',subItemId=>{
    let updateQuery = {
        status:1,
        modifiedOn:new Date()
      }
    subItemModel.update({ 'subItemId': subItemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'updatesubItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No subItem Found', 'updatesubItem event',10)
           
        } else {
           logger.info('update subitem','updatesubItem event',10);
        }
    });// end user model 




});//end

//method to update items list in our history maintainence database
eventEmitter.on('history-edit-item',editData=>{
    let itemObject=editData.beforeEditItem;
    console.log('history-edit-item');
    let newHistoryItem=new ItemHistoryModel({
         historyItemId:shortid.generate(),
         itemId:itemObject.itemId,
         listId:itemObject.listId,
         itemName:itemObject.itemName,
         adder:itemObject.adder,
         adderId:itemObject.adderId,
         
         status:itemObject.status,
         operationName:editData.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-edit-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-edit-item event: item-save', 10)
            
        }

    })

});//end update save

//method to edit items list in our  database
eventEmitter.on('edit-item',editData=>{
    let itemId=editData.beforeEditItem.itemId;
    let itemName;
    for(let i of editData.itemList){
        if(i.itemId==itemId){
            itemName=i.itemName;

        }
    }//end

    let updateQuery = {
        itemName:itemName,
        modifiedOn:new Date()

      }
    ItemModel.update({ 'itemId': itemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'editItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'editItem event',10)
           
        } else {
           logger.info('update item','editItem event',10);
        }
    });// end item model 

});//end

//method to update items list in our history maintainence database
eventEmitter.on('history-edit-sub-item',editData=>{
    let subItemObject=editData.beforeEditItem;
    console.log('history-edit-sub-item');
    let newHistoryItem=new subItemHistoryModel({
         historySubItemId:shortid.generate(),
         subItemId:subItemObject.subItemId,
         itemId:subItemObject.itemId,
         listId:subItemObject.listId,
         subItemName:subItemObject.subItemName,
         adder:subItemObject.adder,
         adderId:subItemObject.adderId,
        
         status:subItemObject.status,
         operationName:editData.operationName

    });

    newHistoryItem.save((err,newHistoryItem)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'history-edit-sub-item event: item-save', 10)
           
        } else {
            logger.info('Item saved', 'history-edit-sub-item event: item-save', 10)
            
        }

    })

});//end update save

//method to edit items list in our  database
eventEmitter.on('edit-sub-item',editData=>{
    let subItemId=editData.beforeEditItem.subItemId;
    let subItemName;
    for(let i of editData.itemList){
       if(i.itemId==editData.beforeEditItem.itemId){
           for(let j of i.subItems){
               if(j.subItemId==subItemId){
                   subItemName=j.subItemName;
               }
           }
       }
    }//end

    let updateQuery = {
        subItemName:subItemName,
        modifiedOn:new Date()

      }
    subItemModel.update({ 'subItemId': subItemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'editsubItem event', 10)
           
        } else if (result.n == 0) {
            logger.info('No subItem Found', 'editsubItem event',10)
           
        } else {
           logger.info('update subitem','editsubItem event',10);
        }
    });// end user model 

});//end

//method to update items list in our history maintainence database
eventEmitter.on('history-item-database-maintain',undoData=>{
    let historyItemId=undoData.historyItemId;
    ItemHistoryModel.remove({ 'historyItemId': historyItemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'delete item history event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'delete item history event',10)
           
        } else {
           logger.info('Delete item','delete item history event',10);
        }
    });// end item history model
});

//method to remve item from our item database for undo 'add' operation
eventEmitter.on('item-add-database-maintain',undoData=>{
    let itemId=undoData.itemId;
    ItemModel.remove({ 'itemId': itemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'delete item from item model for undo add event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'delete item from item model for undo add event',10)
           
        } else {
           logger.info('Delete item','delete item from item model for undo add event',10);
        }
    });// end item history model
});

//method to remve item from our item database for undo 'delete' operation
eventEmitter.on('item-delete-database-maintain',undoData=>{
    let itemObject=undoData;
    let newItem=new ItemModel({
        itemId:itemObject.itemId,
        listId:itemObject.listId,
        itemName:itemObject.itemName,
        adder:itemObject.adder,
        adderId:itemObject.adderId,
        status:itemObject.status
       

   });

   newItem.save((err,newItem)=>{
       if (err) {
           console.log(err)
           logger.error(err.message, 'item-delete-database-maintain event: item-save', 10)
          
       } else {
           logger.info('Item saved', 'item-delete-database-maintain event: item-save', 10)
           
       }

   })


});

//method to update item from our item database for undo 'update' operation
eventEmitter.on('item-update-database-maintain',undoData=>{
    let itemId=undoData.itemId;
    let updateQuery = {
        itemName:undoData.itemName,
        status:undoData.status,
        modifiedOn:new Date()

      }
    ItemModel.update({ 'itemId': itemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'item-update-database-maintain', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'item-update-database-maintain',10)
           
        } else {
           logger.info('update item','item-update-database-maintain',10);
        }
    });// end item model 

});

//method to update subitems list in our history maintainence database
eventEmitter.on('history-subitem-database-maintain',undoData=>{
    let historySubItemId=undoData.historySubItemId;
    subItemHistoryModel.remove({ 'historySubItemId': historySubItemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'delete subitem history event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'delete subitem history event',10)
           
        } else {
           logger.info('Delete item','delete subitem history event',10);
        }
    });// end subitem history model
});

//method to remve item from our subitem database for undo 'add' operation in subitems case
eventEmitter.on('subitem-add-database-maintain',undoData=>{
    let subItemId=undoData.subItemId;
    subItemModel.remove({ 'subItemId': subItemId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'delete item from subitem model for undo add event', 10)
           
        } else if (result.n == 0) {
            logger.info('No Item Found', 'delete item from subitem model for undo add event',10)
           
        } else {
           logger.info('Delete item','delete item from subitem model for undo add event',10);
        }
    });// end 
});

//method to remve item from our subitem database for undo 'delete' operation
eventEmitter.on('subitem-delete-database-maintain',undoData=>{
    let subItemObject=undoData;
    let newItem=new subItemModel({
        subItemId:subItemObject.subItemId,
        itemId:subItemObject.itemId,
        listId:subItemObject.listId,
        subItemName:subItemObject.subItemName,
        adder:subItemObject.adder,
        adderId:subItemObject.adderId,
        
   });

   newItem.save((err,newItem)=>{
       if (err) {
           console.log(err)
           logger.error(err.message, 'subitem-delete-database-maintain event: sub-item-save', 10)
          
       } else {
           logger.info('Item saved', 'subitem-delete-database-maintain event:sub- item-save', 10)
           
       }

   });


});

//method to update item from our item database for undo 'update' operation
eventEmitter.on('subitem-update-database-maintain',undoData=>{
    let subItemId=undoData.subItemId;
    let updateQuery = {
        subItemName:undoData.subItemName,
        status:undoData.status,
        modifiedOn:new Date()

      }
    subItemModel.update({ 'subItemId': subItemId },updateQuery, {multi: true})
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'subitem-update-database-maintain', 10)
           
        } else if (result.n == 0) {
            logger.info('No subItem Found', 'subitem-update-database-maintain',10)
           
        } else {
           logger.info('update item','subitem-update-database-maintain',10);
        }
    });// end item model 

});

exports.emitter=eventEmitter;