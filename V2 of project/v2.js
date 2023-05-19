function createTopBar() {
    const divButtonContainer = document.createElement("div");
    divButtonContainer.classList.add("borderedElements", "topBarBtn");
    divButtonContainer.setAttribute("id", "buttonContainer")
    document.body.appendChild(divButtonContainer);


    const checkFlashCardArray = document.createElement("button");
    checkFlashCardArray.classList.add("topButtons")
    checkFlashCardArray.innerText = "check Array"
    checkFlashCardArray.addEventListener("click", function () {
        console.table(flashCardArray)
    })
    divButtonContainer.appendChild(checkFlashCardArray);








    // const imgHome = document.createElement("img");
    // imgHome.classList.add("homeBtn")
    // imgHome.src = "../images/home.png";
    // imgHome.addEventListener("click", function () {
    //     window.location.href = '../index.html';
    // });
    // divButtonContainer.appendChild(imgHome);


    const downloadButton = document.createElement("button");
    downloadButton.classList.add("topButtons")
    downloadButton.innerText = "download flashcards";
    downloadButton.addEventListener("click", function () { // When you want to pass arguments to an event listener function, you typically need to wrap the function call in an anonymous function, so that the arguments can be properly passed.
        csv = createCSV(flashCardArray);

        downloadCSV(csv, "flash card pack");
    });
    divButtonContainer.appendChild(downloadButton);

    // Save Button
    const saveButton = document.createElement("button");
    saveButton.classList.add("topButtons")
    saveButton.innerText = "save";
    saveButton.addEventListener("click", function () {
        localStorage.setItem("flashCardArray", JSON.stringify(flashCardArray));
        console.log(localStorage)

    })

    divButtonContainer.appendChild(saveButton);





}
function createClearButton() {
    const clearButton = document.createElement("button");
    clearButton.innerText = "clear all flashcards";



    clearButton.addEventListener("click", function () {
        let promptAnswer = prompt(
        `THIS WILL ERASE ALL OF YOUR CURRENT FLASHCARDS, IF YOU UNDERSTAND TYPE: \"I understand\" Note: This will also reload the webpage`)
        let templateFlashCard = new flashCard();
        templateFlashCard.front = "";
        templateFlashCard.back = "";

        if (promptAnswer == "I understand") {


            let newFlashCardArray = [0];

            flashCardArray = newFlashCardArray;
            flashCardArray[0] = templateFlashCard;

            // let rootFlashCard = document.getElementById("flashCardTableRow0");
            // while (rootFlashCard.firstChild) {
            //     rootFlashCard.removeChild(rootFlashCard.firstChild);

            // } 
            // not needed anymore but leaving for now to make sure it doesnt bug

            location.reload();


        }
        else {
            alert("You did not type: \"I understand\" and therefore we have not erased your flashcard ")
        }

    })

    let buttonContainer = document.getElementById("buttonContainer");

    buttonContainer.appendChild(clearButton)


}
function createTableStructure() {
    // Creates all the parts of the table that dont include the actual cells themselves

    const divTableContainer = document.createElement("div");
    divTableContainer.classList.add("borderedElements", 'tabContainer');
    document.body.appendChild(divTableContainer);



    const tableContainer = document.createElement("table");
    tableContainer.classList.add("borderedElements");
    tableContainer.setAttribute("id", "tableContainer")
    divTableContainer.appendChild(tableContainer);


    const headingTableRow = document.createElement("tr");
    headingTableRow.classList.add("borderedElements");
    tableContainer.appendChild(headingTableRow);


    const frontTableHeading = document.createElement("th");
    frontTableHeading.classList.add("borderedElements", 'frontText');
    frontTableHeading.innerHTML = "Front";
    headingTableRow.appendChild(frontTableHeading);

    const backTableHeading = document.createElement("th");
    backTableHeading.classList.add("borderedElements", 'backText');
    backTableHeading.innerHTML = "Back";
    headingTableRow.appendChild(backTableHeading);
}

function flashCard(front, back) {
    this.front = front;
    this.back = back;
}




