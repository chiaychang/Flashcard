var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

//start the game--ask user which type of flashcard they want to create
function start() {

    inquirer.prompt([{
        type: "list",
        name: "whatCard",
        message: "How'd day? Let's create some awesome flashcards! Which type of flashcard would you want to create?",
        choices: ["Basic Card", "Cloze Card", "Display All Cards"]
    }]).then(function(results) {
        if (results.whatCard === "Basic Card") {
            createBasic();
            // display
        } else if (results.whatCard === "Cloze Card") {
            createCloze();
            // display
        }
    });
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
        console.log(newBasicCard.front, newBasicCard.back);
    });
}

//function to create cloze card
function createCloze() {
//prompt user to put in what will be the front/back of card
    inquirer.prompt([{
        name: "ClozeFront",
        message: "OK, Let's create a cloze flashcard. What would be full statement in the front?"
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

            console.log("Cloze is not found in full text, try again!");
            createCloze();
            //if yese, create the cloze card using promt answers
        } else if (ClozeExist === true) {
            var newClozeCard = new ClozeCard(res.ClozeFront, res.ClozeBack);
            console.log(newClozeCard.text, newClozeCard.cloze);
            newClozeCard.partial();

        }


    });

}



start();
