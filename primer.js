const express = require("express");
const {cyan,bgRed}=require("chalk");
const socketio = require("socket.io");
const MongoClient=require("mongodb").MongoClient;

const http = require ('http');
const path = require('path');

var opcua={OPCUAClient,
    MessageSecurityMode, SecurityPolicy,writeValue,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    ReadValueIdLike,
    ClientMonitoredItem,
    DataValue}=require("node-opcua");
var async = require("async");
const { Double } = require("mongodb");


var the_session, the_subscription;



//Constantes para Comunición OPC UA

const endpointUrl = "opc.tcp://DESKTOP-S6R0F43:4840";
const nodeIdToa= "ns=4;s=|var|CODESYS Control Win V3 x64.Application.PLC_PRG.a";
const nodeIdTob = "ns=4;s=|var|CODESYS Control Win V3 x64.Application.PLC_PRG.b";
const nodeIdToc = "ns=4;s=|var|CODESYS Control Win V3 x64.Application.PLC_PRG.c";
const nodeIdTod = "ns=4;s=|var|CODESYS Control Win V3 x64.Application.PLC_PRG.m";

//Constante para app web
const port = 3005;
const port1=3008;
var salida = 56;
var prueba;
//mongo
const uri= "mongodb+srv://jonathanroa:1234@llegas.5xn19.mongodb.net/llegas?retryWrites=true&w=majority"; //familycars1+
const clientmongo= new MongoClient(uri, {useUnifiedTopology: true});

(async()=> {
    try {
           //Cliente OPC UA  
           const client= OPCUAClient.create();
           
          //Reconexión
          client.on("backoff", (retry, delay) =>{
            console.log("Reintentando conectar a ",endpointUrl, "attempt", retry);
        });

        //INTENTO DE CONEXIÓN
        console.log("Conectando a",cyan(endpointUrl));

        // CONEXIÓN
        await client.connect(endpointUrl);
        console.log("Conexión ok con", cyan(endpointUrl));

        //Interactuar con OPC UA
        const session= await client.createSession();
        console.log("Sesion iniciada".yellow);


          //Crear suscripción
          const subscription = await session.createSubscription2({
            requestedPublishingInterval: 200, 
            requestedMaxKeepAliveCount: 20,
            publishingEnabled: true,            
        });
        const itemToMonitor={
            nodeId:nodeIdToa,
             attributeId: AttributeIds.Value
        };
         //segunyo
             const itemToMonitor2={
             nodeId:nodeIdTob,
             attributeId: AttributeIds.Value
         };

         //segunyo2
         const itemToMonitor3={
            nodeId:nodeIdToc,
            attributeId: AttributeIds.Value
        };

        //enviar dato segun yo

         const parameters={
             samplingInterval:50,    
             discardOldest: true,
             queueSize: 100
         }

                             //prueba de salida
 // step 4' : read a variable with read

   /* const nodesToWrite = 
        {
           nodeId: nodeIdTod,
           attributeId: AttributeIds.Value,
           indexRange: null,
         value: { 
            value: { 
                dataType: opcua.DataType.UInt16,
                 value:data
            }
      }
  
  
    }*/

  //session.write(nodesToWrite);

         const monitoredItem = await subscription.monitor(itemToMonitor, parameters, TimestampsToReturn.Both)//itemToMonitor2,
         //CReo Yo
         const monitoredItem2 = await subscription.monitor(itemToMonitor2, parameters, TimestampsToReturn.Both)
           //CReo Yo
         const monitoredItem3 = await subscription.monitor(itemToMonitor3, parameters, TimestampsToReturn.Both)
         //salida 
      //  const monitowrite = await subscription.monitor(nodesToWrite, parameters, TimestampsToReturn.Both)



//------- Inicializando Servidores y Sockets
         const app= express();
         const server=http.createServer(app);
        //const io2 = socketio.listen(server);   

         app.set("view engine","html");
         
         app.use(express.static(__dirname + '/'));
         app.set('views',__dirname + '/');
 
         app.get('/', (req, res) => {
             res.render('index.html');
         });

         app.get('/jolo', (req, res) => { 
              res.sendFile(__dirname + '/inex.html');
        });

      //  const io=socketio(app.listen(port1));

        //const io = socketio.listen(port);

       // const io=socketio(app.listen(port));
           
      app.set('port', process.env.PORT || port )

      app.use(express.static(path.join(__dirname,'index.html')));


      const io=socketio(app.listen(app.get('port')), () =>{
             console.log(`sever on port ${app.get('port')}`);
     });




 ///Escuavhar Variable de IndexHTML para escribir y mandar
         io.sockets.on('connection', (socket) => {

            var data =  socket.on('chat message', (msg) => {
              console.log('Angulo: ' + msg);

              const nodesToWrite = 
        {
           nodeId: nodeIdTod,  
           attributeId: AttributeIds.Value,
           indexRange: null,
         value: { 
            value: { 
                dataType: opcua.DataType.String,
                 value:msg
            }
      }
  }
  session.write(nodesToWrite, function(err,statusCode) {
    if (!err) {
        console.log(" write ok" );
        
           console.log(statusCode);

      
    }
});
            });
            

            console.log('a user connected');
            socket.on('disconnect', () => {
              console.log('user disconnected');
          });
              
          });
         
        
  
         console.log("Esuchando al puerto"+ 'port');
         console.log("visitar http://localhost:"+'port');

         //mongo
      //  await clientmongo.connect();

     //   const collection=clientmongo.db("joder").collection("coleccion");

         monitoredItem.on("changed",(dataValue)=>{
            
            /*collection.insertOne({
                valor: dataValue.value.value, 
                time: dataValue.serverTimestamp
                });*/

            io.sockets.emit("message",{
                value: dataValue.value.value,
                time: dataValue.serverTimestamp,
                nodeId:nodeIdToa,
                browseName:"Nombre"
                });        

        });
                  //Segunda Variable Segun Yo talves revisar
        monitoredItem2.on("changed",(dataValues)=>{
            //el mensaje contiene
         /*llection.insertOne({
                valor: dataValues.value.value, 
                time: dataValues.serverTimestamp
                });*/

            io.sockets.emit("message2",{
                //el mensaje contiene
                value: dataValues.value.value,
                time: dataValues.serverTimestamp,
                nodeId1:nodeIdTob,
                browseName:"Nombre2"
                });        

        });

                 //Tercer Variable Segun Yo talves revisar
                 monitoredItem3.on("changed",(dataValues3)=>{
                    //el mensaje contiene
                 /*   collection.insertOne({
                        valor: dataValues3.value.value, 
                        time: dataValues3.serverTimestamp
                        });*/
        
                    io.sockets.emit("message3",{
                        //el mensaje contiene
                        value: dataValues3.value.value,
                        time: dataValues3.serverTimestamp,
                        nodeId1:nodeIdToc,
                        browseName:"Nombre3"
                        });        
        
                });

               



         

         let running=true;
        process.on("SIGINT",async()=>{
            if(!running){
                return;
            }
            console.log("shutting down client");
            running=false;
            await clientmongo.close();
            await subscription.terminate();
            await session.close();
            await client.disconnect();
            console.log("Done");
            process.exit(0);
        });

 }
    catch(err){
        console.log(bgRed.white("Error"+err.message));
        console.log(err);
        process.exit(-1);
    }



})();