function createCSV(flashCardArray) {
    // This function creates the CSV file that we will import into anki

    // It does this using a for loop, adding each flashcard to the same variable

    // The comma and \n characters are needed for properly formatting the csv file so that anki can take the import
    let CSVFile = '';
    let currentFlashCard;


    for (let i = 0; i < flashCardArray.length; i++) {
        currentFlashCard = flashCardArray[i];

        // currentFlashCard.front = replaceNewlinesWithBr(currentFlashCard.front);
        // currentFlashCard.back = replaceNewlinesWithBr(currentFlashCard.back);
        currentFlashCard.front = formatQuotesForCSV(currentFlashCard.front);
        currentFlashCard.back = formatQuotesForCSV(currentFlashCard.back);

        CSVFile += `\"${currentFlashCard.front}\",\"${currentFlashCard.back}\"\n`;
    }



    return CSVFile;
}

function formatQuotesForCSV(flashCardText){

    flashCardText = flashCardText.replace(/"/g, '""');


    return flashCardText;
}


function downloadCSV(csv, filename) {
    // Downloads the CSV file to the computer

    // gpt carried me with this function, ill make a better personal version once I know more about downlaoding with JS and Blob data objects
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);

    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", filename);
    tempLink.click();
}

function createFlashCardArray(size) {
    // even though we pass the flashcards back in, we still set templateFlashCard equal to the array index always, in order to prevent overwriting front or back sides of flashcards
    // and therefore we need to create the array with flashcards, instead of just creating an empty array
    let flashCardTemplate;





    const flashCardArray = [size];
    for (let i = 0; i < size; i++) {


        flashCardTemplate = new flashCard();
        flashCardTemplate.front = "";
        flashCardTemplate.back = "";
        flashCardArray[i] = flashCardTemplate;

    }


    return flashCardArray;
}


function restoreData() {


    if (!localStorage.flashCardArray) {
        flashCardArray = createFlashCardArray(1);
    }
    else {
        serverDataContainer = localStorage.getItem("flashCardArray");
        serverDataContainer = JSON.parse(serverDataContainer);
        flashCardArray = serverDataContainer;

    }
}


function addRootFlashCardToPage() {
    let tableCellFront;
    let tableCellBack;
    let frontInputCell;
    let backInputCell;
    let currentFlashCard;
    let flashCardNumberDisplay;
    let utilityButton; //called this because later I'll add more features to it




    tableRow = document.createElement("tr");
    tableRow.classList.add("borderedElements");
    tableRow.addEventListener("keydown", newFlashCardShortCut);
    document.getElementById("tableContainer").appendChild(tableRow);
    tableRow.setAttribute("id", `flashCardTableRow0`);



    flashCardNumberDisplay = document.createElement("div");  //change to span if needed
    flashCardNumberDisplay.innerText = `${flashCardNumber + 1}`;  // +1 because we want to count our flashcards from 1 not 0, I could change the base way we slice ids, and count from 0 instead, but Im scared to break it
    tableRow.appendChild(flashCardNumberDisplay);


    utilityButton = document.createElement("button");
    utilityButton.innerText = "utility button";
    utilityButton.classList.add("utilityButtons")
    utilityButton.id = `utilityButton${flashCardNumber}`
    utilityButton.addEventListener("click", function copyForGPT(event) {
        let utilityButtonNumber = event.target.id;
        let flashCardNumber = utilityButtonNumber.slice(13)

        let frontField = document.getElementById(`flashCardFrontNumber${flashCardNumber}`).value;
        let backField = document.getElementById(`flashCardBackNumber${flashCardNumber}`).value;

        let textToCopy = `Is the following flashcard true or false? : ${frontField} ${backField}`;
        navigator.clipboard.writeText(textToCopy);


        setTimeout(function () {
            window.open("https://chat.openai.com/", "_blank");
        }, 1);
        // The above function is so that the window doesnt open instantly, since if it opens instantly the text wont be copied to the clipboard, the 1 represents 1 milisecond
    });
    tableRow.appendChild(utilityButton);



    // Creates the front table cell
    tableCellFront = document.createElement("td");
    tableCellFront.classList.add("borderedElements", "tableCells", "frontTabCell");
    tableRow.appendChild(tableCellFront);



    // Creates the back table cell
    tableCellBack = document.createElement("td");
    tableCellBack.classList.add("borderedElements", "tableCells", "backTabCell");
    tableRow.appendChild(tableCellBack);

    // It does this in case the flashCardArray contains cards saved to local storage
    currentFlashCard = flashCardArray[flashCardNumber];


    /* Creates the inputCell to put inside the front cell 
    Also sets the front inputCells to any saved flashcards*/
    frontInputCell = document.createElement("textarea");
    frontInputCell.classList.add("frontInpCell")
    frontInputCell.setAttribute("type", "text");
    frontInputCell.setAttribute("id", `flashCardFrontNumber${flashCardNumber}`);
    frontInputCell.addEventListener("input", modifyFlashCardArray);
    frontInputCell.addEventListener("input", function newLineCharacterFormula(event) {
        function countNewLines(str) {
            let matches = str.match(/\n/g);
            return matches ? matches.length : 0;
        }


        let frontInputCellValue = event.target.value;


        let newLineCount = countNewLines(frontInputCellValue);

        let expectedWidth = 0;
        for (let i = 0; i < 100; i++) {

        }




    })
    frontInputCell.value = currentFlashCard.front;
    tableCellFront.appendChild(frontInputCell);


    /* Creates the inputCell to put inside the back cell 
    Also sets the back inputCells to any saved flashcards*/
    backInputCell = document.createElement("textarea");
    backInputCell.classList.add("backInpCell")
    backInputCell.setAttribute("type", "text");
    backInputCell.setAttribute("id", `flashCardBackNumber${flashCardNumber}`);
    backInputCell.addEventListener("input", modifyFlashCardArray);
    backInputCell.value = currentFlashCard.back;
    tableCellBack.appendChild(backInputCell);




    flashCardNumber++;
    tableRowNumber++;

}


