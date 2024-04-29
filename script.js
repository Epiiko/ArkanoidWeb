const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 488;
canvas.height = 400;

//-------------------------Variables de la pelota------------------------------------
const ballRadius = 4;
//posi pelota en mitad del tablero y abajo del todo -30
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad pelota
let dx = 4;
let dy = -4;

//-----------------------------Variables de la paleta--------------------------------
const paddleWidth = 100;
const paddleHeight = 31;
const speedMove = 5;
//colocamos el paddle en la mitad restandole al canvas la anchura y haciendo su mitad
let paddleX = (canvas.width - paddleWidth) / 2;
//colocamos el paddle en su posicion por encima del final
let paddleY = canvas.height - paddleHeight - 10;
let rightPressed = false;
let leftPressed = false;
//-----------------------------Variables de los ladrillos--------------------------------
const brickRowCount= 6;
const brickColumnCount= 13;
const brickWidth=30;
const brickHeight =14;
const brickPadding= 4;
const brickTopStart = 80;//donde van a empezar los ladrillos por arriba
const brickLeftStart = 30;//donde van a empezar los ladrillos por izqd
const brickStatus ={
    EXIST: 1,
    BROKEN: 0
}
const bricks=[];
 /*recorremos las columnas de los ladrillos a colocar e iniciamos un array dentro de cada
 iteraccion para inicializar las filas*/
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++) {
        // colocamos los ladrillos uno detras de otro respetando el espacio entr ellos
       const brickX = i * (brickWidth + brickPadding) + brickLeftStart
       const brickY = j * (brickHeight + brickPadding) + brickTopStart
       //asignamos colores aleatorios
       const rand= Math.floor(Math.random()*8);
       //Guardamos la info en cada ladrillo creando un objeto para ello
       bricks[i][j]= {
        x: brickX,
        y: brickY,
        status: brickStatus.EXIST,
        color: rand
       }
    }
}
//-----------------------------funcionalidades------------------------------------------
function drawBall() {
  ctx.beginPath();
  //posiciones de incicio, arqueo, duracion del arco
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
 let img=new Image();
 img.src="./paddle.png"
  ctx.fillStyle = "#red";
  //coord x, coord y, ancho, alto
  ctx.drawImage(img, paddleX, paddleY , paddleWidth, paddleHeight);
}
function drawBricks() {
    //recoremos bricks
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            const actualBrick=bricks[i][j];
            //si encontramos destruido no lo pintamos y seguimos a la siguiente vuelta
            if(actualBrick.status===brickStatus.BROKEN) continue;
            ctx.fillStyle= 'yellow';
            ctx.rect(
                actualBrick.x,
                actualBrick.y,
                brickWidth,
                brickHeight
            )
            ctx.fill();
        }
    }
}
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

  const ballContactPaddleAtX = x > paddleX && x < paddleX + paddleWidth; //contacto en eje x
  const ballContactPaddleAtY = y > paddleY; //contacto en eje x
  //si contacta en ambos cambiamos direccion si no hay game over
  if (ballContactPaddleAtY && ballContactPaddleAtX) {
    dy= - dy;
  } else if (y + dy > canvas.height - paddleHeight) {
    console.log("Game Over MADAFAKA");
    document.location.reload();
  }
}
function paddleMove() {
  //movemos y limitamos el movimiento al borde del canvas
  if (rightPressed && paddleX < canvas.width - paddleWidth +10) {
    paddleX += speedMove;
  } else if (leftPressed && paddleX > -10) {
    paddleX -= speedMove;
  }
}
function cleanCanvas() {
  //limpiamos lo dibujado para que quede como que actuliza al borrar lo anterior
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  //en caso de que se de el evento no vamos a pinta aqui solo actualizamos variables
  function keyDownHandler(ev) {
    const { key } = ev;
    /*realizamos el if-elseif para que no reciba dos respuestas seguidas y solo tome
        una direccion*/
    if (key === "right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key == "left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  function keyUpHandler(ev) {
    const { key } = ev;
    /*realizamos el if-elseif para que no reciba dos respuestas seguidas y solo tome
        una direccion*/
    if (key === "right" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key == "left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}
function drawCanvas() {
  console.log("LEFT ->" + leftPressed + "RIGHT ->" + rightPressed);
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
