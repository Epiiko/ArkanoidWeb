const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 488;
canvas.height = 400;

// Variables de la pelota
const ballRadius = 3;
//posi pelota en mitad del tablero y abajo del todo -30
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad pelota
let dx = 2;
let dy = -2;

//Variables de la paleta
const paddleWidth = 70;
const paddleHeight= 10;
//colocamos el paddle en la mitad restandole al canvas la anchura y haciendo su mitad
let paddleX = (canvas.width - paddleWidth) /2
//colocamos el paddle en su posicion por encima del final
let paddleY = canvas.height - paddleHeight -15;

function drawBall() {
  ctx.beginPath();
  //posiciones de incicio, arqueo, duracion del arco
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "#fff";
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
  //   el radio de la pelota
  if (y + dy > canvas.height - ballRadius) {
    console.log("Game Over MADAFAKA");
    setTimeout(()=>{
         document.location.reload();
    },1000)
   
  }
}
function paddleMove() {}
function cleanCanvas() {
  //limpiamos lo dibujado para que quede como que actuliza al borrar lo anterior
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCanvas() {
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
