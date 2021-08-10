var http = require('http');
var fs = require('fs');
var url = require('url');


function templateHTML(title, list, description){
  return  `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;
}

function templist(filelist){
  var list = '<ul>';

          for(i=0; i<filelist.length; i++){
            list +=`<li><a href="/?id=${filelist[i]}"> ${filelist[i]} </a></li>`;
          }
          list = list + '</ul>';

  return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    console.log(queryData);
    if(pathname === '/'){
      if(queryData.id === undefined){

          fs.readdir('./data', (err, filelist)=>{
                console.log(filelist);
          var title = 'Welcome';
          var description = 'Hello, Node.js!';
          var list = templist(filelist);
          var template = templateHTML(title, list, description);

          response.writeHead(200);   
          response.end(template);
          });


     }

     fs.readdir('./data', (err, filelist)=>{
      var list = templist(filelist);

     fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
       var template = templateHTML(title, list, description);
       response.writeHead(200);   
       response.end(template);
     });
    });
    }
    else{
      response.writeHead(404);
      response.end('Not found');
    }
  
 
});
app.listen(3000);