const express = require('express');
const EdListConfig = require('../../config/EdlistConfig');
const friendsController = require("./../../app/controllers/friendsController");
const app = express();
const auth=require('../middlewares/Authorization');

module.exports.setRouter = (app) => {

    let baseUrl = `${EdListConfig.apiVersion}/friends`;

    app.get(`${baseUrl}/:userId/view/all`,auth.isAuthorized, friendsController.getAllFriends);
     /**
     * @apiGroup Friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/:userId/view/all api for getting all friends of a user.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} userId  Id of user. (url params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "All Friends Found",
    "status": 200,
    "data": [
        {
            "requestId": "By7rcW4xQ",
            "reqSendId": "BJNXF-VxX",
            "reqSendName": "Sunita Nigam",
            "reqRecId": "rJif_zZxQ",
            "reqRecName": "Sakshi Nigam",
            "status": "Accepted"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "No Friends Found",
    "status": 404,
    "data": null
}
    */

    app.get(`${baseUrl}/:reqSendId/view/all/sendRequests`,auth.isAuthorized, friendsController.getSendRequests);

     /**
     * @apiGroup Friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/:reqSendId/view/all/sendRequests api for getting requests send by user.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} reqSendId  Id of requests sender. (url params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
      {
    "error": false,
    "message": "All Requests Found",
    "status": 200,
    "data": [
        {
            "requestId": "BJLzcvulm",
            "reqSendId": "HyxhPfbxX",
            "reqSendName": "Anchal Nigam",
            "reqRecId": "BJNXF-VxX",
            "reqRecName": "Sunita Nigam",
            "status": "Accepted"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "No Requests Found",
    "status": 404,
    "data": null
}
    */



    app.get(`${baseUrl}/:reqRecId/view/all/RecRequests`,auth.isAuthorized, friendsController.getRecRequests);
    /**
     * @apiGroup Friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/:reqRecId/view/all/RecRequests api for getting requests received by user.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} reqRecId  Id of requests receiver. (url params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
      {
    "error": false,
    "message": "All Requests Found",
    "status": 200,
    "data": [
        {
            "requestId": "BJLzcvulm",
            "reqSendId": "HyxhPfbxX",
            "reqSendName": "Anchal Nigam",
            "reqRecId": "BJNXF-VxX",
            "reqRecName": "Sunita Nigam",
            "status": "Accepted"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "No Requests Found",
    "status": 404,
    "data": null
}
    */


    app.post(`${baseUrl}/sendFriendRequest`,auth.isAuthorized,friendsController.sendFriendRequest);
    /**
     * @apiGroup Friends
     * @apiVersion  1.0.0
     * @api {post} /api/v1/friends/sendFriendRequest api for sending friend request.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} reqSendId  Request sender Id. (body params) (required)
     * @apiParam {string} reqRecId  Request receiver Id. (body params) (required)
    * @apiParam {string} reqSendName Request sender Name. (body params) (required)
    * @apiParam {string} reqRecName  Request receiver Name. (body params) (required)
   
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
      {
    "error": false,
    "message": "Request Sent Successful!",
    "status": 200,
    "data": [
        {
            "requestId": "BJLzcvulm",
            "reqSendId": "HyxhPfbxX",
            "reqSendName": "Anchal Nigam",
            "reqRecId": "BJNXF-VxX",
            "reqRecName": "Sunita Nigam",
            "status": "Pending"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": "Failed to create new request entry",
    "status": 404,
    "data": null
}
    */
   app.get(`${baseUrl}/view/all/requests`, auth.isAuthorized,friendsController.getAllRequests);
   /**
     * @apiGroup Friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/view/all/requests api for getting all requests.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
    
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
     {
    "error": false,
    "message": "All Requests Found",
    "status": 200,
    "data": [
        {
            "requestId": "BJLzcvulm",
            "reqSendId": "HyxhPfbxX",
            "reqSendName": "Anchal Nigam",
            "reqRecId": "BJNXF-VxX",
            "reqRecName": "Sunita Nigam",
            "status": "Accepted"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
   
{
    "error": true,
    "message": "No Request Found",
    "status": 404,
    "data": null
}
    */

    //this is for cheking purpose
    app.post(`${baseUrl}/:requestId/delete`, friendsController.deleteRequest);
  
}