var trex,trexCorrendo,trexColide;
var bordas;
var pontos=0;
var solo,imagemSolo,soloInvisivel;
var nuvem,imagemNuvem;
var play=1
var fim=0
var sonjump,sondie,sonpoint
var gameover,gameoverimg
var restart,restartimg
var record=0
var estadoDeJogo=play
var nuvemGp,cactoGp
var cacto,imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6;
// carega midias
function preload(){
 trexCorrendo=loadAnimation("trex1.png","trex3.png","trex4.png")
imagemSolo=loadImage("ground2.png");
imagemNuvem=loadImage("cloud.png")
imagemCacto1=loadImage("obstacle1.png")
imagemCacto2=loadImage("obstacle2.png")
imagemCacto3=loadImage("obstacle3.png")
imagemCacto4=loadImage("obstacle4.png")
imagemCacto5=loadImage("obstacle5.png")
imagemCacto6=loadImage("obstacle6.png")
trexColide=loadAnimation("trex_collided.png")
restartimg=loadImage("restart.png")
gameoverimg=loadImage("gameOver.png")
sonjump=loadSound("jump.mp3")
sondie=loadSound("die.mp3")
sonpoint=loadSound("checkpoint.mp3 ")
}


function setup(){
  createCanvas(windowWidth,windowHeight);
 bordas=createEdgeSprites();
  //criando o trex
  trex=createSprite(50,height-40,20,50);
  trex.addAnimation("correndo",trexCorrendo);
  trex.addAnimation("collid",trexColide);
  trex.scale=0.5;
  trex.debug=false
  //trex.setCollider("rectangle",0,0,50,50,60)
  trex.setCollider("circle",0,0,25)
  soloInvisivel=createSprite(width/2,height-20,width,2)
  soloInvisivel.visible=false;
  solo=createSprite(width/2,height-30,width,2);
  solo.addImage("solo",imagemSolo);
  nuvemGp=new Group();
  cactoGp=new Group();
  gameover=createSprite(width/2,height-120,100,10)
  gameover.addImage(gameoverimg)
  gameover.scale=0.5
  restart=createSprite(width/2,height-80,100,10)
  restart.addImage(restartimg)
  restart.scale=0.5
  gameover.visible=false
  restart.visible=false
}


function draw(){ 
  //definir a cor do plano de fundo 
  background("white");

  if (trex.isTouching(cactoGp)) {
    estadoDeJogo=fim
   // sondie.play()
  } 

  if(estadoDeJogo==play){
    trex.changeAnimation("correndo",trexCorrendo)
    pontos=pontos+Math.round(getFrameRate()/60) 
    if (pontos%100===0&&pontos>0) {
     sonpoint.play() 
    }
 //pular quando tecla de espaço for pressionada
  if (touches.length>0||keyDown("space")&& trex.y>height-46) {
    trex.velocityY=-12 ;
    sonjump.play()
    touches=[]
  }
  solo.velocityX=-(12+pontos/100);
  if (solo.x<200 ) {
    solo.x=solo.width/2; 
   }   
   criandoCactos() 
   criandoNuvens()
  }

  if(estadoDeJogo==fim){
    
    trex.changeAnimation("collid",trexColide);
    solo.velocityX=0
    cactoGp.setVelocityXEach(0)
    nuvemGp.setVelocityXEach(0)
    cactoGp.setLifetimeEach(-1)
    nuvemGp.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible=true
    if (record<pontos) {
    record=pontos   
    }
    if(mousePressedOver(restart)){
    estadoDeJogo=play
    gameover.visible=false
    restart.visible=false
    cactoGp.destroyEach()
    nuvemGp.destroyEach()
    trex.changeAnimation("correndo",trexCorrendo);
    pontos=0
    }
  }
 
 
 fill ("black")
 textAlign(CENTER,TOP)
 textSize(18)
 text("record: "+record,width-86,height-154)
text("pontos: "+pontos,width-86,height-174)

 gravidade()
 trex.collide(soloInvisivel)
text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY)


  drawSprites();
}

function reset(){
 estadoDeJogo=play
 cactoGp.destroyEach()
 nuvemGp.destroyEach()
 restart.visible=false
 gameover.visible=false
 pontos=0
}

function gravidade() {
  trex.velocityY+=0.5 
}
function criandoNuvens() {
  if(frameCount%60==0){
     nuvem = createSprite(width,random(height-186,height-100),40,10); 
     nuvem.velocityX = -(4+pontos/100);
     nuvem.addImage(imagemNuvem); 
     nuvem.scale=random(0.3,1.4);
     nuvem.depth =trex.depth -1;
     nuvem.lifetime=width/nuvem.velocityX
     nuvemGp.add(nuvem)
     }

}
function criandoCactos() {
  if(frameCount%100==0){
    cacto = createSprite(width,height-35,10,10); 
     cacto.velocityX = -(6+pontos/100);
    cacto.scale=0.5;
     cacto.depth =trex.depth ;
     cacto.lifetime=width/cacto.velocityX
     cactoGp.add(cacto)
     var sorteio=Math.round(random(1,6));
switch (sorteio) {
  case 1:cacto.addImage(imagemCacto1)
    break;
    case 2:cacto.addImage(imagemCacto2)
    break;
    case 3:cacto.addImage(imagemCacto3)
    break;
    case 4:cacto.addImage(imagemCacto4)
    break;
    case 5:cacto.addImage(imagemCacto5)
    break;
    case 6:cacto.addImage(imagemCacto6)
    break;

  
}
     }

}