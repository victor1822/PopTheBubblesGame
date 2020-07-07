//----------------------------->>>> CLASSES

// Class score created to store the data of the punctuation and associate it with the game players
class Score {
    constructor(name,date,score) {
      this.name = name;
      this.date = date;
      this.punctuation = score;
    }
  }

//----------------------------->>>> GLOBAL VARIABLES

//variable to store the number of bubbles we've popped! 
var score = 0;
//Variable created to store the interval of time set to call the function addBubble
let interval;
//It is a variable that stores a number to limit how many times the function addBubbles will be called
let iterations;
//An Array of Scores (The class with name, date and ponctuation)
let allScores = [];
//An Array to store the possible colors to be chosen randomly at the addBubble funcion, so it displays bubbles with random colors
//This Array was created so I could choose the colors I want to be possible to appear at the game.
let colorOptions = ["rgba(240, 128, 128, 0.541)","rgba(255, 160, 122, 0.507)","rgba(135, 206, 250, 0.534)","rgba(255, 182, 193, 0.705)","#9279ff8f","rgba(139, 0, 139, 0.541)","rgba(71, 61, 139, 0.658)","rgba(0, 0, 139, 0.459)","rgba(255, 140, 0, 0.473)"];


//----------------------------->>>> FUNCTIONS RELATED TO THE LOCAL STORAGE

//This function loads the previows data of the game from the browser, so the user can play and compare his score through time
function loadScoresFromStorage(){
    // Get the older scores stored on the browser at the local storage!
    return new Promise((resolve, reject)=>{
        allScores = JSON.parse(localStorage.getItem('scores_list')) || []; //in case there's nothing at the local storage, load an empty array
        resolve(allScores);
    });
}
//This function stores the new score records into the local storage
function saveScoreToStorage(){
    //Save the new scores to the local storage!
    localStorage.setItem('scores_list',JSON.stringify(allScores));
}

//----------------------------->>>> RANDOM FUNCTIONS

//Returns a random color from the colorOptions array
function chooseRandomColor(){
    var arraySize = colorOptions.length;
    var choice =  Math.floor(Math.random() * arraySize) - 1;
    return colorOptions[choice];
}

//Chooses randomly what will be the next element to be added to the dom tree: A bomb or a bubble.
function addChoose(){
    //increments the number of elements added to the dom tree
    iterations++;
    if(Math.floor(Math.random()*20) > 2){
        addBubble();
    } 
    else {
        addBomb();
    }
    //When the number of elements reaches 200, it stops adding elements to the DOM tree and runs the stopGameAndDisplayScore() function 
    if(iterations >= 200){
        clearInterval(interval);
        stopGameAndDisplayScore();
    }
}

//----------------------------->>>> FUNCTIONS OF DOM MANIPULATION TO REMOVE, CHANGE AND ADD ELEMENTS FROM THE DOM TREE

//------------>> Functions to remove elements from the dom three trigged addBomb Function

//This function removes the bubbles from the dom tree, they are trigged on the div.bubble elements by the click event
function removeBubble(element){
    //Just to make sure to this element don't call any function with the mouse event "click" until it's still on the DOM tree
    element.onclick = "";
    //Adds the class "pop" to the classlist, so it could change its styling on the css file until it's still on the DOM tree
    element.classList.add("pop");
    //It removes the element from the DOM three 100ms later
    setTimeout(()=>{
        document.querySelector("body").removeChild(element);
    },100);
    //When a bubble is popped on the game, the user's score increases by 1
    score++;
    console.log(score);
}

//This function removes the bombs from the dom tree and channge the score, they are trigged on the div.bomb elements by the click event
function removeBomb(element){
    //Just to make sure to this element don't call any function with the mouse event "click" until it is removved from the DOM treee
    element.onclick="";
    //Adds the class "boom" to the classlist, so it could change its styling on the css file
    element.classList.add("boom");
    //It removes the element from the DOM three 150ms later
    setTimeout(()=>{
        document.querySelector("body").removeChild(element);
    },150);
    //When a bomb is popped on the game, the user's score increases by 1
    score = (score <= 5) ? 0 : score-5; //The score can't be negative!
    console.log(score);
}

