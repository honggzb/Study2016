//game data
var board = new Array();
var score = 0;
var hasConflicted = new Array();

//for mobile slide
var startx = 0, starty =0, endx = 0, endy =0;

$(document).ready(function(){
  prepareForMobile();
  newgame();
});

function prepareForMobile() {
  
  if(documentWidth > 500 ){
    gridContainerWidth = 500;
    cellSideLength = 100;
    cellSpace = 20;
  }
  
  $('#grid-container').css({
    'width': gridContainerWidth - 2*cellSpace,
    'height': gridContainerWidth - 2*cellSpace,
    'padding': cellSpace,
    'margin-top': cellSpace,
    'border-radius': 0.02*gridContainerWidth
  });
  $('.grid-cell').css({
    'width': cellSideLength,
    'height': cellSideLength,
    'border-radius': 0.02*gridContainerWidth
  });
  
}

function newgame(){
  //初始化棋盘格
  init();
  //在随机两个格子生成数字
  generateOneNumber();
  generateOneNumber();
}

function init() {
  //init grid css
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell = $("#grid-cell-"+i+"-"+j);
      gridCell.css("top", getPosTop(i,j));
      gridCell.css("left",getPosLeft(i,j));
    }
  }
  //init board data
  for(var i=0;i<4;i++){
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for(var j=0;j<4;j++){
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }
  
  updateBoardView();
  score = 0;
}

function updateBoardView (arguments) {
  $(".number-cell").remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      var theNumberCell = $("#number-cell-"+i+"-"+j);
      
      if(board[i][j]==0){
        theNumberCell.css("width","0px");
        theNumberCell.css("height","0px");
        // theNumberCell.css("top",getPosTop(i,j)+50);
        // theNumberCell.css("left",getPosLeft(i,j)+50);
        theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
        theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
      }else{
        // theNumberCell.css("width","100px");
        // theNumberCell.css("height","100px");
        theNumberCell.css("width",cellSideLength);
        theNumberCell.css("height",cellSideLength);
        theNumberCell.css("top",getPosTop(i,j));
        theNumberCell.css("left",getPosLeft(i,j));
        theNumberCell.css("background-color",getNumberCellBackgroundColor(board[i][j]));
        theNumberCell.css("color",getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
      hasConflicted[i][j] = false;
    }
  }
  $('.number-cell').css('line-height', cellSideLength+'px');
  $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber() {
  if(nospace(board)){
    return false;
  }
  //随机位置
  var randx = parseInt(Math.floor(Math.random()*4));  // 0-4
  var randy = parseInt(Math.floor(Math.random()*4));  // 0-4
  // while(true){
  //   if(board[randx][randy] == 0) 
  //     break;
  //   randx = parseInt(Math.floor(Math.random()*4));
  //   randy = parseInt(Math.floor(Math.random()*4));
  // }
  // 优化随机位置
  var times = 0;
  while(times < 50){
    if(board[randx][randy] == 0) 
      break;
    randx = parseInt(Math.floor(Math.random()*4));
    randy = parseInt(Math.floor(Math.random()*4));
    times ++;
  }
  //如果times =50, 人工生成随机位置
  if(times == 50){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j] == 0){
          randx = i;
          randy = j;
        }
      }
    }
  }
  //随机数字
  var randNumber = Math.random()<0.5 ? 2:4;
  //随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx,randy,randNumber);
  
  return true;
}

$(document).keydown(function(event){
  event.preventDefault();  //避免滑动条跟着键盘一起运动
  switch(event.keyCode){
    case 37: //left
      if(moveLeft()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
      break;
    case 38: //up
      if(moveUp()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
      break;
    case 39: //right
      if(moveRight()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
      break;
    case 40: //down
      if(moveDown()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
      break;
    default: 
      
      break;
  }
});

//mobile gesture
document.addEventListener('touchstart',function(event){
  //event.touches is Array, touch属于多点触摸, 本例只需要单点触摸, 故只需要event.touches[0]
  startx = event.touches[0].pageX;
  starty = event.touches[0].pageY;
});
//android bug:   https://code.google.com/p/android/issues/detail?id=19827
document.addEventListener('touchmove',function(event){
  event.preventDefault();
});
document.addEventListener('touchend',function(event){
  endx = event.changedTouches[0].pageX;
  endy = event.changedTouches[0].pageY;
  var deltax = endx - startx;
  var deltay = endy - starty;
  //判断是滑动还是点击操作, 如果是点击操作，游戏不会进行
  if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
    return;
  }
  //判断滑动方向
  if(Math.abs(deltax) >= Math.abs(deltay)){  // x轴滑动
    if(deltax> 0){  //move right
      if(moveRight()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
    }else{   //move left
      if(moveLeft()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
    }
  }else{   //y轴滑动
    if(deltay>0){  //move down
      if(moveDown()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
    }else {  //move up
      if(moveUp()){
        setTimeout(function() { generateOneNumber(); }, 210);
        setTimeout(function() { isgameover(); }, 300);
      }
    }
  }
});

function isgameover() {
  if(nospace(board) && nomove(board)){
    gameover();
  }
}

function gameover(){
  alert('game over!');
}

function moveLeft() {
  if(!canMoveLeft(board)){ return false;  }
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){  //begin with 1
      if(board[i][j] != 0) {
        for(var k=0; k<j;k++){
          if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
            //move
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){
            //move and add
            showMoveAnimation(i,j,i,k);
            board[i][k] *= 2;
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",300);  // refresh
  return true;
}

function moveRight() {
  if(!canMoveRight(board)){ return false;  }
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){  //begin with 1
      if(board[i][j] != 0) {
        for(var k=3; k>j;k--){
          if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
            //move
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k] ){
            //move and add
            showMoveAnimation(i,j,i,k);
            board[i][k] *= 2;
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",300);  // refresh
  return true;
}

function moveUp() {
  if(!canMoveUp(board)){ return false;  }
  for(var j=0;j<4;j++){
    for(var i=1;i<4;i++){   //begin with 1
      if(board[i][j] != 0) {
        for(var k=0; k<i;k++){
          if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
            //move
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j] ){
            //move and add
            showMoveAnimation(i,j,k,j);
            board[k][j] *= 2;
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",300);  // refresh
  return true;
}

function moveDown() {
  if(!canMoveDown(board)){ return false;  }
  for(var j=0;j<4;j++){
    for(var i=2;i>=0;i--){   //begin with 1
      if(board[i][j] != 0) {
        for(var k=3; k>i;k--){
          if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
            //move
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];;
            board[i][j] = 0;
            continue;
          }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
            //move and add
            showMoveAnimation(i,j,k,j);
            board[k][j] *= 2;
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",300);  // refresh
  return true;
}