function newFlashCardShortCut(event) {

    if (event.ctrlKey && event.code === 'Enter') {
        addNewFlashCardToPage();








    }

}




function addNewFlashCardToPage() {
    let tableCellFront;
    let tableCellBack;
    let tableRow;
    let frontInputCell;
    let backInputCell;
    let currentFlashCard;
    let blankFlashCard;





    tableRow = document.createElement("tr");
    tableRow.classList.add("borderedElements");
    tableRow.addEventListener("keydown", newFlashCardShortCut);
    document.getElementById("tableContainer").insertBefore(tableRow, document.getElementById(`flashCardTableRow${tableRowNumber}`));



    flashCardNumberDisplay = document.createElement("div");  //change to span if needed
    flashCardNumberDisplay.innerText = `${flashCardNumber + 1}`;
    tableRow.appendChild(flashCardNumberDisplay);

    utilityButton = document.createElement("button");
    utilityButton.innerText = "utility button";
    utilityButton.classList.add("utilityButtons")
    utilityButton.id = `utilityButton${flashCardNumber}`
    utilityButton.addEventListener("click", function copyForGPT(event) {
        let utilityButtonNumber = event.target.id;
        let flashCardNumber = utilityButtonNumber.slice(13)

        let frontField = document.getElementById(`flashCardFrontNumber${flashCardNumber}`).value;
        let backField = document.getElementById(`flashCardBackNumber${flashCardNumber}`).value;

        let textToCopy = `Is the following flashcard true or false? : ${frontField} ${backField}`;
        navigator.clipboard.writeText(textToCopy);


        setTimeout(function () {
            window.open("https://chat.openai.com/", "_blank");
        }, 1);
        // The above function is so that the window doesnt open instantly, since if it opens instantly the text wont be copied to the clipboard, the 1 represents 1 milisecond
    });
    tableRow.appendChild(utilityButton);



    tableCellFront = document.createElement("td");
    tableCellFront.classList.add("borderedElements", "tableCells", "frontTabCell");
    tableRow.appendChild(tableCellFront);

    tableCellBack = document.createElement("td");
    tableCellBack.classList.add("borderedElements", "tableCells", "backTabCell");
    tableRow.appendChild(tableCellBack);

    // It does this in case the flashCardArray contains cards saved to local storage

    if (flashCardArray[flashCardNumber] == undefined) {
        blankFlashCard = new flashCard("", "");
        flashCardArray.push(blankFlashCard);
    }


    currentFlashCard = flashCardArray[flashCardNumber];


    /* Creates the inputCell to put inside the front cell 
    Also sets the front inputCells to any saved flashcards*/
    frontInputCell = document.createElement("textarea");
    frontInputCell.classList.add("frontInpCell")
    frontInputCell.setAttribute("type", "text");
    frontInputCell.setAttribute("id", `flashCardFrontNumber${flashCardNumber}`);
    frontInputCell.addEventListener("input", modifyFlashCardArray);
    frontInputCell.value = currentFlashCard.front;

    frontInputCell.addEventListener('input', function() {
        autoResize(frontInputCell);
    }, false);
    tableCellFront.appendChild(frontInputCell);


    /* Creates the inputCell to put inside the back cell 
    Also sets the back inputCells to any saved flashcards*/
    backInputCell = document.createElement("textarea");
    backInputCell.classList.add("backInpCell")
    backInputCell.setAttribute("type", "text");
    backInputCell.setAttribute("id", `flashCardBackNumber${flashCardNumber}`);
    backInputCell.addEventListener("input", modifyFlashCardArray);
    backInputCell.value = currentFlashCard.back;
    backInputCell.addEventListener('input', function() {
        autoResize(backInputCell);
    }, false);
    tableCellBack.appendChild(backInputCell);


    document.getElementById(`flashCardFrontNumber${flashCardNumber}`).focus();
    flashCardNumber++;
    tableRowNumber++;



}

