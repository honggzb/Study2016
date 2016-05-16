// mobile size
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

//各个棋盘格的位置 -top
function getPosTop(i,j){
  //return 20 + i+120;
  return cellSpace + i*(cellSpace+cellSideLength);     
}
//各个棋盘格的位置 -left
function getPosLeft(i,j) {
  //return 20 + j+120;
  return cellSpace + j*(cellSpace+cellSideLength);;
}

//
function getNumberCellBackgroundColor(number){
  switch(number){
    case 2: return "#eee"; break;
    case 4: return "#ede0c6"; break;
    case 8: return "#f2b179"; break;
    case 16: return "#f59563"; break;
    case 32: return "#f67c5f"; break;
    case 64: return "#f65e3b"; break;
    case 128: return "#edcf72"; break;
    case 256: return "#edcc61"; break;
    case 512: return "#9c0"; break;
    case 1024: return "#33b5e5"; break;
    case 2048: return "#09c"; break;
    case 4096: return "#a6c"; break;
    case 8192: return "#93c"; break;
  }
  return "black";
}

function getNumberColor(number){
  if(number <= 4){
    return "#776e65";
  }else{
    return "white";
  }
}

function nospace() {
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j] == 0) return false;
    }
  }
  return true;
}

function canMoveLeft(board) {
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){  // begin with 1
      if(board[i][j] != 0){
        if(board[i][j-1] == 0 || board[i][j-1]==board[i][j]) 
          { return true; }
      }
    }
  }
  return false;
}

function canMoveRight(board) {
  for(var i=0;i<4;i++){
    for(var j=3;j>0;j--){
      if(board[i][j] != 0){
        if(board[i][j+1] == 0 || board[i][j+1]==board[i][j]) 
          { return true; }
      }
    }
  }
  return false;
}

function noBlockHorizontal(row,col1,col2,board) {
  for(var i= col1+1;i<col2;i++){
    if(board[row][i] != 0){
      return false;
    }
  }
  return true;
}

function canMoveUp(board) {
  for(var j=0;j<4;j++){
    for(var i=1;i<4;i++){
      if(board[i][j] != 0){
        if(board[i-1][j] == 0 || board[i-1][j]==board[i][j]) 
          { return true; }
      }
    }
  }
  return false;
}

function canMoveDown(board) {
  for(var j=0;j<4;j++){
    for(var i=2;i>=0;i--){
      if(board[i][j] != 0){
        if(board[i+1][j] == 0 || board[i+1][j]==board[i][j]) 
          { return true; }
      }
    }
  }
  return false;
}

function noBlockVertical(col,row1,row2,board) {
  for(var i= row1+1;i<row2;i++){
    if(board[i][col] != 0){
      return false;
    }
  }
  return true;
}

function nomove() {
  if(canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board)){
    return false;
  }
  return true;
}