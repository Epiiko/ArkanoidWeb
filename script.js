const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 488;
canvas.height = 400;

//-------------------------Variables de la pelota------------------------------------
const ballRadius = 3;
//posi pelota en mitad del tablero y abajo del todo -30
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad pelota
let dx = 4;
let dy = -4;

//-----------------------------Variables de la paleta--------------------------------
const paddleWidth = 70;
const paddleHeight= 10;
const speedMove= 5;
//colocamos el paddle en la mitad restandole al canvas la anchura y haciendo su mitad
let paddleX = (canvas.width - paddleWidth) /2
//colocamos el paddle en su posicion por encima del final
let paddleY = canvas.height - paddleHeight -15;
let rightPressed =false;
let leftPressed =false;

//-----------------------------funcionalidad------------------------------------------
function drawBall() {
  ctx.beginPath();
  //posiciones de incicio, arqueo, duracion del arco
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "#red";
    //coord x, coord y, ancho, alto
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
}

function drawBricks() {}
function collisionAlert() {}

function ballMove() {
  x += dx;
  y += dy;
  //planteamos las posibles colisiones
  //------------------------------EJE X-------------------------------------
  /*pared derecha-> si la posicion de x + el movimiento tiene 
            mas ancho que el canvas menos lo que ocupa la bola  
    pared izqd -> si la x menos el movimiento es menos que lo que ocupa la bola*/
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  //------------------------------EJE Y-------------------------------------
  /*  pared superior -> si la posicion mas el movimiento es menor que el radio de la bola
   rebota y cambia direccion */
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  //   pared inferior-> si la posicion mas el movimiento es mayor que la altura del canvas mas
  //   el radio de la pelota o toca la pala
  const ballContactPaddleAtX = x > paddleX && x < paddleX + paddleWidth //contacto en eje x
  
  if(
    false
  ){
    dy -dy;
  }else if (y + dy > canvas.height - ballRadius) {
    console.log("Game Over MADAFAKA");
    document.location.reload()
   
  }
}
function paddleMove() {
    //movemos y limitamos el movimiento al borde del canvas
    if(rightPressed && paddleX<canvas.width - paddleWidth){
        paddleX += speedMove;
    }else if(leftPressed && paddleX>0){
        paddleX -=speedMove
    }
}
function cleanCanvas() {
  //limpiamos lo dibujado para que quede como que actuliza al borrar lo anterior
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function initEvents(){
    document.addEventListener("keydown" , keyDownHandler)
    document.addEventListener("keyup" , keyUpHandler)
    //en caso de que se de el evento no vamos a pinta aqui solo actualizamos variables
    function keyDownHandler(ev){
        const {key} = ev;
        /*realizamos el if-elseif para que no reciba dos respuestas seguidas y solo tome
        una direccion*/
        if(key==='right' || key==='ArrowRight'){
            rightPressed=true;
        }else if(key=='left' || key==='ArrowLeft'){
            leftPressed=true;
        }
    }
    function keyUpHandler(ev){
        const {key} = ev;
        /*realizamos el if-elseif para que no reciba dos respuestas seguidas y solo tome
        una direccion*/
        if(key==='right' || key==='ArrowRight'){
            rightPressed=false;
        }else if(key=='left' || key==='ArrowLeft'){
            leftPressed=false;
        }
    }
}
function drawCanvas() {
    console.log("LEFT ->"  + leftPressed + "RIGHT ->" + rightPressed );
  cleanCanvas();
  //funcion para realizar los cambios en pantalla llamandose a si mismo frame por frame
  //hay que dibujar los elementos
  drawBall();
  drawPaddle();
  drawBricks();
  //colisiones y movimientos
  collisionAlert();
  ballMove();
  paddleMove();
  window.requestAnimationFrame(drawCanvas);
}
drawCanvas();
initEvents();
