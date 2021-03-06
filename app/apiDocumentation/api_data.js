define({ "api": [
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/:reqRecId/view/all/RecRequests",
    "title": "api for getting requests received by user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqRecId",
            "description": "<p>Id of requests receiver. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "      {\n    \"error\": false,\n    \"message\": \"All Requests Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"requestId\": \"BJLzcvulm\",\n            \"reqSendId\": \"HyxhPfbxX\",\n            \"reqSendName\": \"Anchal Nigam\",\n            \"reqRecId\": \"BJNXF-VxX\",\n            \"reqRecName\": \"Sunita Nigam\",\n            \"status\": \"Accepted\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No Requests Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsReqrecidViewAllRecrequests"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/:reqSendId/view/all/sendRequests",
    "title": "api for getting requests send by user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqSendId",
            "description": "<p>Id of requests sender. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "      {\n    \"error\": false,\n    \"message\": \"All Requests Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"requestId\": \"BJLzcvulm\",\n            \"reqSendId\": \"HyxhPfbxX\",\n            \"reqSendName\": \"Anchal Nigam\",\n            \"reqRecId\": \"BJNXF-VxX\",\n            \"reqRecName\": \"Sunita Nigam\",\n            \"status\": \"Accepted\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No Requests Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsReqsendidViewAllSendrequests"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/:userId/view/all",
    "title": "api for getting all friends of a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of user. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"All Friends Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"requestId\": \"By7rcW4xQ\",\n            \"reqSendId\": \"BJNXF-VxX\",\n            \"reqSendName\": \"Sunita Nigam\",\n            \"reqRecId\": \"rJif_zZxQ\",\n            \"reqRecName\": \"Sakshi Nigam\",\n            \"status\": \"Accepted\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No Friends Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsUseridViewAll"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/view/all/requests",
    "title": "api for getting all requests.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n    \"error\": false,\n    \"message\": \"All Requests Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"requestId\": \"BJLzcvulm\",\n            \"reqSendId\": \"HyxhPfbxX\",\n            \"reqSendName\": \"Anchal Nigam\",\n            \"reqRecId\": \"BJNXF-VxX\",\n            \"reqRecName\": \"Sunita Nigam\",\n            \"status\": \"Accepted\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": \"No Request Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsViewAllRequests"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/friends/sendFriendRequest",
    "title": "api for sending friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqSendId",
            "description": "<p>Request sender Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqRecId",
            "description": "<p>Request receiver Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqSendName",
            "description": "<p>Request sender Name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reqRecName",
            "description": "<p>Request receiver Name. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "      {\n    \"error\": false,\n    \"message\": \"Request Sent Successful!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"requestId\": \"BJLzcvulm\",\n            \"reqSendId\": \"HyxhPfbxX\",\n            \"reqSendName\": \"Anchal Nigam\",\n            \"reqRecId\": \"BJNXF-VxX\",\n            \"reqRecName\": \"Sunita Nigam\",\n            \"status\": \"Pending\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": \"Failed to create new request entry\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "PostApiV1FriendsSendfriendrequest"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/get/all/items",
    "title": "api for getting all items of list with its subitems.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of list.(query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>pagination,how many items at one time.(query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All Items Found with SubItems\",\n \"status\": 200,\n \"data\": []\n     {\n         \"itemId\": \"ryvYS2qe7\",\n         \"listId\": \"Hy2GWeQlm\",\n         \"itemName\": \"short id check\",\n         \"adder\": \"Anchal Nigam\",\n         \"adderId\": \"HyxhPfbxX\",\n         \"status\": 0,\n         \"createdOn\": \"2018-06-10T14:25:42.316Z\",\n         \"modifiedOn\": \"2018-06-11T17:41:27.206Z\",\n         \"subItems\": [\n             {\n                 \"subItemId\": \"Bk3f9_oxQ\",\n                 \"listId\": \"Hy2GWeQlm\",\n                 \"itemId\": \"ryvYS2qe7\",\n                 \"subItemName\": \"short id subitem\",\n                 \"adder\": \"Anchal Nigam\",\n                 \"adderId\": \"HyxhPfbxX\",\n                 \"status\": 0,\n                 \"createdOn\": \"2018-06-11T18:08:23.390Z\",\n                 \"modifiedOn\": \"2018-06-11T18:08:23.390Z\"\n             }\n         ]\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": parameters missing.\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/edList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsGetAllItems"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/get/undoList",
    "title": "api for getting last item of list present in history database for undo purpose.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>List id for which last item is needed. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Last item of list Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"2018-06-12T05:17:22.000Z\",\n        \"historyItemId\": \"BJcvwR3eX\",\n        \"itemId\": \"HyzweHheQ\",\n        \"listId\": \"rJ9fcMQlX\",\n        \"itemName\": \"add 1\",\n        \"adder\": \"Anchal Nigam\",\n        \"adderId\": \"HyxhPfbxX\",\n        \"status\": 0,\n        \"operationName\": \"update\",\n        \"createdOn\": \"2018-06-12T05:16:13.160Z\",\n        \"modifiedOn\": \"2018-06-12T05:16:13.160Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": parameters missing.\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/edList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsGetUndolist"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/view/all",
    "title": "api for getting all friends lists including user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendsList",
            "description": "<p>Array of friend's id. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n    \"error\": false,\n    \"message\": \"All Lists Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"Hy2GWeQlm\",\n            \"listName\": \"My First List\",\n            \"creator\": \"Anchal Nigam\",\n            \"creatorId\": \"HyxhPfbxX\"\n        },\n        {\n            \"listId\": \"rJ9fcMQlX\",\n            \"listName\": \"Second\",\n            \"creator\": \"Sakshi Nigam\",\n            \"creatorId\": \"rJif_zZxQ\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": parameters missing.\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/edList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsViewAll"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/create",
    "title": "api to create todolist.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>ToDoList Name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creator",
            "description": "<p>List creator Name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>List creator Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "      {\n    \"error\": false,\n    \"message\": \"Create TO-Do-List\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"BJLzcvulm\",\n            \"listName\": \"My first list\",\n            \"reqRecId\": \"BJNXF-VxX\",\n            \"creator\": \"Sunita Nigam\",\n            \"creatorId\": \"BJLzcvuoi\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n   \n{\n    \"error\": true,\n    \"message\": \"Failed to create new list\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/edList.js",
    "groupTitle": "List",
    "name": "PostApiV1ListsCreate"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api for getting all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"HyxhPfbxX\",\n            \"firstName\": \"Anchal\",\n            \"lastName\": \"Nigam\",\n            \"email\": \"anchalnigamm@gmail.com\",\n            \"mobileNumber\": \" 91-9026224948\",\n            \"country\": \"IN\"\n        },\n       \n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No User Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api for sending mail for password change.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Mail Sent Successful!\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Server Error!Sent Mail Failed.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd2lkIjoiSHlyVk9vVEpRIiwiaWF0IjoxNTI3Nzg1NTE2NzY2LCJleHAiOjE1Mjc4NzE5MTYsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6ImVkd2lzb3JQcm9qZWN0IiwiZGF0YSI6eyJ1c2VySWQiOiJyMWZOdTg2eW0iLCJmaXJzdE5hbWUiOiJBbmNoYWwiLCJsYXN0TmFtZSI6Ik5pZ2FtIiwiZW1haWwiOiJhbmNoYWxuaWdhbW1AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiIDkxLTkwMjYyMjQ5NDgiLCJjb3VudHJ5IjoiSU4ifX0.ieG6fhHifSS4f2j5Li46lzjNlAsyFpoZow2GYeYyVKc\",\n        \"userDetails\": {\n            \"userId\": \"r1fNu86ym\",\n            \"firstName\": \"Anchal\",\n            \"lastName\": \"Nigam\",\n            \"email\": \"anchalnigamm@gmail.com\",\n            \"mobileNumber\": \" 91-9026224948\",\n            \"country\": \"IN\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"User has not Verified!\",\n    \"status\": 400,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Wrong Password!Login Failed\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth Token of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Already Logged Out or Invalid UserId\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Error Occured!\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for Signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>Country Code of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"User created and Mail sent Successful!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"ByePDU6k7\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": \"+91-9026224948\",\n        \"country\": \"India\",\n        \"hash\": \"o64ifdmrta9fba8q0ykhcp5sxwoogl3y5\",\n        \"active\": false,\n        \"createdOn\": null,\n        \"_id\": \"5b0fd758e762fc09d4c61e02\",\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/resetPassword",
    "title": "api for resetting password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user which is provided at email link by encrypting using btoa. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"Password changed successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"r1fNu86ym\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"password\": \"$2a$10$Zs/9yOheKp..6LIZbEOi8ePxmVfdoxhGvPxFwcovFW5KhTJ2IT.Lq\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": \" 91-9026224948\",\n        \"country\": \"IN\",\n        \"hash\": \"jrw74tgx28ex1wat5vq4wjr57ehe8w1qh\",\n        \"active\": true,\n        \"createdOn\": null,\n        \"_id\": \"5b0fd82ae762fc09d4c61e03\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"One or more parameter is missing\",\n    \"status\": 403,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Error Occured!\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/verifyEmail",
    "title": "api for verifying Email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hash",
            "description": "<p>hash which is provided in email link. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"User Verified Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \n        \"userId\": \"rkWlVp1RM\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": 9026224948,\n        \"hash\": \"8ug67ar1zoyrndloe73ztai17xa4jafi\",\n        \"active\": true,      \n        \"createdOn\": \"2018-05-09T00:42:17.000Z\",\n        \"_id\": \"5af243e929485a1718f18c53\",\n        \"__v\": 0\n    \n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Hash is missing\",\n    \"status\": 403,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"User Not found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersVerifyemail"
  }
] });
