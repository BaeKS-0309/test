// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);
let replay = document.querySelector(".replay");

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
// 우주선좌표
let gameOver = false;
let score = 0;
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;
let bulletList = []; // 총알들을 저장하는 리스트
let enemyList = []; // 적군을 저장하는 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX;
    this.y = spaceshipY;
    this.alive = true;
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
}

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 64);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 3;
    if (this.y >= canvas.height - 64) {
      gameOver = true;
    }
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/bg.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/ship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.jpg";
}

let keysDown = {};
function setupkeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode];
    if (event.keyCode == 32) {
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  let b = new Bullet();
  b.init();
}

function createElement() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
}

function update() {
  if (39 in keysDown) {
    spaceshipX += 5;
  } // right
  if (37 in keysDown) {
    spaceshipX -= 5;
  } // left

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 40) {
    spaceshipX = canvas.width - 40;
  }
  // 우주선이 canvas 밖으로 안나가기

  // 총알의 y좌표 업데이트 하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`, 20, 50);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x + 13.5, bulletList[i].y);
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update(); // 좌표값을 업데이트
    render(); // 그려준다
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 75, 200, 250, 250);
  }
}

replay.addEventListener("click", function () {
  location.reload();
});

loadImage();
setupkeyboardListener();
createElement();
main();