//------------>> Functions to add elements from the dom three trigged addBomb Function

//This function adds a bomb to the DOM tree with a random position and diameter with a onclick event to remove it from the dom tree and change the score
function addBomb(){
    //Calculate the viewport dimentions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    //Creates a div element 
    let newBomb = document.createElement("div");
    //Sets a "class" atribute to the created element with the value "bomb"
    newBomb.setAttribute("class","bomb");
    //Calculate a random number for the bomb position on the page, from the top left to the bottom right position of the page.
    var top = Math.floor(Math.random()*viewportHeight);
    var left = Math.floor(Math.random()*viewportWidth);
    //Makes the diamater of the bomb be a random number from 40 to 80 px
    var diameter = Math.floor(Math.random()*40) + 40; 
    //Make sure the bomb is positioned completely inside the viewport dimentions!
    top = (top+diameter>viewportHeight)?top-diameter:top;
    left = (left+diameter>viewportWidth)?left-diameter:left;
    //Add a attribute onclick, so We can Add a function when the click event occurs at this element
    newBomb.setAttribute("onclick","removeBomb(this)");

    //Set this positions on the New Bubble Element, setting a new atrribute for its css style
    newBomb.setAttribute("style","left:"+left+"px; top:"+top+"px; height:"+diameter+"px; width:"+diameter+"px;")
    document.querySelector("body").appendChild(newBomb);
}

//Function to add a new Element to the Dom Three as a child of the body node
function addBubble(){
    //Calculate the viewport dimentions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    //creates a div element 
    let newBubble = document.createElement("div");
    //Sets a "class" atribute to the created element with the value "bubble"
    newBubble.setAttribute("class","bubble");
    //Calculate a random number for the bubble position on the page, from the top left to the bottom right position of the page.
    var top = Math.floor(Math.random()*viewportHeight);
    var left = Math.floor(Math.random()*viewportWidth);
    //Makes the diamater of the bubble be a random number from 30 to 70 px
    var diameter = Math.floor(Math.random()*40) + 30; 
    //Make sure the bubble is positioned completely inside the viewport dimentions!
    top = (top+diameter>viewportHeight)?top-diameter:top;
    left = (left+diameter>viewportWidth)?left-diameter:left;
    //Add a attribute onclick, so We can Add a function when the click event occurs at this element
    newBubble.setAttribute("onclick","removeBubble(this)");
    //Chosse a random color to set as the bubble's background-color style attrubute
    var color = chooseRandomColor();
    //Set this positions on the New Bubble Element, setting a new atrribute for its css style
    newBubble.setAttribute("style","left:"+left+"px; top:"+top+"px; height:"+diameter+"px; width:"+diameter+"px; background-color:"+color+";")
    document.querySelector("body").appendChild(newBubble);
    //In case the addBubble function was called 200 times, stop adding bubbles
}

//Function to return a promise, that will eventually return the value "3" when it's resolved, after 1 second
function changeTo3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("3");
        },1000);
    });
}

//Function to return a promise, that will eventually return the value "2" when it's resolved, after 1 second
function changeTo2(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("2");
        },1000);
    });
}

//Function to return a promise, that will eventually return the value "1" when it's resolved, after 1 second
function changeTo1(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("1");
        },1000);
    });
}

//Function to return a promise, that will eventually return the value "GO!!" when it's resolved, after 1 second
function changeToStart(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("GO!!");
        },1000);
    });
}

//Function to return a promise, that will eventually return nulll and set a new class to the classList of the #modal div on the DOM tree, when it's resolved, after 1 second
function HideModal(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.querySelector("#modal").classList.add("hide");
            resolve();
        },1000);
    });
}

//This function triggers a sequence of promises so the functions can run synchronously so it changes the same DOM element's innerHTML, displaying a cowntdown from 3 to 1, than displays a message to call the start game function
function callCountdown(){
    changeTo3()
    .then((res)=>{
        let h1 = document.querySelector("#modal .content h1");
        h1.innerHTML = res;
        changeTo2()
            .then((res=>{
                h1.innerHTML = res;
                changeTo1()
                    .then((res)=>{
                        h1.innerHTML = res;
                        changeToStart()
                            .then((res)=>{
                                h1.innerHTML = res;
                                HideModal()
                                    .then(()=>{
                                        initGame();
                                    });
                            });
                    });
            }));
    });
} 

