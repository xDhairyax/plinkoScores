var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
  
var PLAY=1;
var END=0;
var gameState=PLAY;
 
  var ground;
   
var particles = [];
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;

var particle;
var score=0;
var turn=0;
var line;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400,790,800,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
particle=new Particle(mouseX,10,10);
    

    
}
 


function draw() {
  background(0);
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);

  text("Score:"+score,650,50);

  if(gameState===PLAY){

    ground.display();

  for (var i = 0; i < plinkos.length; i++) {
      
      plinkos[i].display();
      
    }
   /* if(frameCount%60===0){
      particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
      score++;
    }*/
  
   for (var j = 0; j < particles.length; j++) {
        particles[j].display();
    }

    for (var k = 0; k < divisions.length; k++) {
        divisions[k].display();
     }

     if(particle!==null){
      particle.display();
      if(particle.body.position.y>760){
        if(particle.body.position.x<300){
          score=score+500;
          particle=null;
          if(turn>=5)gameState="END";
        }
      
    
    
    
       else if(particle.body.position.x>301 && particle.body.position.x<600){
          score=score+100;
          particle=null;
          if(turn>=5)gameState="END";
        }
    
    
    
       else if(particle.body.position.x>601 && particle.body.position.x<900){
          score=score+200;
          particle=null;
          if(turn>=5)gameState="END";
        }
      }
    }


    if(turn===5){
      gameState=END;
    }
  }
    if(gameState===END){
      text("GAME OVER",400,400);
    }

   
}
drawSprites();

function mousePressed(){
  if(gameState!==END){
    turn++;
  
   particle=new Particle(mouseX,10,10);
  }
}