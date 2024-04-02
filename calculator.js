const express= require("express");                                                 //This line will import express.js framework
const res = require("express/lib/response");                               // This line will import response object from express library 
const app= express();                                                           // This line will create express application instance
const winston = require('winston');                                            // This line will import winston logging library
const add = (num1, num2) => { return num1 + num2; }                            //  This line defines add function  
const sub = (num1, num2) => { return num1 - num2; }                           //  This line defines subtract function
const multi = (num1, num2) => { return num1 * num2; }                        //  This line defines multiplication function
const div = (num1, num2) => { return num1 / num2; }                         //  This line defines division function
const exp = (base, exponent) => { return Math.pow(base, exponent); }
const sqrt = (num) => { return Math.sqrt(num); }
const modulo = (num1, num2) => { return num1 % num2; }

const logger = winston.createLogger({                                                   // This line creates the winston logger instance
    level: 'info',                                                                       // This line set log level to info
    format: winston.format.json(),                                                       // It uses json format for logging
    defaultMeta: { service: 'calculator-microservice' },                               // This line sets default metadata for the logger
    transports: [                                                                      // It defines transports for logging to files
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),       // It writes all logs with importance level of `error` or less to `error.log`
        new winston.transports.File({ filename: 'logs/combined.log' }),                // It writes all logs with importance level of `info` or less to `combined.log`
    ],
});

  if (process.env.NODE_ENV !== 'production') {               // This line checks whether the node environment is not set to production
    logger.add(new winston.transports.Console({               // It configures the winston logger to console log the message when environment not in production 
      format: winston.format.simple(),                           
    }));                                                        
  }
                           
app.get("/add", (req, res) => {                                        // it Define a route to handle GET requests at the '/add' endpoint
    try {
        const num1 = parseFloat(req.query.num1);                           // It Parse query parameters num1 as float
        const num2 = parseFloat(req.query.num2);                           // It Parse query parameters num2 as float
        if (isNaN(num1)) {                                                   // It will check if num1 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num1 is incorrectly defined");
            throw new Error("num1 parameter incorrectly defined");
        }
        if (isNaN(num2)) {                                                       // It will check if num2 is NaN (not a number) and if yes it will log error and throw an error
            logger.error("num2 is incorrectly defined");                        
            throw new Error("num2 parameter incorrectly defined");
        }
        logger.info('Parameters '+num1+' and '+num2+' received for addition');         // It will log info message about parameters received for addition
        const result = add(num1, num2);                                                // It will perform the addition
        res.status(200).json({ statuscode: 200, data: result });                        // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                             // It will log error to console
        res.status(500).json({
            statuscode: 500, msg: error.toString()                                      // It will send error response with status code 500 and error message in json format

        })
    }
});


app.get("/sub", (req, res) => {                                             // it Define a route to handle GET requests at the '/sub' endpoint
    try {
        const num1 = parseFloat(req.query.num1);                                 // It Parse query parameters num1 as float
        const num2 = parseFloat(req.query.num2);                                  // It Parse query parameters num2 as float
        if (isNaN(num1)) {                                                        // It will check if num1 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num1 is incorrectly defined");
            throw new Error("num1 parameter incorrectly defined");
        }
        if (isNaN(num2)) {                                                           // It will check if num2 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num2 is incorrectly defined");
            throw new Error("num2 parameter incorrectly defined");
        }
        logger.info('Parameters '+num1+' and '+num2+' received for subtraction');           // It will log info message about parameters received for subtraction
        const result = sub(num1, num2);                                                      // It will perform the subtraction
        
        res.status(200).json({ statuscode: 200, data: result });                            // It will send the response with status code 200 and data in json format   
    } catch (error) {
        console.log(error);                                                               // It will log error to console
        res.status(500).json({
            statuscode: 500, msg: error.toString()                                       // It will send error response with status code 500 and error message in json format
        })
    }
});

app.get("/multi", (req, res) => {                                            // it Define a route to handle GET requests at the '/multi' endpoint
    try {
        const num1 = parseFloat(req.query.num1);                                // It Parse query parameters num1 as float
        const num2 = parseFloat(req.query.num2);                                 // It Parse query parameters num2 as float
        if (isNaN(num1)) {                                                       // It will check if num1 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num1 is incorrectly defined");
            throw new Error("num1 parameter incorrectly defined");
        }
        if (isNaN(num2)) {                                                        // It will check if num2 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num2 is incorrectly defined");
            throw new Error("num2 parameter incorrectly defined");
        }
        logger.info('Parameters '+num1+' and '+num2+' received for multiplication');    // It will log info message about parameters received for multiplication
        const result = multi(num1, num2);                                                // It will perform the multiplication
        
        res.status(200).json({ statuscode: 200, data: result });                          // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                                 // It will log error to console
        res.status(500).json({
            statuscode: 500, msg: error.toString()                                          // It will send error response with status code 500 and error message in json format
        })
    }
});

