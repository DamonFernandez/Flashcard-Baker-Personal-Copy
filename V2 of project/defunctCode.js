function createDeleteFlashCardArrayButton() {
    const deleteFlashCardArrayButton = document.createElement("button");
    deleteFlashCardArrayButton.innerText = "deleteFlashCardArrayButton";



    deleteFlashCardArrayButton.addEventListener("click", function () {
        let blankFlashCard = flashCard("", "");
        for (let i = 0; i < 100; i++) {

            flashCardArray[i] = blankFlashCard;

        }
        console.table(flashCardArray)
    }
    )
    let buttonContainer = document.getElementById("buttonContainer");

    buttonContainer.appendChild(deleteFlashCardArrayButton)


}
// dont need because clear fields works well enough


function replaceNewlinesWithBr(text) {
    // GPT made :(((((((((((())))))))))))
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
}


// dont need because now we just enclose the csv values with double quotes