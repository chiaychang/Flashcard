
//clozecard constructor
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
}



//create the partial text (subsitute cloze with _____ in full statement)
ClozeCard.prototype.partial = function() {

    var textArray = this.text.split(" ");

    for (var i = 0; i < textArray.length; i++) {
        if (textArray[i] === this.cloze) {
            textArray[i] = "________";
        }
    }
    var partialText = textArray.join(" ");

    console.log(partialText);
}

module.exports = ClozeCard;