//This function loads the list of scores that is on the array allScores, sorted by punctuation
function loadScoresOnDiv(){
    //Select the element that will contain the list of scores to be displayed and stores it on a const variable named displayUl
    const displayUl = document.querySelector("#display ul");
    //Sorts the array by punctuation
    allScores.sort(function(a, b){
        return b.punctuation-a.punctuation
    })
    for(oneScore of allScores){
        //Desctruction of oneScore to take its name, date and punctuation and use them as a local variable
        var {name, date, punctuation} = oneScore;
        //Create 3 h4 tags with those tree attributes of the object as their innerHTML. One for the name, one for the punctuation, and the last one to the date
        var novoH4_1 = document.createElement("h4");
        novoH4_1.innerHTML = `${name}`;
        var novoH4_2 = document.createElement("h4");
        novoH4_2.innerHTML = `${punctuation}`;
        var novoH4_3 = document.createElement("h4");
        novoH4_3.innerHTML = `${date}`; 
        var newLi = document.createElement("li");
        newLi.appendChild(novoH4_1);
        newLi.appendChild(novoH4_2);
        newLi.appendChild(novoH4_3);
        displayUl.appendChild(newLi);
    }
}

//This function ddisplays the all the scores and a button to try the game again.
function DisplayAllScores(){
    //Creates a reference to a div with id = modal that exists in the DOM Tree!
    let modal = document.querySelector("#modal");
    //Removes all child nodes from modal to create new ones!
    modal.removeChild(document.querySelector("div.content2"));

    //Create a div with a class attrubute =  content3
    let content = document.createElement("div");
    content.classList.add("content3");

    //Create a div for the title, with a class named "title"
    let newTitle = document.createElement("div");
    newTitle.classList.add("title");
    //Create an h1 and append it to the title div
    let newH1 = document.createElement("h1");
    newH1.innerHTML = "All Scores";
    newTitle.appendChild(newH1);

    //Creates a div for the table
    let table = document.createElement("div");
    table.setAttribute("class","table");

    //Create a div for the titles of the list of scores (Name / Socre / Date/Time) with class attrubute named "titles"
    let newTitles = document.createElement("div");
    newTitles.classList.add("titles");
    //Create de 3 titles with class attribute named "h3titles" and 3 h3 to stay inside of its correspondent div node
    let newTitle1 = document.createElement("div");
    newTitle1.classList.add("h3titles");
    let newH3_1 = document.createElement("h3");
    newH3_1.innerHTML = "Name";
    newTitle1.appendChild(newH3_1);
    let newTitle2 = document.createElement("div");
    newTitle2.classList.add("h3titles");
    let newH3_2 = document.createElement("h3");
    newH3_2.innerHTML = "Score";
    newTitle2.appendChild(newH3_2);
    let newTitle3 = document.createElement("div");
    newTitle3.classList.add("h3titles");
    let newH3_3 = document.createElement("h3");
    newH3_3.innerHTML = "Date/Time";
    newTitle3.appendChild(newH3_3);
    //Append those 3 div elements to the main div with class attribute named titles
    newTitles.appendChild(newH3_1);
    newTitles.appendChild(newH3_2);
    newTitles.appendChild(newH3_3);

    //Create a div to display the data stored on the local storage
    let newDisplay = document.createElement("div");
    newDisplay.setAttribute("id","display");
    let newUl = document.createElement("ul");
    newDisplay.appendChild(newUl);

    table.appendChild(newTitles);
    table.appendChild(newDisplay);

    //Create a div to the button to retry
    let newBtnDiv = document.createElement("div");
    newBtnDiv.setAttribute("id","btn-retry");
    //Div to display the word "retry"
    let newText = document.createElement("div");
    newText.classList.add("text");
    let newh2 = document.createElement("h2"); 
    newh2.innerHTML = "Try Again";
    newText.appendChild(newh2);
    //An image to the button to make it look good!
    let newImage = document.createElement("div");
    newImage.classList.add("image");
    newBtnDiv.appendChild(newText);
    newBtnDiv.appendChild(newImage);
    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btnGroup");
    btnGroup.onclick = tryAgain;
    btnGroup.appendChild(newBtnDiv);

    //Append it all to content3 div
    content.appendChild(newTitle);
    content.appendChild(table);
    content.appendChild(btnGroup);

    modal.appendChild(content);
    //Calls the function that loads the list to the DOM Tree
    loadScoresOnDiv();    
}

