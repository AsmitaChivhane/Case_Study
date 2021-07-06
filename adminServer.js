var express = require('express');
var bodyParser= require("body-parser");
var mongoose = require('mongoose');
//importing databse connection
const connection = require('./database/DBconnection')
var app = express();
var cors=require('cors');
//importing swagger dependencies
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//for testing 
var server =app.listen(port,function(){
    var host = server.address().address;
    var port = server.address().port;
})
module.exports = server;
//enable the cors
app.use(cors());

//app.use(express.json());
//MIME type---->it is used to communicate with the client
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const admin = require('./Router/adminRouter')
app.use(admin);

//defining the options of swaggwer
const swaggerOption={
    swaggerDefinition:{
        openapi:'3.0.0',
        info:{
            title:'express API for Admin',
            version:'1.0.0',
            contact:{
                author:"asmita",
            },
            server:["http://localhost:7000"]
        },
       
    },
    apis:["adminServer.js"]
    }
    const swaggerDocs =swaggerJsDoc(swaggerOption);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use(express.json());
// schema declaration/definition
/**
 * @swagger
 * definitions:
 *  admin:
 *   type: object
 *   properties:
 *    train_name:
 *     type: string
 *     description: name of passenger
 *     example: 
 *    from:
 *     type: string
 *     description: email of passenger
 *     example: 
 *    to:
 *     type: string
 *     description: password of passenger
 *     example: 
 *    fare:
 *     type: number
 *     description: number of passenger
 *     example: 
 *    arrival_time:
 *     type: number
 *     description: age of passenger
 *     example: 
 *    departure_time:
 *     type: number
 *     description: age of passenger
 *     example:
 *    available:
 *     type: number
 *     description: age of passenger
 *     example:
 */

 //post request for login

/**
 * @swagger
 *  /api/admin:
 *   post:
 *    summary: admin
 *    description: admin
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/admin'
 *    responses:
 *     200:
 *      description: successfull
 */
//post request for saerch from and to

/**
 * @swagger
 *  /api/search:
 *   post:
 *    summary: search by from-to
 *    description: search by from-to
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/admin'
 *    responses:
 *     200:
 *      description: successfull
 */
//swagger put request 

// swagger get request by tarin id 
/**
 * @swagger
 *  /api/train/{_id}:
 *   get:
 *    summary: fetch passenger,
 *    description: new passenger will register,
 *    parameters:
 *       - in : Path
 *         name: _id
 *         required: true
 *         description: ID of the booking
 *    responses:
 *     200:
 *      description: successfull
 *     404:
 *      description: error
 */
// swagger get request by booking id 
/**
 * @swagger
 *  /api/booking/{_id}:
 *   get:
 *    summary: fetch passenger,
 *    description: new passenger will register,
 *    parameters:
 *       - in : Path
 *         name: _id
 *         required: true
 *         description: ID of the booking
 *    responses:
 *     200:
 *      description: successfull
 *     404:
 *      description: error
 */

app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//port number
var port = process.env.PORT || 7000; 
app.listen(port);
console.log('Admin Server Listening on port ' + port);
