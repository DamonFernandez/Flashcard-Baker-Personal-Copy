/*
Home page table creator: 

  

- actually that makes more sense, I could have a homepage where you can create multiple flash card tables
- Then you can pick and choose which ones you want to open, very useful if you have different tables 
- And while creating a new table you can choose the type of card you'll be creating, so if normal no cloze delete shortcut, but if its a cloze delete deck add a cloze delete shortcut


 - So I'll make it look exactly like sheets, meaning i'll just make a table like this:  https://docs.google.com/spreadsheets/u/0/
 - Then I'll let the user add tags to their flashcard sheets
- I'll include the search bar at the top too


- Then




// 
*/

function createTitleName(){
    const titleName = document.createElement('h1')
    titleName.classList.add('mainTitle')
    titleName.innerText = 'DD'
    document.body.appendChild(titleName);
}

function createTopBar(){
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("borderedElements");
    document.body.appendChild(buttonContainer);
    

    const addButton = document.createElement("button");
    addButton.innerText = "Create new spreadsheet"
    
    addButton.addEventListener("click", function(){

        console.log("test");



        let flashCardArrayID = Math.floor(Math.random() * 10000);


        window.location.href = "flashcardSheet/flashcardSheet.html";

        

        // newPage.onload = function(){
        //     newPage.document.write
        // }



    })
    buttonContainer.appendChild(addButton);

}





function  createTableStructure(){
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("borderedElements");
    tableContainer.innerText = "tableContainer"
    document.body.appendChild(tableContainer);




    const headingTableRow = document.createElement("tr");
    headingTableRow.classList.add("borderedElements");
    tableContainer.appendChild(headingTableRow);



    let nameHeading = document.createElement("th");
    nameHeading.innerText = "Name";
    nameHeading.classList.add("borderedElements");
    headingTableRow.appendChild(nameHeading);
    

    let lastOpenedHeading = document.createElement("th");
    lastOpenedHeading.innerText = "Last opened";
    lastOpenedHeading.classList.add("borderedElements");
    headingTableRow.appendChild(lastOpenedHeading);


    let tableRow = document.createElement("tr");
    tableRow.classList.add("borderedElements");
    tableContainer.appendChild(tableRow);
    



    let nameTableCell = document.createElement("td");
    nameTableCell.innerText = "test name";
    nameTableCell.classList.add("borderedElements");
    tableRow.appendChild(nameTableCell);
    



    let spreadSheetLink = document.createElement("a");
    // spreadSheetLink.href = 

    // make this work once you know how to add new webpages




    let lastOpenedCell = document.createElement("td");
    lastOpenedCell.classList.add("borderedElements")
    lastOpenedCell.innerText = "April 3: 2:44 PM";
    tableRow.appendChild(lastOpenedCell);







    


    


}

createTitleName();

createTopBar();

createSearchBar();

createTableStructure();


