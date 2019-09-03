var p1 = prompt("Enter Player One Name:")
var p1col = 'rgb(86, 151, 255)'  // color format: check spacing and rgb coloring(BLUE)
var p2 = prompt("Enter Player Two Name:")
var p2col = 'rgb(237, 45, 73)' //Red

var game_on = true // to check whether the game is in progress.
var table = $('table tr');

// Use function to change color of a specific cell on the table.
// I check stack overflow for How to get table cell or index using jQuery.
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)  
}

//Report winning status on console 
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

// For returning color on a specific column and row. 
function reportColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')  
}

// check whether the bottom cell of the table is grey or not.
function checkBottom(colIndex){
    var colorReport = reportColor(6,colIndex);
    for (var row = 6; row > -1; row--){
        colorReport = reportColor(row,colIndex)
        if (colorReport === 'rgb(128, 128, 128)'){ //if the checked color is light grey
        return row;
        }
    }
}

// check the color for all the four buttons near to each other.
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one != undefined)
    }



// Now check for horizontal win
function horizontalWinCheck(){
    for (var row = 0; row < 7; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatchCheck(reportColor(row,col),reportColor(row,col+1),reportColor(row,col+2),reportColor(row,col+3))){
                reportWin(row,col)
                return true;
            }
            else{
                continue
            }
        }
    }
}


// check for vertical win 
function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for (var row = 0; row < 4; row++){
            if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col),reportColor(row+2,col),reportColor(row+3,col))){
                reportWin(row,col)
                return true
            }
            else {
                continue
            }
    }
}
    
}

//Start with player1 (default)
var currentPlayer = 1;
var currentName = p1
var currentColor = p1col
$('h3').text(p1 + ", It's your turn.")
$('.board button').on('click',function(){
    var col = $(this).closest('td').index()
    var bottomAvailable = checkBottom(col)
    changeColor(bottomAvailable,col,currentColor)
    if(horizontalWinCheck() || verticalWinCheck()){
        $('h1').text(currentName + ", You have won! Please refresh the page.")
        $('h3').hide(1000)
        $('h2').hide(1000)
}
// For continuing purpose, 1*-1-> -1. SO, THE NEXT PLAYER WILL BE PLAYER 2,    
currentPlayer = currentPlayer * -1  
if(currentPlayer === 1){
    
    currentName = p1
    console.log("Player A initiated.")
    $('h3').text(currentName +" It's your turn")
    currentColor = p1col
}
else{ 
    currentName = p2
    console.log("Player B initiated.")
    $('h3').text(currentName +" It's your turn.")
    currentColor = p2col
    
}
})
    