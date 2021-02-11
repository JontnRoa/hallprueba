
let Pline = null;
let Gauge1 = null;
let table ;
var varGlobal1 = 56;


let Pline2 = null;
let Gauge2 = null;
let table2 ;

let Pline3 = null;
let Gauge3 = null;
let table3 ;

let data_line = [];
let data_table= [];

let data_line1 = [];
let data_table2= [];

let data_line3 = [];
let data_table3= [];

let valsal;

canvas1  = document.getElementById("cvs_line");
canvas2  = document.getElementById("cvs_line2");
canvas3  = document.getElementById("cvs_line3");

const numvalues = 1000;
const numvalues2 = 1000;
const numvalues3 = 1000;

for (let i =0;i < numvalues; ++i){data_line.push(null);}
let  flag= true;


window.onload = function() {
    Pline = new RGraph.Line({
        id: 'cvs_line',
        data: data_line,
        options:{
            marginLeft: 75,
            marginRight: 55,
            filled: true,
            filledColors: ['#C2D1F0'],
            colors: ['#3366CB'],
            shadow: false,
            tickmarksStyle: null,
            xaxisTickmarksCount: 0,
            backgroundGridVlines: false,
            backgroundGridBorder: false,
            xaxis: false,
            textSize: 16
        }
    } ).draw();
    Gauge2= new RGraph.Meter({
        id: 'cvs_gauge2',
        min: 0,
        max: 500,
        value: 45,
        options: {
            colorsGreenColor: 'Gradient(green:#040)',
            colorsYellowColor: 'Gradient(#ff0:#440)',
            colorsRedColor: 'Gradient(#f00:#400)',
            labelsValueText: true,
            labelsValueTextUnitsPost: ',000k',
            labelsRadiusOffset: -3
        }
    }).draw().responsive([
        // This is the configuration for small screens
        {
            maxWidth:900,
            width:400,
            height:150,
            options:{textSize: 8},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '400px';
                obj.canvas.parentNode.style.height = '150px';
            }
        },

        // This is the default configuration (for larger screens)
        {
            maxWidth:null,
            width:600,
            height:300,
            options:{textSize: 18},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '600px';
                obj.canvas.parentNode.style.height = '300px';
            }
        }
    ]);

    Gauge1= new RGraph.Meter({
        id: 'cvs_gauge',
        min: 0,
        max: 500,
        value: 45,
        options: {
            colorsGreenColor: 'Gradient(green:#040)',
            colorsYellowColor: 'Gradient(#ff0:#440)',
            colorsRedColor: 'Gradient(#f00:#400)',
            labelsValueText: true,
            labelsValueTextUnitsPost: ',000k',
            labelsRadiusOffset: -3
        }
    }).draw().responsive([
        // This is the configuration for small screens
        {
            maxWidth:900,
            width:400,
            height:150,
            options:{textSize: 8},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '400px';
                obj.canvas.parentNode.style.height = '150px';
            }
        },

        // This is the default configuration (for larger screens)
        {
            maxWidth:null,
            width:600,
            height:300,
            options:{textSize: 18},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '600px';
                obj.canvas.parentNode.style.height = '300px';
            }
        }
    ]);

    Gauge3= new RGraph.Meter({
        id: 'cvs_gauge3',
        min: 0,
        max: 500,
        value: 45,
        options: {
            colorsGreenColor: 'Gradient(green:#040)',
            colorsYellowColor: 'Gradient(#ff0:#440)',
            colorsRedColor: 'Gradient(#f00:#400)',
            labelsValueText: true,
            labelsValueTextUnitsPost: ',000k',
            labelsRadiusOffset: -3
        }
    }).draw().responsive([
        // This is the configuration for small screens
        {
            maxWidth:900,
            width:400,
            height:150,
            options:{textSize: 8},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '400px';
                obj.canvas.parentNode.style.height = '150px';
            }
        },

        // This is the default configuration (for larger screens)
        {
            maxWidth:null,
            width:600,
            height:300,
            options:{textSize: 18},
            callback:function (obj)
            {
                // Set the width/height of the container
                obj.canvas.parentNode.style.width  = '600px';
                obj.canvas.parentNode.style.height = '300px';
            }
        }
    ]);



}

//envio de varibles
/* var envioangu = document.getElementById('envioangulo');

    envioangu.addEventListener('submit',function(e){
        e.preventDefault();
        console.log('estoy oprimido')
 var datos = new FormData (envioangu);
       // console.log(datos)
      console.log(datos.get('Valor de Angulo'))
        //valsal=datos.get('valor de Angulo')

       /* fetch("post.php",{
            method: "POST",
            body: datos
        })

        .then( res => res.json())
        .then( data => {
            console.log(data)
        })*/
/*const lectura = 
        {
            
            value: { 
            value: { 
                 value: datos.get('Valor de Angulo')

            }
      }
  }
  console.log(lectura);   

 })  */

 

   
  
  
//Refresca la grafica, re imprime valores
function drawLine(value){
    if(!Pline){return}
    RGraph.Clear(canvas1); 
    data_line.push(value);
    if(data_line.length > numvalues){
        data_line = RGraph.arrayShift(data_line);
}
    Pline.original_data[0] = data_line;

    Pline.draw();
}

const socket = io.connect('http://localhost:3005');


//var socket = io("http://localhost:3008");
var form = document.getElementById('envioangulo');
var input = document.getElementById('Valor de Angulo');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on("message2", function(dataValues){
    drawLine(dataValues.value);
    Gauge1.value = dataValues.value;
    Gauge1.grow();

});

socket.on("message", function(dataValue){
  drawLine(dataValue.value);
    Gauge2.value = dataValue.value;
    Gauge2.grow();
});

socket.on("message3", function(dataValues3){
    drawLine(dataValues3.value);
      Gauge3.value = dataValues3.value;
      Gauge3.grow();
  });

  //Codigo para Mandar datos

 

