const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');

/* Models */
const ListModel = mongoose.model('List');
const ItemModel = mongoose.model('Item');
const ItemHistoryModel = mongoose.model('ItemHistoryModel');
// const ItemHistoryModel = mongoose.model('HistoryItemModel');
const subItemHistoryModel = mongoose.model('subItemHistoryModel');
const subItemModel = mongoose.model('subItem');

let createList = (req, res) => {
    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.creatorId) || check.isEmpty(req.body.creator)
                || check.isEmpty(req.body.listName)) {
                logger.error('Parameters Missing', 'createList:Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {
                resolve()
            }
        });
    }//end validate params
    let saveList = () => {
        return new Promise((resolve, reject) => {
            let newList = new ListModel({
                listId: shortid.generate(),
                listName: req.body.listName,
                creator: req.body.creator,
                creatorId: req.body.creatorId


            })
            newList.save((err, newList) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'ListsController: create list', 10)
                    let apiResponse = response.generateResponse(true, 'Failed to create new list', 500, null)
                    reject(apiResponse)
                } else {

                    resolve(newList)
                }

            })


        });
    }//end

    validateParams()
        .then(saveList)
        .then((resolve) => {
            let apiResponse = response.generateResponse(false, 'Create TO-Do-List', 200, resolve)
            res.send(apiResponse)

        })
        .catch((err) => {
            res.send(err)

        })


}//end

let getAllFriendToDoLists = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.query.friendsList)) {
                logger.error('Parameters Missing', 'getAllFriendToDoLists:Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {
                let friendsArr = req.query.friendsList.split(',');

                resolve(friendsArr)
            }
        });
    }//end validate params
    let findLists = (friendsArr) => {

        return new Promise((resolve, reject) => {

            console.log(friendsArr)
            console.log('yes')
            ListModel.find({
                creatorId: {
                    $in: friendsArr

                }
            })
                .select('-createdOn -modifiedOn -_id -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: getAllFriendToDoLists', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else {

                        console.log(result);
                        resolve(result)



                    }

                });



        });
    }

    validateParams()
        .then(findLists)
        .then((result) => {
            let apiResponse = response.generateResponse(false, 'All Lists Found', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            res.send(error)
        })
}//end

let getAllListItems = (req, res) => {
    let newItems = [];
    let validateParams = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.query.listId) || check.isEmpty(req.query.skip)) {
                logger.error('Parameters Missing', 'getAllListItems:Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {

                resolve();
            }
        });
    }//end validate params

    let findItems = () => {

        return new Promise((resolve, reject) => {
            ItemModel.find({ listId: req.query.listId })
                .lean()
                .limit(4)
                .sort([['_id', -1]])
                .skip(parseInt(req.query.skip) || 0)
                .select(' -_id -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getAllListItems', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Items Found', 'list Controller: getAllListItems', 10)
                        let apiResponse = response.generateResponse(true, 'No Items Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('All Items Found')

                        resolve(result)
                    }

                });
        });


    }//end

    let findSubItems = (itemsList) => {

        return new Promise((resolve, reject) => {
            let itemArr = [];
            for (let i of itemsList) {
                itemArr.push(i.itemId);
            }
            subItemModel.find({
                itemId: { $in: itemArr }
            })
                .sort([['_id', -1]])
                .lean()
                .select(' -_id -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getAllListItems', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)

                    }
                    else {
                        for (let i of result) {
                            for (let j of itemsList) {
                                if (j.itemId == i.itemId) {
                                    if (!j.hasOwnProperty('subItems')) {
                                        j.subItems = [];

                                        j.subItems.push(i);
                                        break;
                                    }
                                    else {
                                        j.subItems.push(i);
                                    }

                                }
                            }
                        }
                        
                        resolve(itemsList)
                    }

                });


        });

    }//end

    validateParams()
        .then(findItems)
        .then(findSubItems)
        .then((result) => {
            let apiResponse = response.generateResponse(false, 'All Items Found with SubItems', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            res.send(error)
        })
}//end

//method for getting items for undo function
let getLastItem=(req,res)=>{

    let validateParams = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.query.listId)) {
                logger.error('Parameters Missing', 'getAllLastItem:Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {

                resolve();
            }
        });
    }//end validate params


    let findHistoryItem=()=>{
        return new Promise((resolve, reject) => {
            ItemHistoryModel.findOne({'listId':req.query.listId})
                .lean()
                .sort([['_id', -1]])
                .select(' -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getLastItem', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Items History Found', 'list Controller:getLastItem', 10)
                        let apiResponse = response.generateResponse(true, 'No Items History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('All Items History Found')


                        resolve(result)
                    }

                });
        });
      
    }//end

    let findHistorySubItem=(historyItem)=>{
        return new Promise((resolve, reject) => {
            subItemHistoryModel.findOne({'listId':req.query.listId})
               
                .sort([['_id', -1]])
                .select('-__v ')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getLastItem', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse);
                    
                    }
                     else {
                       
                        if(check.isEmpty(result)){
                            resolve(historyItem);
                        }
                        else{
                            let lastItem=[];
                        
                            lastItem.push(historyItem,result);
                            for(i of lastItem){
                                i['_id']=i['_id'].getTimestamp();
                            }
                            //this part is to check what is last actiivity either items related or subitems related
                            lastItem.sort((a,b)=>{
                               
                                  var A=new Date(a['_id']).getTime();
                                 
                                  var B=new Date(b['_id']).getTime();
                                
                                  return B-A;
                                })
                               
                            resolve(lastItem[0])
    
                        }
                        
                       
                    }

                });
        });



    }//end
    
    validateParams()
    .then(findHistoryItem)
    .then(findHistorySubItem)
   
    .then((result) => {
        let apiResponse = response.generateResponse(false, 'Last item of list Found', 200, result)
        res.send(apiResponse)
    })
    .catch((error) => {
        res.send(error)
    })

}//end

