'use strict';
const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const Controller = require('../controllers');
const MiddleWare = require('../middelwares');
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4,               // limit each IP to 4 requests per windowMs
    delayMs: 0,          // disable delaying - full speed until the max limit is reached
    message: "Too many Requests from this IP, please try again after some time"
});


/**
 * @api {post} http://localhost:3000/api/admin/user Create Admin User (this Endpoint is for creating test user)
 * @apiName Create Admin User
 * @apiGroup Users
 *
 * @apiParam {String} name          Name of the Admin user to be created.
 * @apiParam {String} username      Username of the user to be created. 
 * @apiParam {String} password      Password for user.
 *
 * 
 * @apiSuccess {String} Name of the user.
 * @apiSuccess {String} Username of the user.
 * @apiSuccess {String} Role  role of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": {
 *           "code": 200,
 *           "message": "Success"
 *          },
 *           "response": {
 *               "name": "Aijaz Ahmad Mir",
 *               "username": "aijaz",
 *               "role": "admin"
 *          }
 *      }
 *
 * 
 */

router.post('/admin/user', Controller.createUser);



/**
 * @api {get} http://localhost:3000/api/admin/token Get All Tokens
 * @apiName Get All Tokens  
 * @apiGroup Tokens
 * @apiHeader (Basic Authorization) {String} Authorization Authorization value.
 *
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": {
 *           "code": 200,
 *           "message": "Success"
 *          },
 *           "response": [
 *                    {
 *                       "_id": "5b2cce0b6314b41a5c751059",
 *                        "token": "lUdjbc0fX",
 *                        "active": true,
 *                        "expiry": "2018-06-29T10:23:07.000Z"
 *                    },
 *                    {
 *                        "_id": "5b2cce0b6314b41a5c75105a",
 *                        "token": "uk8ZTcCN",
 *                        "active": false,
 *                        "expiry": "2018-06-29T10:23:07.000Z"
 *                    }
 *            ]
 *      }
 *  @apiErrorExample Unauthorized
 *    HTTP/1.1 401 unauthorized
 * {
    "status": {
        "code": 401,
        "message": "Invalid Credientials"
    },
    "response": {
        "code": "unauthorized",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"b816224d-7d79-487d-be62-a461e55af026\",\"authorization\":\"Basic bWlycmF5ZWU6UmF5ZWVz\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 *  @apiErrorExample Forbidden
 *    HTTP/1.1 403 Forbidden
{
    "status": {
        "code": 403,
        "message": "Not Authorized to perform this operation"
    },
    "response": {
        "code": "Forbidden",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"9330674a-b053-4c9b-92de-261616ca3376\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 *
 * 
 */




router.get('/admin/token', MiddleWare.validatePermission, Controller.getTokens)

/**
 * @api {post} http://localhost:3000/api/admin/token Generates Invitation Tokens
 * @apiName Admin Generates Invitation Tokens to be shared with potential customers  
 * @apiGroup Tokens
 * @apiHeader (Basic Authorization) {String} Authorization Authorization value.
 *
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": {
 *           "code": 200,
 *           "message": "Success"
 *          },
 *           "response": {
 *               "token": "w5c7hmAh",
 *               "active": true,
 *               "expiry": "2018-07-01T19:23:56.000Z"
 *          }
 *      }
 * 
 *  @apiErrorExample Unauthorized
 *    HTTP/1.1 401 unauthorized
 * {
    "status": {
        "code": 401,
        "message": "Invalid Credientials"
    },
    "response": {
        "code": "unauthorized",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"b816224d-7d79-487d-be62-a461e55af026\",\"authorization\":\"Basic bWlycmF5ZWU6UmF5ZWVz\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 *  @apiErrorExample Forbidden
 *    HTTP/1.1 403 Forbidden
{
    "status": {
        "code": 403,
        "message": "Not Authorized to perform this operation"
    },
    "response": {
        "code": "Forbidden",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"9330674a-b053-4c9b-92de-261616ca3376\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 *
 * 
 */

router.post('/admin/token', MiddleWare.validatePermission, Controller.generateToken);



