//imprt modules
const socketio=require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const eventEmitter=require("./../Events/allEvents");
const event=eventEmitter.emitter;
//my server where initialization of socket.io takes place and events driven functionality present
let setServer=(server)=>{
    let allOnlineUsers=[];
    let io = socketio.listen(server);
    
    let myIo = io.of('')
    myIo.on('connection',(socket)=>{
        console.log(`connection takes place--next to verify user`);
        //emiting event to verify user
       socket.emit('verifyUser',"");
       //listening setuser event for verifying user
       socket.on('setUser',(sendData)=>{
        console.log("set-user called");
        tokenLib.verifyClaimWithoutSecret(sendData.authToken,(err,user)=>{
            if(err){
                console.log('authentication error');
            }
            else{
                console.log("user is verified..setting details");
              
                let currentUser = user.data;
                
                // setting socket user id 
                // socket.friendsList=sendData.friendsList;
                // console.log('friendslist')
                // for(let i of socket.friendsList){
                //     console.log(i);
                // }
            
                socket.userId = currentUser.userId
                socket.room=currentUser.userId;
                socket.join(currentUser.userId);
                if(sendData.friendsList.length!=0){
                    for(let i of sendData.friendsList){
                        if(i!=currentUser.userId){
                            socket.join(i);
                        }
                    }

                }
                let fullName = `${currentUser.firstName} ${currentUser.lastName}`
               
                let userObj = {userId:currentUser.userId,fullName:fullName}
                allOnlineUsers.push(userObj)
               
                allOnlineUsers.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj['userId']).indexOf(obj['userId']) === pos;
                });
               
                console.log(allOnlineUsers);
                 // setting room name
                 socket.room = 'edList'
                 // joining chat-group room.
                 socket.join('edList')
                 myIo.emit('online-user-list',allOnlineUsers);

             
            }

        
        });

       });//end set user part


       socket.on('add-item',(itemObject)=>{
          
           itemObject.operationName="add";
           setTimeout(()=>{
            event.emit('history-save-item',itemObject);
            event.emit('save-item',itemObject);
            },2000);
           socket.to(itemObject.creatorId).broadcast.emit('added-items',itemObject);


       });

       socket.on('add-sub-item',(subItemObj)=>{
        
        subItemObj.subItemObj.operationName="add";
        setTimeout(()=>{
         event.emit('history-save-sub-item',subItemObj.subItemObj);
         event.emit('save-sub-item',subItemObj.subItemObj);
         },2000);
        socket.to(subItemObj.creatorId).broadcast.emit('added-sub-items',subItemObj);


    });
       //listening delete event
        socket.on('delete-item',(deleteData)=>{
             deleteData.operationName="delete";
             let itemId=deleteData.deletedItem.itemId;
             setTimeout(()=>{
                event.emit('history-delete-item',deleteData);
                event.emit('delete-item',itemId);
                },2000);
             socket.to(deleteData.creatorId).broadcast.emit('deleted-items',deleteData);
        });//end

        //listening delete sub-item event
        socket.on('delete-sub-item',(deleteSubItem)=>{
             deleteSubItem.deletedSubItem.operationName="delete";
             let subItemId=deleteSubItem.deletedSubItem.subItemId;
             console.log('subiitem')
             console.log(subItemId);

             setTimeout(()=>{
                event.emit('history-delete-sub-item',deleteSubItem.deletedSubItem);
                event.emit('delete-sub-item',subItemId);
                },2000);
             socket.to(deleteSubItem.creatorId).broadcast.emit('deleted-sub-items',deleteSubItem);
        });//end

        //listening update event
        socket.on('update-item',(updateData)=>{
            updateData.operationName="update";
            let itemId=updateData.beforeUpdateItem.itemId;
            setTimeout(()=>{
               event.emit('history-update-item',updateData);
               event.emit('update-item',itemId);
               },2000);
            socket.to(updateData.creatorId).broadcast.emit('updated-items',updateData);
       });//end

        //listening update subitem event
        socket.on('update-sub-item',(updateSubItem)=>{
            updateSubItem.operationName="update";
            let subItemId=updateSubItem.beforeUpdateItem.subItemId;
            console.log(`subitem id ${subItemId}`);
            setTimeout(()=>{
               event.emit('history-update-sub-item',updateSubItem);
               event.emit('update-sub-item',subItemId);
               },2000);
            socket.to(updateSubItem.creatorId).broadcast.emit('updated-sub-items',updateSubItem);
       });//end


       //listening edit event
       socket.on('edit-item',(editData)=>{
        editData.operationName="update";
        
        setTimeout(()=>{
           event.emit('history-edit-item',editData);
           event.emit('edit-item',editData);
           },2000);
        socket.to(editData.creatorId).broadcast.emit('edited-items',editData);
        });//end

        //listening edit subitem event
        socket.on('edit-sub-item',(editData)=>{
            editData.operationName="update";
            
            setTimeout(()=>{
            event.emit('history-edit-sub-item',editData);
            event.emit('edit-sub-item',editData);
            },2000);
            socket.to(editData.creatorId).broadcast.emit('edited-sub-items',editData);
        });//end

        //listening undo-item-add-opeartion
        socket.on('undo-item-add-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-item-database-maintain',undoData);
                event.emit('item-add-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-item-added-operation',sendUndoData);

        });//end

          //listening undo-subitem-add-opeartion
          socket.on('undo-subitem-add-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-subitem-database-maintain',undoData);
                event.emit('subitem-add-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-subitem-added-operation',sendUndoData);

        });//end

         //listening undo-item-delete-opeartion
         socket.on('undo-item-delete-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-item-database-maintain',undoData);
                event.emit('item-delete-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-item-deleted-operation',sendUndoData);

        });//end

         //listening undo-subitem-delete-opeartion
         socket.on('undo-subitem-delete-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-subitem-database-maintain',undoData);
                event.emit('subitem-delete-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-subitem-deleted-operation',sendUndoData);

        });//end

        //listening undo-item-update-opeartion
        socket.on('undo-item-update-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-item-database-maintain',undoData);
                event.emit('item-update-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-item-updated-operation',sendUndoData);

        });//end

          //listening undo-subitem-update-opeartion
          socket.on('undo-subitem-update-operation',(sendUndoData)=>{
            undoData=sendUndoData.undoData;
            setTimeout(()=>{
                event.emit('history-subitem-database-maintain',undoData);
                event.emit('subitem-update-database-maintain',undoData);
                },2000);

            socket.to(sendUndoData.creatorId).broadcast.emit('undo-subitem-updated-operation',sendUndoData);

        });//end

       socket.on('sendRequest',(reqSendData)=>{
           console.log(reqSendData)
           reqSendData.requestId=shortid.generate();
            setTimeout(()=>{
               event.emit('save-request',reqSendData);
            },2000);
             myIo.emit(reqSendData.reqRecId,reqSendData);
       });

       socket.on('RequestApproval',(reqApprovalData)=>{
       
        setTimeout(()=>{
           event.emit('update-request',reqApprovalData);
        },2000);
        
        myIo.emit(reqApprovalData.reqSendId,reqApprovalData);



       });

            // //disconnect socket
            // socket.on('disconnect', () => {
            //     // disconnect the user from socket
            //     // remove the user from online list
            //     // unsubscribe the user from his own channel
        
            //     console.log("user is disconnected");
            //     // console.log(socket.connectorName);
            //     console.log(socket.userId);
        
        
            //     var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            //     allOnlineUsers.splice(removeIndex,1)
            //     console.log(allOnlineUsers)
        
            //     myIo.emit('online-user-list',allOnlineUsers);
            //     socket.leave('EdList');
            //     socket.leave(socket.userId);
            //     socket.disconnect(0);
            // }) // end of on disconnect
        
            //disconnect socket
            socket.on('disconnection', (sendData) => {
                // disconnect the user from socket
                // remove the user from online list
                // unsubscribe the user from his own channel
        
                console.log("user is disconnected");
                // console.log(socket.connectorName);
                console.log(socket.userId);
               console.log(sendData)
        
                var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
                allOnlineUsers.splice(removeIndex,1)
                console.log(allOnlineUsers)
        
                myIo.emit('online-user-list',allOnlineUsers);
                socket.leave('edList')
                socket.leave(socket.userId);
               
                if(sendData.length!=0){
                    for(let i of sendData){
                        
                            socket.leave(i);
                       
                    }

                }
                socket.disconnect(0);
            }); // end of on disconnect

    });//end connection established part

}//end set Server

module.exports={
    setServer:setServer
  }