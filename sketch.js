
var monkey, monkeyImage, bananaImage, jungle, jungleImage,ground,bananaGroup,score,rockImage,invisibleWall;
var gameState,monkeyLife,gameOverImage,gameOver; 

function preload(){

  jungleImage = loadImage("jungle2.jpg"); 
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("Banana.png");
  rockImage = loadImage("stone.png")
  gameOverImage = loadImage("gameOver.png")
}

function setup()
{
createCanvas(500,500);

jungle = createSprite(200,200,400,400);
jungle.addImage("jungleImage", jungleImage);
jungle.x = jungle.width/2;
jungle.velocityX = -5;

monkey = createSprite(50,450,20,20)
monkey.addAnimation("monkey",monkeyImage);
monkey.scale = 0.15;

ground = createSprite(250,450,500,5);
ground.visible = false;

bananaGroup = new Group();

rockGroup = new Group();

score = 0;

gameState = "play"; 

invisibleWall = createSprite(250,100,500,0.01);
invisibleWall.visible = false;

monkeyLife = 2;

gameOver = createSprite(250,250,10,10);
gameOver.addImage("gameOverImage",gameOverImage);
gameOver.visible = false; 

}

function draw()
{

  background(0);

if(gameState === "play")
{
  if (keyDown("space"))
  {
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY+1;
  
  if(jungle.x < 0)
  {
   jungle.x = jungle.width/2;
  }
  
  switch(score)
  {
   case 10 : monkey.scale =  0.25;
   break;
   case 20 : monkey.scale = 0.35;
   break;
   case 30 : monkey.scale = 0.45;
   break; 
   case 40 : monkey.scale = 0.55;
   break;
   default : break; 
  }
  
  bananaLoop();
  
  rockLoop();
  
  if(bananaGroup.isTouching(monkey))
  {
   score = score + 1;
   bananaGroup.destroyEach();
  }

  if(rockGroup.isTouching(monkey)&& monkeyLife === 2)
  {
    monkey.scale = 0.15;
    monkeyLife = monkeyLife - 1
    score = score - 2;
  }

  console.log(monkeyLife);

  if(rockGroup.isTouching(monkey)&& monkeyLife === 1)
  {
    gameState = "end"
    monkeyLife = 0;
  }

}
else if(gameState === "end")
{
  jungle.velocityX = 0;
  rockGroup.setVelocityEach(0,0);
  bananaGroup.setVelocityEach(0,0);
  monkey.velocityY = 0;
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  monkey.visible = false;
  gameOver.visible = true;
}

monkey.collide(invisibleWall); 

monkey.collide(ground);

//monkey.collide(rockGroup);

drawSprites();
  
  textSize(30);
  fill(255);
  text("Score = " + score,100,50)


}

function bananaLoop() {
  if(frameCount %150 === 0) {
    var banana = createSprite(500,Math.round(random(250,330)),10,10);
    banana.addImage("banana" , bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    bananaGroup.add(banana);
    banana.lifetime = 300;
  }
}

function rockLoop() {
  if(frameCount % 100 === 0) {
    var rock = createSprite(500,450,10,10);
    rock.addImage("Stone" , rockImage);
    rock.scale = 0.3;
    rock.velocityX = -5;
    
    rock.lifetime = 300;
    
    rockGroup.add(rock);
  }
}






