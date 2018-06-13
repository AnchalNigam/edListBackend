const express = require('express');
const EdListConfig = require('../../config/EdlistConfig');
const listController = require("./../../app/controllers/listController");
const app = express();
const auth=require('../middlewares/Authorization');

module.exports.setRouter = (app) => {

    let baseUrl = `${EdListConfig.apiVersion}/lists`;

    app.post(`${baseUrl}/create`,auth.isAuthorized,listController.createList);
    /**
     * @apiGroup List
     * @apiVersion  1.0.0
     * @api {post} /api/v1/lists/create api to create todolist.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} listName  ToDoList Name. (body params) (required)
     * @apiParam {string} creator   List creator Name. (body params) (required)
    * @apiParam {string}  creatorId  List creator Id. (body params) (required)
   
   
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
      {
    "error": false,
    "message": "Create TO-Do-List",
    "status": 200,
    "data": [
        {
            "listId": "BJLzcvulm",
            "listName": "My first list",
            "reqRecId": "BJNXF-VxX",
            "creator": "Sunita Nigam",
            "creatorId": "BJLzcvuoi"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": "Failed to create new list",
    "status": 404,
    "data": null
}
    */

    app.get(`${baseUrl}/view/all`,auth.isAuthorized, listController.getAllFriendToDoLists);  //this is for gettiing todololists of friends
    /**
     * @apiGroup List
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/view/all api for getting all friends lists including user.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} friendsList Array of friend's id. (query params) (required)
    
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
    {
    "error": false,
    "message": "All Lists Found",
    "status": 200,
    "data": [
        {
            "listId": "Hy2GWeQlm",
            "listName": "My First List",
            "creator": "Anchal Nigam",
            "creatorId": "HyxhPfbxX"
        },
        {
            "listId": "rJ9fcMQlX",
            "listName": "Second",
            "creator": "Sakshi Nigam",
            "creatorId": "rJif_zZxQ"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": parameters missing.",
    "status": 403,
    "data": null
}
    */

    app.get(`${baseUrl}/get/all/items`,auth.isAuthorized, listController.getAllListItems);
     /**
     * @apiGroup List
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/get/all/items api for getting all items of list with its subitems.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string}  listId  Id of list.(query params) (required)
    * @apiParam {string}  skip  pagination,how many items at one time.(query params) (required)
    
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
   {
    "error": false,
    "message": "All Items Found with SubItems",
    "status": 200,
    "data": []
        {
            "itemId": "ryvYS2qe7",
            "listId": "Hy2GWeQlm",
            "itemName": "short id check",
            "adder": "Anchal Nigam",
            "adderId": "HyxhPfbxX",
            "status": 0,
            "createdOn": "2018-06-10T14:25:42.316Z",
            "modifiedOn": "2018-06-11T17:41:27.206Z",
            "subItems": [
                {
                    "subItemId": "Bk3f9_oxQ",
                    "listId": "Hy2GWeQlm",
                    "itemId": "ryvYS2qe7",
                    "subItemName": "short id subitem",
                    "adder": "Anchal Nigam",
                    "adderId": "HyxhPfbxX",
                    "status": 0,
                    "createdOn": "2018-06-11T18:08:23.390Z",
                    "modifiedOn": "2018-06-11T18:08:23.390Z"
                }
            ]
        }
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": parameters missing.",
    "status": 403,
    "data": null
}
    */



    app.get(`${baseUrl}/get/undoList`,auth.isAuthorized, listController.getLastItem);
    /**
     * @apiGroup List
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/get/undoList api for getting last item of list present in history database for undo purpose.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} listId  List id for which last item is needed. (query params) (required)
   
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
  {
    "error": false,
    "message": "Last item of list Found",
    "status": 200,
    "data": {
        "_id": "2018-06-12T05:17:22.000Z",
        "historyItemId": "BJcvwR3eX",
        "itemId": "HyzweHheQ",
        "listId": "rJ9fcMQlX",
        "itemName": "add 1",
        "adder": "Anchal Nigam",
        "adderId": "HyxhPfbxX",
        "status": 0,
        "operationName": "update",
        "createdOn": "2018-06-12T05:16:13.160Z",
        "modifiedOn": "2018-06-12T05:16:13.160Z"
    }
}
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": parameters missing.",
    "status": 403,
    "data": null
}
    */

   //this is for cheking purpose
    app.get(`${baseUrl}/get/all/subItems`,auth.isAuthorized, listController.getAllSubItems);
  
    app.post(`${baseUrl}/:itemId/delete`,auth.isAuthorized, listController.deleteItem);
    app.post(`${baseUrl}/:subItemId/delete/subItem`,auth.isAuthorized, listController.deleteSubItem);
  
    app.post(`${baseUrl}/:itemId/deletehistory`,auth.isAuthorized, listController.deleteHistoryItem);
 
    
    app.get(`${baseUrl}/get/all/history/items`,auth.isAuthorized, listController.getAllListsHistory);
    app.get(`${baseUrl}/get/all/history/subItems`,auth.isAuthorized, listController.getAllSubItemsHistory);
 //end

}