//this is for checking purpose
let getAllSubItems = (req, res) => {

    let findItems = () => {

        return new Promise((resolve, reject) => {
            subItemModel.find()
                .sort([['_id', -1]])
                .select(' -_id -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getAllSubItems', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No SubItems Found', 'list Controller: getAllSubItems', 10)
                        let apiResponse = response.generateResponse(true, 'No SubItems Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('All SubItems Found')


                        resolve(result)
                    }

                });
        });


    }//end


    findItems()
        .then((result) => {
            let apiResponse = response.generateResponse(false, 'All subItems Found', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            res.send(error)
        })
}//end

//method to delete item from item model
let deleteItem = (req, res) => {
    if (check.isEmpty(req.params.itemId)) {

        console.log('ItemId should be passed')
        let apiResponse = response.generateResponse(true, 'ItemId is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        ItemModel.remove({ 'itemId': req.params.itemId })
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller: deleteItem', 10)
                    let apiResponse = response.generateResponse(true, 'Failed To delete user', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 0) {
                    logger.info('No Item Found', 'List Controller: deleteItem', 10)
                    let apiResponse = response.generateResponse(true, 'No Item Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generateResponse(false, 'Deleted the Item successfully', 200, null)
                    res.send(apiResponse)
                }
            });// end user model find and remove

    }
}//end

//method to delete subitem from subitem model
let deleteSubItem = (req, res) => {
    if (check.isEmpty(req.params.subItemId)) {

        console.log('subItemId should be passed')
        let apiResponse = response.generateResponse(true, 'subItemId is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        subItemModel.remove({ 'subItemId': req.params.subItemId })
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller: deletesubItem', 10)
                    let apiResponse = response.generateResponse(true, 'Failed To delete user', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 0) {
                    logger.info('No subItem Found', 'List Controller: deletesubItem', 10)
                    let apiResponse = response.generateResponse(true, 'No subItem Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generateResponse(false, 'Deleted the subItem successfully', 200, null)
                    res.send(apiResponse)
                }
            });// end user model find and remove

    }
}//end

//method to delete history item
let deleteHistoryItem = (req, res) => {
    if (check.isEmpty(req.params.itemId)) {

        console.log('ItemId should be passed')
        let apiResponse = response.generateResponse(true, 'ItemId is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        ItemHistoryModel.remove({ 'itemId': req.params.itemId })
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller: deleteItem', 10)
                    let apiResponse = response.generateResponse(true, 'Failed To delete user', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 0) {
                    logger.info('No Item Found', 'List Controller: deleteItem', 10)
                    let apiResponse = response.generateResponse(true, 'No Item Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generateResponse(false, 'Deleted the Item successfully', 200, null)
                    res.send(apiResponse)
                }
            });// end user model find and remove

    }
}//end




let getAllListsHistory = (req, res) => {


    let findItems = () => {

        return new Promise((resolve, reject) => {
            ItemHistoryModel.find()
                
                .sort([['_id', -1]])
                .select(' -__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getAllListsHistory', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Items History Found', 'list Controller:getAllListsHistory', 10)
                        let apiResponse = response.generateResponse(true, 'No Items History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('All Items Found')


                        resolve(result)
                    }

                });
        });


    }//end


    findItems()
        .then((result) => {
            let apiResponse = response.generateResponse(false, 'All Items History Found', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            res.send(error)
        })

}//end

let getAllSubItemsHistory = (req, res) => {


    let findItems = () => {

        return new Promise((resolve, reject) => {
            subItemHistoryModel.find()
                .limit(2)
                .sort([['_id', -1]])
                .select('-__v ')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'list Controller: getAllsubitemsHistory', 10)
                        let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No subItems History Found', 'list Controller:getAllsubitemsHistor', 10)
                        let apiResponse = response.generateResponse(true, 'No subItems History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('All subItems Found')
                        for(let i of result){
                            console.log(i['_id'].getTimestamp());
                        }
                        

                        resolve(result)
                    }

                });
        });


    }//end


    findItems()
        .then((result) => {
            let apiResponse = response.generateResponse(false, 'All subItems History Found', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            res.send(error)
        })

}//end

module.exports = {
    createList: createList,
    getAllFriendToDoLists: getAllFriendToDoLists,
    getAllListItems: getAllListItems,
    deleteItem: deleteItem,
  
    deleteHistoryItem: deleteHistoryItem,
    getAllListsHistory: getAllListsHistory,
    getAllSubItemsHistory: getAllSubItemsHistory,
    getAllSubItems: getAllSubItems,
    deleteSubItem:deleteSubItem,
    getLastItem:getLastItem

}