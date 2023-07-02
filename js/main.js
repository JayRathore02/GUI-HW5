/*
File: my.css
GUI Assignment: Create a small scrabble implementation
Jayendra Rathore, Jayendra_Rathore@student.uml.edu 
Date Created: June 26, 2023
Description: This is the js for the page and allows the tiles to be moved, picked, have a score counter etc
*/

let iTaken = [];

// array that holds every possible tile
const tileList = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
    "R", "S", "T", "U", "V", "W","X", "Y", "Z", '_']

// scabble tiles with their values, amount, amount left, and their image
let ScrabbleTiles = {} ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "numRemaining" : 9, "image" : "images/Scrabble_Tile_A.jpg" } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "numRemaining" : 2, "image": "images/Scrabble_Tile_B.jpg"  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_C.jpg"   } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "numRemaining" : 4, "image" : "images/Scrabble_Tile_D.jpg"   } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "numRemaining" : 12, "image" : "images/Scrabble_Tile_E.jpg"  } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_F.jpg"   } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "numRemaining" : 3, "image" : "images/Scrabble_Tile_G.jpg"   } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_H.jpg"   } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "numRemaining" : 9, "image" : "images/Scrabble_Tile_I.jpg"   } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "numRemaining" : 1, "image" : "images/Scrabble_Tile_J.jpg"   } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "numRemaining" : 1, "image" : "images/Scrabble_Tile_K.jpg"   } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "numRemaining" : 4, "image" : "images/Scrabble_Tile_L.jpg"   } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_M.jpg"   } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "numRemaining" : 6, "image" : "images/Scrabble_Tile_N.jpg"   } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "numRemaining" : 8, "image" : "images/Scrabble_Tile_O.jpg"   } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_P.jpg"   } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "numRemaining" : 1, "image" : "images/Scrabble_Tile_Q.jpg"   } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "numRemaining" : 6, "image" : "images/Scrabble_Tile_R.jpg"   } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "numRemaining" : 4, "image" : "images/Scrabble_Tile_S.jpg"   } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "numRemaining" : 6, "image" : "images/Scrabble_Tile_T.jpg"   } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "numRemaining" : 4, "image" : "images/Scrabble_Tile_U.jpg"   } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_V.jpg"  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_W.jpg"   } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "numRemaining" : 1, "image" : "images/Scrabble_Tile_X.jpg"   } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_Y.jpg"   } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "numRemaining" : 1, "image" : "images/Scrabble_Tile_Z.jpg"   } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "numRemaining" : 2, "image" : "images/Scrabble_Tile_Blank.jpg"   } ;

// copy of the tiles, used to reset the ScrabbleTiles
let originalTiles = JSON.parse(JSON.stringify(ScrabbleTiles));
//console.log(originalTiles);

// These are for the current state of the board, an empty string is the default value of each tile
let scrabble_Row = ['', '', '', '', '', '', ''];
let tempRow = ['', '', '', '', '', '', ''];

// array that holds indexes of areas that have a tile
let positionArr = [];

/* set the start value of score and highestscore */
let score = 0;
let wordScore = 0;
let highestScore = 0;

// dictionary arr that will hold all words in the dictionary
let dictionaryArr = [];

// some helper variables
let tempTile = ''
let tempTileIndex = ''