/**
 * @api {get} http://localhost:3000/api/admin/token/disable/:token Disable Invitation Token
 * @apiName Disable Invitation Token 
 * @apiGroup Tokens
 * @apiHeader (Basic Authorization) {String} Authorization Authorization value.
 *
 * 
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *          "status": {
 *              "code": 200,
 *              "message": "Success"
 *          },
 *          "response": {
 *               "_id": "5b2fefccc3f5211dad410d07",
 *              "token": "w5c7hmAh",
 *              "active": false,
 *              "expiry": "2018-07-01T19:23:56.000Z"
 *          }
 *       }
 *
 *  @apiErrorExample NotFound
 *  HTTP/1.1 404 NotFound
 * 
 *  {
 *      "status": {
 *          "code": 404,
 *          "message": "Token Not Found"
 *      },
 *      "response": {
 *          "code": "NotFound",
 *          "opts": {
 *              "payload": "{\"query\":{},\"body\":{},\"params\":{}}",
 *              "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"1578d45f-3451-4f06-ac65-cd897a80856e\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
 *              "url": "/api/admin/token/disable/w5c7hmA"
 *          }
 *       }
 *  }
 * 
 *  @apiErrorExample Unauthorized
 *    HTTP/1.1 401 unauthorized
 * {
    "status": {
        "code": 401,
        "message": "Invalid Credientials"
    },
    "response": {
        "code": "unauthorized",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"b816224d-7d79-487d-be62-a461e55af026\",\"authorization\":\"Basic bWlycmF5ZWU6UmF5ZWVz\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 *  @apiErrorExample Forbidden
 *    HTTP/1.1 403 Forbidden
{
    "status": {
        "code": 403,
        "message": "Not Authorized to perform this operation"
    },
    "response": {
        "code": "Forbidden",
        "opts": {
            "payload": "{\"query\":{},\"body\":{},\"params\":{\"token\":\"w5c7hmA\"}}",
            "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"9330674a-b053-4c9b-92de-261616ca3376\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}",
            "url": "/api/admin/token/disable/w5c7hmA"
        }
    }
}
 * 
 */


router.get('/admin/token/disable/:token', MiddleWare.validatePermission, Controller.disableToken)





/**
 * @api {get} http://localhost:3000/api/login Validate Invitation Token and Login 
 * @apiName Validate Invitation Token and Login 
 * @apiGroup Login
 * 
 * @apiParam {String} Token  Invitation Token.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": {
 *              "code": 200,
 *              "message": "Success"
 *          },
 *          "response": {
 *               "_id": "5b2fefccc3f5211dad410d07",
 *              "token": "w5c7hmAh",
 *              "active": false,
 *              "expiry": "2018-07-01T19:23:56.000Z"
 *          }
 *       }
 *
 * 
 * @apiErrorExample BadRequest
 *     HTTP/1.1 400 BadRequest
 *     {
 *      "status": {
 *       "code": 400,
 *       "message": "Invalid Token"
 *      },
 *       "response": {
 *       "code": "BadRequest",
 *       "opts": {
 *           "payload": "{\"query\":{},\"body\":{\"token\":\"w5c7hmAh\"},\"params\":{}}",
 *           "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"dec4b269-cf30-4406-b89c-f448ce79492b\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"23\",\"connection\":\"keep-alive\"}",
 *           "url": "/api/login"
 *       }
 *      }
 *   }
 * 
 * 
 * 
 * 
 * 
 * @apiErrorExample NotFound
 *     HTTP/1.1 404 NotFound
 * 
 * {
 *   "status": {
 *       "code": 404,
 *       "message": "Token Not Found"
 *   },
 *   "response": {
 *       "code": "NotFound",
 *       "opts": {
 *           "payload": "{\"query\":{},\"body\":{\"token\":\"w5c7hmA\"},\"params\":{}}",
 *           "headers": "{\"content-type\":\"application/json\",\"cache-control\":\"no-cache\",\"postman-token\":\"cda3d885-414b-4171-9ccb-dda61e2999f8\",\"authorization\":\"Basic bWlycmF5ZWVzOlJheWVlcw==\",\"user-agent\":\"PostmanRuntime/7.1.1\",\"accept\":\"**\",\"host\":\"localhost:3000\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"22\",\"connection\":\"keep-alive\"}",
 *           "url": "/api/login"
 *       }
 *   }
 *  }
 * 
 * 
 */

router.post('/login', limiter, MiddleWare.validateToken, Controller.login);

module.exports = router;