function modifyFlashCardArray(event) {

    let idNumber;
    let templateFlashCard = new flashCard();





    if (this.id.includes("Front")) {
        idNumber = this.id.slice(20);
        templateFlashCard = flashCardArray[idNumber]; // this is so that we dont overwrite the back part of the card when we pass the templateFlashCard into the array
        templateFlashCard.front = event.target.value; // take input text and sets it as the front of the flashcard
        flashCardArray[idNumber] = templateFlashCard; // then finally pass the new flashcard into the array


    }
    else if (this.id.includes("Back")) {
        idNumber = this.id.slice(19);
        templateFlashCard = flashCardArray[idNumber]; // this is so that we dont overwrite the front  part of the card when we pass the templateFlashCard into the array
        templateFlashCard.back = event.target.value; // take input text and sets it as the front of the flashcard
        flashCardArray[idNumber] = templateFlashCard;// then finally pass the new flashcard into the array
    }




}


function createFlashCardTable() {
    addRootFlashCardToPage();


    for (let i = 0; i < flashCardArray.length; i++) {
        testFlashCard = flashCardArray[i];
        if (testFlashCard.front != "" || testFlashCard.back != "") {
            addNewFlashCardToPage();
        }


    }
}



function createTitleName(){
    const titleName = document.createElement('h1')
    titleName.classList.add('mainTitle')
    titleName.innerText = 'DD'
    document.body.appendChild(titleName);
}

let flashCardArray;
let flashCardNumber = 0;
let tableRowNumber = 0;
let testFlashCard;

createTopBar();
createClearButton();
createTableStructure();
restoreData();


createFlashCardTable()





window.addEventListener("beforeunload", function (event) {
    // This block  makes it so that whenever you close the webpage, all the data gets saved

    localStorage.setItem("flashCardArray", JSON.stringify(flashCardArray));
})



// gpt carried somewhat here :((((())))) but the rest of the features were mine bitch

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';





}

window.onload = function() {
    var textareas = document.querySelectorAll('textarea');

    

    textareas.forEach(function(textarea) {
        autoResize(textarea);
        textarea.addEventListener('input', function() {
            autoResize(textarea);
        }, false);
    });
};




// highlight the current thing youre on with blue
// auto insert ? after each front card question when you download the csv
// have an animation happen each time you make a new card, but make the animation cycle randomly through a set of possible animations
// and let the user change font type with a drop down menu