$(document).ready(function() {
    // this adds tiles to the tile holder rack
    setUpTileRack();
    // imports all the words from dictionary.txt and adds them to the array
    $.ajax({
        url: "dictionary.txt",
        success: function(result) {
            let words = result.split("\n");
            for (let i = 0; i < words.length; ++i) {
                dictionaryArr.push([words[i].toUpperCase()]); //makes words uppercase to be able to match with the tiles
            }
        }
    });
    
    // makes the row game board be droppable
    $(".boardSquare").droppable({
        accept: ".dragTile",
        drop: function(event, ui) {
            let str = event.target.id
            let index = str[str.length - 1] - 1
            if (isRowValid(index)) {
                $("#nextRoundButton").attr('disabled', false); // doesn't allow to go into next round if the word isn't valid
                let newTile, letter
                $(event.toElement).css('display', 'none')
                // displays every letter if a blank tile is placed, from there a letter can be chosen to be placed onto the board
                if (ui.draggable.attr("letter") == '_') {
                    tempTileIndex = index
                    $('#blankTilePicker').removeClass('hideTiles')
                    for (let j = 0; j < 26; j++) {
                        let letter = tileList[j];
                        if (ScrabbleTiles[letter].numRemaining > 0) {
                            $('#blankTilePicker').append($(`<img src=${ScrabbleTiles[letter]["image"]} onClick="blankTileHelper(${"'"+letter+"'"})" class="dragTile" letter=${letter} />`));
                        }
                    }
                    letter = ui.draggable.attr("letter")
                    newTile = $(`<img src=${ScrabbleTiles[letter]["image"]} class="dragTile" letter=${letter} id="spareBoard"/>`);
                } else {
                    letter = ui.draggable.attr("letter")
                    newTile = $(`<img src=${ScrabbleTiles[letter]["image"]} class="dragTile" letter=${letter} />`);
                }
                $(this).append(newTile)
                scrabble_Row[index] = letter;
                findScore(scrabble_Row);
            } else {
                ui.helper.animate({ top: 0, left: 0 }, 'fast'); // Snaps the dragged tile back to its original position on the board
                const errMsg = document.querySelector('.errMsg');
                errMsg.innerHTML = 'No Spaces Between Letters Allowed or Cannot Have 2 Letters In One Slot';  // sets the error message area to this string
                errMsg.style.display = 'block'; // Shows the error message
            
                setTimeout(() => {
                    errMsg.innerHTML = ''; // Clears the error message 
                    errMsg.style.display = 'none'; // Hides the error message
                }, 3000);
            }
        }
    });
});

// sees if the current row is valid (ex no spaces between )
function isRowValid(index) {
    if (!scrabble_Row.join().replace(/,/g, "")) {
        iTaken.push(index);
        return true
    }
    if (index == 0 && scrabble_Row[1] !== '') {
        iTaken.push(index);
        return true
    }
    if (scrabble_Row[index - 1] || scrabble_Row[index + 1]) {
        iTaken.push(index);
        return true
    }
    if (scrabble_Row[index] || iTaken.includes(index)) {
        return false
    }
    return false
}


// finds the score of the current tile board
function findScore(scrabble_Row) {
    let word = scrabble_Row.join().replace(/,/g, "")

    if (word.length >= 2) {
        let wordExists = false;
        for (i = 0; i < dictionaryArr.length; i++) {
            if (dictionaryArr[i][0].toUpperCase() === word.toUpperCase()) {
                wordExists = true;
                break;
            }
        }

        if (wordExists) {
            $("#nextRoundButton").attr('disabled', false);
        } else {
            $("#nextRoundButton").attr('disabled', true);
            const errMsg = document.querySelector('.errMsg');
            errMsg.innerHTML = 'NOT A WORD IN THE DICTIONARY';  // sets the error message area to this string
            errMsg.style.display = 'block'; // Shows the error message
        
            setTimeout(() => {
                errMsg.innerHTML = ''; // Clears the error message 
                errMsg.style.display = 'none'; // Hides the error message
            }, 3000);
        }
        
        if (i == dictionaryArr.length) {
            $("#nextRoundButton").attr('disabled', true);
        }
    } else {
        $("#nextRoundButton").attr('disabled', true); // disables button
    }
    for (let i = 0; i < scrabble_Row.length; i++) {
        if (scrabble_Row[i] != tempRow[i]) {
            // sees if the current tile is a double letter score space
            if (i == 5) {
                score += (ScrabbleTiles[scrabble_Row[i]].value) * 2
                wordScore += (ScrabbleTiles[scrabble_Row[i]].value) * 2 
            } else {
                score += ScrabbleTiles[scrabble_Row[i]].value
                wordScore += (ScrabbleTiles[scrabble_Row[i]].value)
            }
        }
    }
    tempRow = JSON.parse(JSON.stringify(scrabble_Row));
    $('#score').html(`<p>${score}</p>`); // displays the score
}