function stopGameAndDisplayScore(){
    //Get the body elemennt
    let body = document.querySelector("body");
    //Clear the html inside the tag body to clear the bubbles that we didn't pop yet
    body.innerHTML = "";
    //Creates a new DOM Element (h1)
    let newH1 = document.createElement("h1");
    newH1.innerHTML = "Your Score: " + score;
    //Creates a new div.form
    let newInput = document.createElement("input");
    newInput.setAttribute("placeholder","Type your Name in");
    newInput.setAttribute("type","text");
    newInput.setAttribute("id","input-submit")
    //create a button to submit the new score to the list
    let newBtn = document.createElement("button");
    newBtn.setAttribute("id","btn-submit");
    newBtn.onclick = reloadAndDisplayResults;
    //newBtn.innerHTML = "Submit New Score";
    //Create a new div.form
    let newDivForm = document.createElement("div");
    newDivForm.classList.add("form");
    newDivForm.appendChild(newInput);
    newDivForm.appendChild(newBtn);
    //Creates a new div with a class content2 and h1 and div.form as child nodes 
    let newContent = document.createElement("div");
    newContent.classList.add("content2");
    newContent.appendChild(newH1);
    newContent.appendChild(newDivForm);
    //Creates a modal with this two main divs inside it and appends this newModal into the body tag on DOM nodes tree
    let newModal = document.createElement("div");
    newModal.setAttribute("id","modal");
    newModal.appendChild(newContent);
    body.appendChild(newModal);
}

function tryAgain(){
    return new Promise((resolve, reject)=>{
        const modal = document.querySelector("#modal .content3").parentNode;
        //remove div.content3 from modal in the DOM tree to replace it to the original HTML div.content
        modal.removeChild(document.querySelector("#modal .content3"));
        //Create h1 with a inner HTML  "Get Ready!" 
        let newH1 = document.createElement("h1");
        newH1.innerHTML = "Get Ready!";
        //Create a div for the content
        let newContent = document.createElement("div");
        newContent.classList.add("content");
        newContent.appendChild(newH1);
        //appendss this new content to the modal on the DOM tree!!
        modal.appendChild(newContent);
        //Call countdown and init the game again!
        callCountdown();
    });
}

//----------------------------->>>> FUNCTIONS FOR STARTING THE GAME WORKFLOW

//Function that starts the game
function initGame(){
    //It will add a new bubble to the dom tree every 0.25 seconds until the interval blobal variable is cleared.
    iterations = 0;
    interval = setInterval(addChoose,250);
}

//This function is called by click event on a button element. If the inputs are empty, returns an error message, but if it's not empty, it creates a new record of score with that name and adds it to the array allScores, then displays all scores
function reloadAndDisplayResults(){
    if(document.querySelector("#input-submit").value == ""){
        alert("Please, enter the name to save the score properly!!")
    }
    else{
        var date = new Date();
        // var dateString = `${date.toString().slice(0,-37)}`;
        var dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}'${date.getSeconds()}''${date.getMilliseconds()}`;
        let newScore = new Score(document.querySelector("#input-submit").value, dateString, score);
        allScores.push(newScore);
        saveScoreToStorage();
        score = 0;
        DisplayAllScores();
    }
}

//----------------------------->>>> FUNCTION CALLS

//Loads the scores from the storage then starts the coundown to start the game!
loadScoresFromStorage()
    .then(()=>{
        callCountdown();
    });
