/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require("url");

var results = {"results":[
  { 
    createdAt: "2015-09-07T21:04:24.855Z", 
    objectId: "yxrBh3qNXO", 
    roomname: "Double L", 
    text: " deployed a new form of pony #sf", 
    updatedAt: "2015-09-07T21:04:24.855Z",
    username: "jkjkkjkj"
  }, 
  { 
    createdAt: "2015-09-07T21:04:24.855Z", 
    objectId: "yxrBh3qNXO", 
    roomname: "Double L", 
    text: " deployed a new form of pony #sf", 
    updatedAt: "2015-09-07T21:04:24.855Z",
    username: "jkjkkjkj"
  }
]}

// Does the routing
// var routeMethod = function(path, request, response){
//   // GET method
//   var responseData = {};

//   if (request.method == "GET") {
//     if(path === "/classes/room1"){
//       responseData.headers[]
//       return JSON.stringify(results);
//     } else {
//       return "NOT FOUND. GO AWAY!!!!"
//     }
//   }

//   // POST method
//   else if (request.method == "POST"){
//     var postData = "";
//     response.addListener('data', function(postDataChunk){
//       postData += postDataChunk;
//     })

//     request.addListener('end', function(){
//       response.writeHead(201, "File Not Found", {'Content-Type': 'text/plain'});
//       return postData;
//     })
//     // request.on('end', function(chunk) {
//     //   // chats["results"].push(chunk);
//     //   bodyData += chunk;
//     //   // return JSON.stringify(chunk);
//     //   return "Received POST data"
//     // });

//     // request.on('end', function(){
//     //   response.writeHead(200, "OK", {'Content-Type': 'text/html'});
//     //   response.end('request ended');
//     // })
//   }
// }

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.

  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  console.log("Serving request type " + request.method + " for url " + request.url);
  var path = url.parse(request.url).pathname;

  var responseData = {};

  if(path !== "/classes/room1" && path !== "/classes/room" && path !== "/classes/messages" && path !== "/send"){
    responseData.statusCode = 404;
    responseData.headers = defaultCorsHeaders;
    responseData.headers['Content-Type'] = "text/html";
    responseData.data = "File Not Found";

    response.writeHead(responseData.statusCode, responseData.headers);
    response.end(path);
  }

  // Handle POST requests
  if (request.method == "POST") {
    responseData.statusCode = 201;
    responseData.headers = defaultCorsHeaders;
    responseData.headers['Content-Type'] = "text/html";

    // Listen for posted data chunks and add them up
    var postData = "";
    request.addListener('data', function(postDataChunk){
      postData += postDataChunk;
    });

    request.addListener('end', function(){
      // Write the header
      results["results"].unshift(JSON.parse(postData));
      response.writeHead(responseData.statusCode, responseData.headers);
      // End the response and send the posted data
      response.end(postData);
    })

  } else {
    responseData.statusCode = 200;
    responseData.headers = defaultCorsHeaders;
    responseData.headers['Content-Type'] = "application/json";
    responseData.data = JSON.stringify(results);

    response.writeHead(responseData.statusCode, responseData.headers);
    response.end(responseData.data);
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;


 // request.on('end', function(chunk) {
//     //   // chats["results"].push(chunk);
//     //   bodyData += chunk;
//     //   // return JSON.stringify(chunk);
//     //   return "Received POST data"
//     // });

//     // request.on('end', function(){
//     //   response.writeHead(200, "OK", {'Content-Type': 'text/html'});
//     //   response.end('request ended');
//     // })
  
  //   responseData.statusCode = 404;
  //   responseData.headers = defaultCorsHeaders;
  //   responseData.headers['Content-Type'] = "text/html";
  //     return "NOT FOUND. GO AWAY!!!!"
  //   }
  // }

  // 
  // }

  // The outgoing status.
  // var statusCode = 200;

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(responseData.statusCode, responseData.headers);
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // Send back some JSON data
  // response.end(responseData.data);


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

