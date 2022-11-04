var bgImg,bg;
var player;
var shooterImg,shooter_shooting;
var zombieImg;
var zombie;
var zombieGroup;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img
var bullets=30,bullet,bulletGroup;
var gameState="fight"
var win,lose,explosion 
var life=3,score=0
 

function preload(){
  bgImg = loadImage("assets/bg.jpeg")
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting= loadImage("assets/shooter_3.png");
  zombieImg= loadImage("assets/zombie.png");
  heart1Img= loadImage("assets/heart_1.png");
  heart2Img= loadImage("assets/heart_2.png");
  heart3Img= loadImage("assets/heart_3.png");
  win= loadSound("assets/win.mp3");
  explosion= loadSound("assets/explosion.mp3");
  lose= loadSound("assets/lose.mp3");
}

function setup() {
createCanvas(windowWidth,windowHeight)
 bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
player=createSprite(displayWidth-1150,displayHeight-300,50,50)
player.addImage(shooterImg)
player.scale = 0.5
player.debug=true
player.setCollider("rectangle",0,0,200,470)
console.log(windowWidth)
console.log(windowHeight)
zombieGroup = new Group();
heart1 = createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heart1Img)
heart1.scale= 0.4
heart1.visible = true
heart2 = createSprite(displayWidth-100,40,20,20)
heart2.addImage("heart2",heart2Img)
heart2.scale= 0.4
heart2.visible = false
heart3 = createSprite(displayWidth-150,40,20,20)
heart3.addImage("heart3",heart3Img)
heart3.scale= 0.4
heart3.visible = false
bulletGroup=new Group();

}


function draw() {
background(0)
if(gameState=="fight"){

    if(life===3){
        heart3.visible=true
        heart2.visible=false
        heart1.visible=false
    }
    if(life===2){
        heart3.visible=false
        heart2.visible=true
        heart1.visible=false
    }
    if(life===1){
        heart3.visible=false
        heart2.visible=false
        heart1.visible=true
    }
    if(life===0){
gameState="lost"
lose.play()
    }
    if(score===100){
        gameState="won"
        win.play();
    }
if(keyDown("DOWN_ARROW")||touches.length>0)
{
    player.y=player.y+20
}
if(keyDown("UP_ARROW")||touches.length>0)
{
    player.y=player.y-20
}
if(keyWentDown("space"))
{

    bullet=createSprite(displayWidth-1000,player.y,20,10)
    bullet.velocityX=20
    bulletGroup.add(bullet)
    bullets=bullets-1
    console.log(bullets)
    player.addImage(shooter_shooting)
    explosion.play()
}
else if(keyWentUp("space"))
{
    player.addImage(shooterImg)

}
enemy();
if(zombieGroup.isTouching(player)){
    lose.play()
for(var i=0;i<zombieGroup.length;i++)
{
    if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life=life-1
    }
}
}
if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++)
    {
        if(zombieGroup[i].isTouching(bulletGroup)){
            zombieGroup[i].destroy()
            explosion.play()
            bulletGroup.destroyEach()
            score=score+5
        }
    }
    }
} 

if(bullets==0){
gameState ="bullet"
lose.play()
}

drawSprites()
textSize(20)
fill("white")
text("BULLETS ="+bullets,displayWidth-210,displayHeight/2-250)
text("SCORE ="+score,displayWidth-200,displayHeight/2-220)
text("LIFE ="+life,displayWidth-200,displayHeight/2-280)
if(gameState=="lost"){
    textSize(90)
    fill ("red")
    text("YOU LOST",400,400)
    player.destroy()
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
}
else if(gameState=="won"){
    textSize(90)
    fill ("green")
    text("YOU WON",400,400)
    player.destroy()
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
}
else if(gameState=="bullet"){
    textSize(50)
    fill ("blue")
    text("YOU RAN OUT OF BULLETS",470,400)
    player.destroy()
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
}
}
function enemy(){
if (frameCount % 60 === 0){
    zombie=createSprite(random(500,1300),random(150,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.23
    zombie.velocityX = -2
    zombie.lifetime = 400
    zombie.debug = true
    zombie.setCollider("rectangle",0,0,350,900)
    zombieGroup.add(zombie)
}


}