app.get("/div", (req, res) => {                                                // it Define a route to handle GET requests at the '/multi' endpoint
    try {
        const num1 = parseFloat(req.query.num1);                                       // It Parse query parameters num1 as float
        const num2 = parseFloat(req.query.num2);                                        // It Parse query parameters num2 as float
        if (isNaN(num1)) {                                                            // It will check if num1 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num1 is incorrectly defined");
            throw new Error("num1 parameter incorrectly defined");
        }
        if (isNaN(num2)) {                                                               // It will check if num2 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num2 is incorrectly defined");
            throw new Error("num2 parameter incorrectly defined");
        }
        logger.info('Parameters '+num1+' and '+num2+' received for division');            // It will log info message about parameters received for division

        const result = div(num1, num2);                                                      // It will perform the division
        
        res.status(200).json({ statuscode: 200, data: result });                          // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                               // It will log error to console
        res.status(500).json({
            statuscode: 500, msg: error.toString()                                       // It will send error response with status code 500 and error message in json format
        })
    }
});


app.get("/exp", (req, res) => {                                                             // it Define a route to handle GET requests at the '/exp' endpoint
    try {
        const base = parseFloat(req.query.base);                                            // It Parse query parameter base as float
        const exponent = parseFloat(req.query.exponent);                                     // It Parse query parameter exponent as float
        if (isNaN(base)) {                                                                 // It will check if base is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("Base is incorrectly defined");                        
            throw new Error("Base parameter incorrectly defined");
        }
        if (isNaN(exponent)) {                                                          // It will check if exponent is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("Exponent is incorrectly defined");
            throw new Error("Exponent parameter incorrectly defined");
        }
        
        logger.info('Parameters '+base+' and '+exponent+' received for exponentiation');     // It will log info message about parameters received for exponentiation 
        const result = exp(base, exponent);                                                  // It will perform the exponentiation
        res.status(200).json({ statuscode: 200, data: result });                         // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                                // It will log error to console
        res.status(500).json({ statuscode: 500, msg: error.toString() });                   // It will send error response with status code 500 and error message in json format
    }
});


app.get("/sqrt", (req, res) => {                                                        // it Define a route to handle GET requests at the '/sqrt' endpoint
    try {
        const num = parseFloat(req.query.num);                                             // It Parse query parameter num as float
        if (isNaN(num)) {                                                                 // It will check if num is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("Number is incorrectly defined");
            throw new Error("Number parameter incorrectly defined");
        }
        logger.info('Parameter '+num+' received for square root');                           // It will log info message about parameters received for square root
        const result = sqrt(num);                                                            // It will perform the square root
        res.status(200).json({ statuscode: 200, data: result });                            // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                                 // It will log error to console
        res.status(500).json({ statuscode: 500, msg: error.toString() });                  // It will send error response with status code 500 and error message in json format
    }
});

app.get("/modulo", (req, res) => {                                                        // it Define a route to handle GET requests at the '/modulo' endpoint
    try {
        const num1 = parseFloat(req.query.num1);                                          // It Parse query parameter num1 as float
        const num2 = parseFloat(req.query.num2);                                          // It Parse query parameter num2 as float
        if (isNaN(num1)) {                                                                // It will check if num1 is NaN (not a number) and if yes it will log the error and throw an error 
            logger.error("num1 is incorrectly defined");
            throw new Error("num1 parameter incorrectly defined");
        }
        if (isNaN(num2)) {                                                                 // It will check if num2 is NaN (not a number) and if yes it will log the error and throw an error
            logger.error("num2 is incorrectly defined");
            throw new Error("num2 parameter incorrectly defined");
        }

        logger.info('Parameters '+num1+' and '+num2+' received for modulo operation');        // It will log info message about parameters received for modulo operation
        const result = modulo(num1, num2);                                                     // It will perform the modulo operation 
        res.status(200).json({ statuscode: 200, data: result });                               // It will send the response with status code 200 and data in json format
    } catch (error) {
        console.log(error);                                                                       // It will log error to console
        res.status(500).json({ statuscode: 500, msg: error.toString() });                       // It will send error response with status code 500 and error message in json format
    }
});

const port=3040;                                                                        // It will set the port for the express server to listen on
app.listen(port,()=> {                                                                  // It will start the express server and listen on the specified port
    console.log("hello i'm listening to port "+port);
})

