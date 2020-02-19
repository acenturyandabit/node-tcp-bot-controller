let net = require("net");
let server=net.createServer();
let baseC;
server.on("connection",(c)=>{
    baseC=c;
    baseC.on("error",(e)=>{
        baseC=undefined;
    })
    console.log("made C");
})
server.listen(8330);


const http = require('http')
const port = 8022

const requestHandler = (request, response) => {
  console.log(request.url)
  let stuff=`
  <body class="body">
  <div class="wrapper">
  <canvas></canvas>
  </div>


  <style>
  .body,
.wrapper {
  /* Break the flow */
  position: absolute;
  top: 0px;

  /* Give them all the available space */
  width: 100%;
  height: 100%;

  /* Remove the margins if any */
  margin: 0;

  /* Allow them to scroll down the document */
  overflow-y: hidden;
}

.body {
  /* Sending body at the bottom of the stack */
  z-index: 1;
}

.wrapper {
  /* Making the wrapper stack above the body */
  z-index: 2;
}
  </style>
  <script>
      document.body.style.margin = 0;
      let c = document.querySelector("canvas");
      let w = document.body.clientWidth;
      let h = document.body.clientHeight;
      c.width = w;
      c.height = h;
      let minwh = Math.min(w, h);
      let posx = w / 2;
      let posy = h / 2;
      let ctx = c.getContext('2d');
      let ws = new WebSocket("ws://localhost:8047");
  
      function ping(url) {
          if (ws.readyState == 1) {
              ws.send(url);
          } else {
              if (ws.readyState > 1) {
                  ws = new WebSocket("ws://localhost:8047");
              }
          }
      };
  
      function sendCommands(x, y) {
        if (y < h / 3) {
            ping("0o1f2f3o");
          } else if (y > 2 * h / 3) {
            ping("0f1o2o3f");
          }else if (x < w / 3) {
              ping("0f1o2f3o");
          } else if (x > 2 * w / 3) {
              ping("0o1f2o3f");
          } else {
              ping("2f3f0f1f");
          }
      }
      setInterval(() => {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(posx, posy, minwh / 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
          sendCommands(posx, posy);
          console.log(\`x:\${posx},y:\${posy}\`);
      }, 200);
      c.addEventListener("touchmove", (e) => {
          posx = e.touches[0].clientX;
          posy = e.touches[0].clientY;
      });
      c.addEventListener("touchend", (e) => {
          posx = w / 2;
          posy = h / 2;
      });
  </script>
  </body>
  `;
  response.writeHead(200,{"content-length":stuff.length,"content-type":"text/html; charset=utf-8"});
  response.end(stuff);
}

const htps = http.createServer(requestHandler);

htps.listen(port, (err) => {
  console.log(`server is listening on ${port}`);
})

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8047 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
      console.log(message);
    if (baseC){
        console.log("has c");
        baseC.write(message);
    }
  });
});