# Purpose

When sending data from client to a node.js server, it is convenient to use a new line to delimit data. Unfortunately when the data is received on the server, it might not arrive together. For example, when "hello\n" is sent to the server, it may arrive in pieces: "h", "el", "llo\n". 

This helper library is used to buffer incoming data and pass it on to a callback function when a whole line is received. If the arriving data does not have "\n", it will be stored until "\n" arrives. This way the callback function only needs to deal with entire lines and avoid the need to have buffering logic.

# Use as a node.js event callback function

The returned function is the cleaner. It receives the "dirty data," produces the "clean data," and passes the "clean data" to the callback function. "cleanDataHandler" is the callback function which uses the "clean data". When "wrap" function gets called, it returns a function and this returned function has the same signature as the callback function, so it is convenient to put the returned function  everywhere you would want to put function "cleanDataHandler". By passing the "cleanDataHandler" to the "wrap" function, we can clean the data and use the clean data easily.

# Usage:

###Example using node.js:  

___Before___:  

```javascript
server.on('data', function(data) {    
   // Do something with received data  
   // The data may arrive in pieces  
});  
```
___After___:  

```javascript  
var cleaner = require("./cleaner");

server.on('data', cleaner.wrap(function(data) {  
    // Do something with received data  
    // The data is guaranteed to be one line at a time  
}));
```  


###Example test case:
```javascript  

var cleaner = require("./cleaner");  

var cleanDataHandler = function(cleanData) {  
    console.log(cleanData);  
}  

var wrapper = cleaner.wrap(cleanDataHandler);  

wrapper("h");  
wrapper("ell");  
wrapper("");  
wrapper("o\nworld\n");  
```  


The output:  
```  
hello  
world 
``` 



