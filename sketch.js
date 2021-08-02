const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var bridge;
var ground;
var leftWall,rightWall;
var jointPoint,jointLink;
var zombie1;
var zombie2;
var zombie3;
var zombie4;
var zombie;
var stones=[]
var bgImg;
var breakbutton;



function preload(){
    bgImg=loadImage("background.png")
    zombie1=loadImage("zombie1.png")
    zombie2=loadImage("zombie2.png")
    zombie3=loadImage("zombie3.png")
    zombie4=loadImage("zombie4.png")
    
}
function setup() {
     createCanvas(windowWidth, windowHeight);
      engine = Engine.create();
      world = engine.world;
      frameRate(80);

      zombie=createSprite(width/2,height-110);
      zombie.scale= 0.1;
      zombie.velocityX=10
      zombie.addAnimation("leftToright",zombie1,zombie2,zombie1);
      zombie.addAnimation("rightToleft",zombie3,zombie4,zombie3);
      
     ground= new Base(0,height-10,width*2,20);
    leftWall= new Base(100,height-300,200,height/2+100);
     rightWall= new Base(width-100,height-300,200,height/2+100);

    bridge=new Bridge(30,{x:width/2-400,y:height/2})
     jointPoint=new Base (width-600,height/2+10,40,20)

    Matter.Composite.add(bridge.body,jointPoint);
     jointLink=new Link(bridge,jointPoint);

    for (var i = 0; i <= 8; i++) {

       var x = random(width / 2 - 200, width / 2 + 300);

        var y = random(-10, 140);

         var stone = new Stone(x, y, 80, 80);

          stones.push(stone); 
        }
        breakButton = createButton("");
        breakButton.position(width - 200, height / 2 - 50);
        breakButton.class("breakbutton");
        breakButton.mousePressed(handleButtonPress);

}

function draw() {
  background(bgImg);
  Engine.update(engine);
  ground.display();
  leftWall.display();
  bridge.show();
  rightWall.display()
  if(zombie.position.x>=width-300){
    zombie.velocityX=-10;
    zombie.changeAnimation("rightToleft")

  }
  if(zombie.position.x<=width-300){
    zombie.velocityX=10;
    zombie.changeAnimation("leftToright")

  }
  for (var stone of stones)
  {
     stone.show();
  }  
  drawSprites();
}
function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