// Mixes up tiles and adds them to the tile rack
function setUpTileRack(isReset) {
    if (isReset) {
        ScrabbleTiles = JSON.parse(JSON.stringify(originalTiles));
    }
    while ($('.playerRack img').length < 7 || getTilesLeft() < 7) {
        let index = Math.round(Math.random() * 26);
        let currentLetter = tileList[index]
        if (ScrabbleTiles[currentLetter].numRemaining > 0) {
            let newTile = $(`<img id=${$('.playerRack').length-1} src=${ScrabbleTiles[currentLetter]["image"]} class="dragTile" letter=${currentLetter} />`);
            $('.playerRack').append(newTile)
            newTile.draggable({
                revertDuration: 200,
                start: function(event, ui) {
                    $(this).css("z-index", 100);
                    $(this).draggable("option", "revert", "invalid");
                },
            }).each(function() {
                var top = $(this).position().top;
                var left = $(this).position().left;
                $(this).data('orgTop', top);
                $(this).data('orgLeft', left);
                positionArr.push({
                    "orgTop": top,
                    "orgLeft": left
                })
            });
            ScrabbleTiles[currentLetter].numRemaining--
        }
        let remainSum = getTilesLeft()
        $('#remain').html(`<p>${remainSum}</p>`);
    }
}

// gets the number of tiles left
function getTilesLeft() {
    let tilesLeft = 0
    Object.values(ScrabbleTiles).map(item => {
        tilesLeft += item.numRemaining;
    });
    return tilesLeft;
}

// sets up the next round
function nextRound(isReset = false) {
    if (!isReset) {
        $('.dragTile.ui-draggable.ui-draggable-handle').each(function() {
            let isRecycled = 0;
            $.each(this.attributes, function() {
                if (this.name === 'style' && this.value.includes('none')) {
                    isRecycled = 1;
                }
            });
            if (isRecycled === 0) {
                $.each(this.attributes, function() {
                    if (this.name === 'letter') {
                        ScrabbleTiles[this.value].numRemaining++; // adds back tile to the number left
                    }
                });
            }
        });

        // doubles word score if a tile is in the slot
        for (let i = 0; i < scrabble_Row.length; i++) {
            if (scrabble_Row[i] != '') {
                if (i == 1) {
                    let tempWS = wordScore;
                    
                    if(highestScore > 0) {
                        wordScore *= 2;
                        score += wordScore - tempWS;
                    } else {
                        score += score;
                    }
                }
            }
        }

        $('#score').html(`<p>${score}</p>`)
        
        // replaces highest score if the current score is higher
        if (score > highestScore) {
            highestScore = score;
        }
  
        $('#highest').html(`<p>${highestScore}</p>`);
    }
  
    // resets everything
    iTaken = [];
    scrabble_Row = ['', '', '', '', '', '', ''];
    tempRow = ['', '', '', '', '', '', ''];
    wordScore = 0;
  
    $('.playerRack').empty();
    $('.dragTile').remove();
    $("#nextRoundButton").attr('disabled', true);
  
    setUpTileRack(isReset);
}

// does the same this as nextRound function but also changes score back to 0
function newGame() {
    nextRound(true);
    score = 0;
    $('#score').html(`<p>0</p>`);
}

// a helper function fot he blank tile
function blankTileHelper(e) {
    $('#blankTilePicker').empty();
    $('#blankTilePicker').addClass('hideTiles');
    tempTile = e;
    $('#spareBoard').attr("src", ScrabbleTiles[e]["image"]);
    scrabble_Row[tempTileIndex] = e;
    findScore(scrabble_Row);
}