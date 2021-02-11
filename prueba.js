const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/inex.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
});
    socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

http.listen(3009, () => {
  console.log('listening on *:3009');
});



//envio de varibles
 var envioangu = document.getElementById('envioangulo');

    envioangu.addEventListener('submit',function(e){
        e.preventDefault();
        console.log('estoy oprimido')
 var datos = new FormData (envioangu);
       // console.log(datos)
      console.log(datos.get('Valor de Angulo'))
        //valsal=datos.get('valor de Angulo')

        fetch("post.php",{
            method: "POST",
            body: datos
        })

        .then( res => res.json())
        .then( data => {
            console.log(data)
        })
const lectura = 
        {
            
            value: { 
            value: { 
                 value: datos.get('Valor de Angulo')

            }
      }
  }
  console.log(lectura);   

 })  