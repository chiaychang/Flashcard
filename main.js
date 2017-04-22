var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var firstGame = true;


//start the game--ask user which type of flashcard they want to create
function start() {
    if (firstGame === true) {
        console.log("(人´∀｀)．☆．。．:*･°\nYaaaay! Welcome to Joy's amazing flashcard game! Let's create some awesome flashcards!");
    }

    inquirer.prompt([{
        type: "list",
        name: "whatCard",
        message: "Which type of flashcard would you want to create?",
        choices: ["Basic Card", "Cloze Card"]
    }]).then(function(results) {
        if (results.whatCard === "Basic Card") {
            createBasic();
            // display
        } else if (results.whatCard === "Cloze Card") {
            createCloze();
            // display
        }
    });

    firstGame = false;
}

//function to create the basic card
function createBasic() {

    //promt user to put in what will be the front/back of card
    inquirer.prompt([{
        name: "BasicFront",
        message: "OK, Let's create a basic flashcard. What would be the question in the front?"
    }, {
        name: "BasicBack",
        message: "What would be the answer in the back?"
    }]).then(function(res) {

        var newBasicCard = new BasicCard(res.BasicFront, res.BasicBack);
        var BasicCardFront = newBasicCard.front;
        var BasicCardBack = newBasicCard.back;
        var BasicCardArray = [BasicCardFront, BasicCardBack];

        fs.appendFile("basic.txt", BasicCardArray, function(err) {
            if (err) {
                return console.log(err);
            }
        });

        // fs.appendFile()

        console.log("A new basic flash card is created!");
        basicDoWhat();

        function basicDoWhat() {

            inquirer.prompt([{
                type: "list",
                name: "BasicDisplay",
                message: "What do you want to do now?",
                choices: ["Display the front of the card.", "Display the back of the card.", "Display both sides.", "Exit game.", "Create another flashcard!"]

            }]).then(function(resl) {
                if (resl.BasicDisplay === "Create another flashcard!") {
                    start();
                } else if (resl.BasicDisplay === "Display the back of the card.") {
                    console.log("❀ Back: " + BasicCardBack);
                    basicDoWhat();
                } else if (resl.BasicDisplay === "Display the front of the card.") {
                    console.log("❀ Front: " + BasicCardFront);
                    basicDoWhat();
                } else if (resl.BasicDisplay === "Display both sides.") {
                    console.log("❀ Front: " + BasicCardFront + "\n❀ Back: " + BasicCardBack);
                    basicDoWhat();
                } else if (resl.BasicDisplay === "Exit game.") {
                    console.log("Bummer! Bye!");
                    connection.end();
                }

            });

        }
    });

}


//function to create cloze card
function createCloze() {
    //prompt user to put in what will be the front/back of card
    inquirer.prompt([{
        name: "ClozeFront",
        message: "Let's create a cloze flashcard! What would be full statement in the front?"
    }, {
        name: "ClozeBack",
        message: "What word in the statement would be the cloze?"
    }]).then(function(res) {
        var ClozeTextArray = res.ClozeFront.split(" ");
        var ClozeExist = false;
        //check is cloze in found in text
        for (var j = 0; j < ClozeTextArray.length; j++) {
            if (ClozeTextArray[j] === res.ClozeBack) {
                ClozeExist = true;
            }
        }
        //if no, ask the question again
        if (ClozeExist === false) {

            console.log("Oooops! Cloze is not found in full text, try again!");
            createCloze();
            //if yese, create the cloze card using promt answers
        } else if (ClozeExist === true) {
            var newClozeCard = new ClozeCard(res.ClozeFront, res.ClozeBack);
            var ClozeCardArray = [res.ClozeFront, res.ClozeBack];
            
            fs.appendFile("cloze.txt", ClozeCardArray, function(err) {
                if (err) {
                    return console.log(err);
                }
            });

            console.log("A new cloze flash card is created!");
            clozeDoWhat();

            function clozeDoWhat() {

                inquirer.prompt([{
                    type: "list",
                    name: "ClozeDisplay",
                    message: "What do you want to do now?",
                    choices: ["Display the full statement.", "Display cloze.", "Display cloze-deleted/partial text.", "Exit game.", "Create another flashcard!"]

                }]).then(function(resl) {
                    if (resl.ClozeDisplay === "Create another flashcard!") {
                        start();
                    } else if (resl.ClozeDisplay === "Display the full statement.") {
                        console.log("❀ Full Text: " + newClozeCard.text);
                        clozeDoWhat();
                    } else if (resl.ClozeDisplay === "Display cloze.") {
                        console.log("❀ Cloze: " + newClozeCard.cloze);
                        clozeDoWhat();
                    } else if (resl.ClozeDisplay === "Display cloze-deleted/partial text.") {
                        console.log("❀ Partial Text: ");
                        newClozeCard.partial();
                        clozeDoWhat();
                    } else if (resl.ClozeDisplay === "Exit game.") {
                        console.log("Bummer! Bye!");
                        connection.end();
                    }

                });

            }

        }


    });

}



start();
