const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');

/* Models */
const FriendsModel = mongoose.model('friend');

let getAllFriends=(req,res)=>{
    let validateParams=()=>{
       return new Promise((resolve,reject)=>{
          if(check.isEmpty(req.params.userId)){
              logger.error('Parameters Missing','getAllFriends:Validate Params()',5);
              let apiResponse=response.generateResponse(true, 'parameters missing.', 403, null);
              reject(apiResponse)
          }
          else{
              
              resolve()
          }
       });
    }//end validate params
    
    let findFriends=()=>{
       return new Promise((resolve,reject)=>{
         let findQuery={
             $or:[
                 {
                  reqSendId:req.params.userId,
                  status:'Accepted'
                 },
                 {
                    reqRecId:req.params.userId,
                    status:'Accepted'
                 }
                 
             ]
         }
         
     

       FriendsModel.find(findQuery)
       .select('-sendTime -_id -__v ')
       .exec((err, result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Friends Controller: getAllFriends', 10)
            let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No Friends Found', 'Friends Controller: getAllFriends',10)
            let apiResponse = response.generateResponse(true, 'No Friends Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('All Friends Found')


            resolve(result)
          }

       });
    });


    }//end find frriends

    validateParams()
    .then(findFriends)
    .then((result) => {
        let apiResponse = response.generateResponse(false, 'All Friends Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })

}//end


let sendFriendRequest=(req,res)=>{
    let validateParams=()=>{
        return new Promise((resolve,reject)=>{
           if(check.isEmpty(req.body.reqSendId) || check.isEmpty(req.body.reqRecId)
             || check.isEmpty(req.body.reqSendName) || check.isEmpty(req.body.reqRecName)){
               logger.error('Parameters Missing','sendFriendRequest:Validate Params()',5);
               let apiResponse=response.generateResponse(true, 'parameters missing.', 403, null);
               reject(apiResponse)
           }
           else{
               resolve()
           }
        });
     }//end validate params
    let saveFriendRequest=()=>{
        return new Promise((resolve,reject)=>{
            let newFriendRequest=new FriendsModel({
                requestId:shortid.generate(),
                reqSendId:req.body.reqSendId,
                reqRecId:req.body.reqRecId,
                reqSendName:req.body.reqSendName,
                reqRecName:req.body.reqRecName

            })
            newFriendRequest.save((err,newRequest)=>{
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'friendsController: sendFriendRequest', 10)
                    let apiResponse = response.generateResponse(true, 'Failed to create new request entry', 500, null)
                    reject(apiResponse)
                } else {
                   
                    resolve(newRequest)
                }

            })
            

        });
    }//end

    validateParams()
    .then(saveFriendRequest)
    .then((resolve)=>{
        let apiResponse = response.generateResponse(false, 'Request Sent Successful!', 200, resolve)
        res.send(apiResponse)

    })
    .catch((err) => {
        res.send(err)

    })

}//end

//method to get send requests
let getSendRequests=(req,res)=>{

    let validateParams=()=>{
        return new Promise((resolve,reject)=>{
           if(check.isEmpty(req.params.reqSendId)){
               logger.error('Parameters Missing','getSendRequests:Validate Params()',5);
               let apiResponse=response.generateResponse(true, 'parameters missing.', 403, null);
               reject(apiResponse)
           }
           else{
             
               resolve()
           }
        });
     }//end validate params
     
     let findRequests=()=>{
        return new Promise((resolve,reject)=>{
          let findQuery={ reqSendId:req.params.reqSendId}
          
      
 
        FriendsModel.find(findQuery)
        .select('-sendTime -_id -__v ')
        .exec((err, result) =>{
         if (err) {
             console.log(err)
             logger.error(err.message, 'Friends Controller: getSendRequests', 10)
             let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
             reject(apiResponse)
           } else if (check.isEmpty(result)) {
             logger.info('No Requests Found', 'Friends Controller: getSendRequests',10)
             let apiResponse = response.generateResponse(true, 'No Requests Found', 404, null)
             reject(apiResponse)
           } else {
            
 
             resolve(result)
           }
 
        });
     });
   }//end findrequests

   validateParams()
    .then(findRequests)
    .then((result) => {
        let apiResponse = response.generateResponse(false, 'All Requests Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })

}//end

let getRecRequests=(req,res)=>{
    let validateParams=()=>{
        return new Promise((resolve,reject)=>{
           if(check.isEmpty(req.params.reqRecId)){
               logger.error('Parameters Missing','getRecRequests:Validate Params()',5);
               let apiResponse=response.generateResponse(true, 'parameters missing.', 403, null);
               reject(apiResponse)
           }
           else{
             
               resolve()
           }
        });
     }//end validate params
     
     let findRequests=()=>{
        return new Promise((resolve,reject)=>{
          let findQuery={ reqRecId:req.params.reqRecId}
          
      
 
        FriendsModel.find(findQuery)
        .select('-sendTime -_id -__v ')
        .exec((err, result) =>{
         if (err) {
             console.log(err)
             logger.error(err.message, 'Friends Controller: getRecRequests', 10)
             let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
             reject(apiResponse)
           } else if (check.isEmpty(result)) {
             logger.info('No Requests Found', 'Friends Controller: getRecRequests',10)
             let apiResponse = response.generateResponse(true, 'No Requests Found', 404, null)
             reject(apiResponse)
           } else {
           
 
             resolve(result)
           }
 
        });
     });
   }//end findrequests

   validateParams()
    .then(findRequests)
    .then((result) => {
        let apiResponse = response.generateResponse(false, 'All Requests Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })
}//end

//Delete request
let deleteRequest = (req, res) => {
    if (check.isEmpty(req.params.requestId)) {

        console.log('Request Sender Id should be passed')
        let apiResponse = response.generateResponse(true, 'Request Sender Id is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        FriendsModel.remove({ 'requestId': req.params.requestId })
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Delete Controller: deleteUser', 10)
                    let apiResponse = response.generateResponse(true, 'Failed To delete request ', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 0) {
                    logger.info('No Request Found', 'Delete Controller: deleteRequest',10)
                    let apiResponse = response.generateResponse(true, 'No Request Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generateResponse(false, 'Deleted the request successfully', 200, null)
                    res.send(apiResponse)
                }
            });// end user model find and remove

    }
}//end delete function

let getAllRequests=(req,res)=>{
    
    let findRequests=()=>{
       return new Promise((resolve,reject)=>{
        

       FriendsModel.find()
       .select('-sendTime -_id -__v ')
       .exec((err, result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Friends Controller: getAllrequests', 10)
            let apiResponse = response.generateResponse(true, `error occurred: ${err.message}`, 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No Requests Found', 'Friends Controller: getAllresuetss',10)
            let apiResponse = response.generateResponse(true, 'No Requests Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('All Requests Found')


            resolve(result)
          }

       });
    });


    }//end find frriends

    
    findRequests()
    .then((result) => {
        let apiResponse = response.generateResponse(false, 'All Friends Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })

}//end
module.exports={
    getAllFriends:getAllFriends,
    sendFriendRequest:sendFriendRequest,
    deleteRequest:deleteRequest,
    getSendRequests:getSendRequests,
    getRecRequests:getRecRequests,
    getAllRequests:getAllRequests
}