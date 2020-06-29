var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>画板</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <canvas id="canvas" width = "100" height="100"></canvas>
        <script>
            var canvas = document.getElementById("canvas");
            canvas.width = document.documentElement.clientWidth;
            canvas.height =document.documentElement.clientHeight;/!--获取的是文档的高度而不是body的高度--/
            var ctx = canvas.getContext("2d");
            let painting  = false;
            ctx.fillStyle = "black";
            ctx.strokeStyle = 'none';
            canvas.onmousedown = () =>{
                painting = true
            }
            canvas.onmousemove = (e)=>{
                if(painting === true){
                    ctx.beginPath();
                    ctx.arc(e.clientX,e.clientY,10,0,2*Math.PI);
                    ctx.stroke();
                    ctx.fill();
                }
                else{
                    console.log('noting to do')
                }
            }
            canvas.onmouseup = () =>{
                painting = false
            }
        </script>
    </body>
    </html>
    `)
    response.end()
  } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  #canvas {
      display: block;
  }`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

