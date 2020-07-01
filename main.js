    //CLASSES

// class score created to store the data of the pontuation and associate it with the game players
class Score {
    constructor(name,date,score) {
      this.name = name;
      this.date = date;
      this.pontuation = score;
    }
  }

  //GLOBAL VARIABLES

//variable to store the number of bubbles we've popped! 
var score = 0;
//Variable created to store the interval of time set to call the function addBall
let interval;
//It is a variable that stores a number to limit how many times the function addBalls will be called
let iterations;
//An Array of Scores (The class with name, date and ponctuation)
let allScores = [];
//An Array to store the possible colors to be chosen randomly at the addBall funcion, so it displays balls with random colors
//This Arrays was created so I could choose the colors I want to be possible to appear at the game.
let colorOptions = ["rgba(240, 128, 128, 0.541)","rgba(255, 160, 122, 0.507)","rgba(135, 206, 250, 0.534)","rgba(255, 182, 193, 0.705)","#9279ff8f","rgba(139, 0, 139, 0.541)","rgba(71, 61, 139, 0.658)","rgba(0, 0, 139, 0.459)","rgba(255, 140, 0, 0.473)"];

function loadScores(){
    // Get the older scores stored on the browser at the local storage!
    return new Promise((resolve, reject)=>{
        allScores = JSON.parse(localStorage.getItem('scores_list')) || []; //in case there's nothing at the local storage, load an empty list
        resolve(allScores);
    });
}

function saveScoreToStorage(){
    //save the new scores to the local storage!
    localStorage.setItem('scores_list',JSON.stringify(allScores));
}

//Function to be called when the element is clicked
function removeBall(element){
    //It removes the element from the DOM three
    document.querySelector("body").removeChild(element);
    //When a bubble is popped on the game, the user's score increases by 1
    score++;
}

function chooseRandomColor(){
    var arraySize = colorOptions.length;
    var choice =  Math.floor(Math.random() * arraySize) - 1;
    return colorOptions[choice];
}

//Function to add a new Element to the Dom Three as a child of the body node
function addBall(){
    iterations++;
    //Calculate the viewport dimentions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    //creates a div element 
    let newBall = document.createElement("div");
    //Sets a "class" atribute to the created element with the value "ball"
    newBall.setAttribute("class","ball");
    //Calculate a random number for the ball position on the page, from the top left to the bottom right position of the page.
    var top = Math.floor(Math.random()*viewportHeight);
    var left = Math.floor(Math.random()*viewportWidth);
    //Makes the diamater of the ball be a random number from 30 to 70 px
    var diameter = Math.floor(Math.random()*40) + 30; 
    //Make sure the ball is positioned completely inside the viewport dimentions!
    top = (top+diameter>viewportHeight)?top-diameter:top;
    left = (left+diameter>viewportWidth)?left-diameter:left;
    //Add a attribute onclick, so We can Add a function when the click event occurs at this element
    newBall.setAttribute("onclick","removeBall(this)");

    var color = chooseRandomColor();

    //Set this positions on the New Ball Element, setting a new atrribute for its css style
    newBall.setAttribute("style","left:"+left+"px; top:"+top+"px; height:"+diameter+"px; width:"+diameter+"px; background-color:"+color+";")
    document.querySelector("body").appendChild(newBall);
    //In case the addBall function was called 240 times, stop adding balls
    // if(iterations >= 240){
    if(iterations >= 40){
        clearInterval(interval);
        stopGameAndDisplayScore();
    }
}

//function that calls addBall() fuction infinite times in an interval of 250 milliseconds
function initGame(){
    //It will add a new ball to the dom tree every 0.25 seconds]
    iterations = 0;
    interval = setInterval(addBall,250);
}

// const body = document.querySelector("body");
// body.onload = initGame;
function changeTo3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("3");
        },1000);
    });
}

function changeTo2(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("2");
        },1000);
    });
}

function changeTo1(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("1");
        },1000);
    });
}

function changeToStart(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("GO!!");
        },1000);
    });
}

function HideModal(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.querySelector("#modal").classList.add("hide");
            resolve();
        },1000);
    });
}

function loadScoresOnDiv(){
    const displayUl = document.querySelector("#display ul");
    allScores.sort(function(a, b){
        return b.pontuation-a.pontuation
    })
    for(oneScore of allScores){
        var {name, date, pontuation} = oneScore;
        var novoH4_1 = document.createElement("h4");
        novoH4_1.innerHTML = `${name}`;
        var novoH4_2 = document.createElement("h4");
        novoH4_2.innerHTML = `${pontuation}`;
        var novoH4_3 = document.createElement("h4");
        var dateContent = `${date}`;
        novoH4_3.innerHTML = dateContent; 
        var newLi = document.createElement("li");
        newLi.appendChild(novoH4_1);
        newLi.appendChild(novoH4_2);
        newLi.appendChild(novoH4_3);
        displayUl.appendChild(newLi);
    }
}

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
    //div to display the word "retry"
    let newText = document.createElement("div");
    newText.classList.add("text");
    let newh2 = document.createElement("h2"); 
    newh2.innerHTML = "Try Again";
    newText.appendChild(newh2);
    //an image to the button to make it look good!
    let newImage = document.createElement("div");
    newImage.classList.add("image");
    newBtnDiv.appendChild(newText);
    newBtnDiv.appendChild(newImage);
    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btnGroup");
    btnGroup.onclick = tryAgain;
    btnGroup.appendChild(newBtnDiv);

    //append it all to content3 div
    content.appendChild(newTitle);
    content.appendChild(table);
    content.appendChild(btnGroup);

    modal.appendChild(content);

    loadScoresOnDiv();    
}

function reloadAndDisplayResults(){
    //function to create a new score, store it on the local storage and reload the html to show the list of scores
    // let ThisScore
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

function callCountdown(){
    changeTo3()
    .then((resposta)=>{
        let h1 = document.querySelector("#modal .content h1");
        h1.innerHTML = resposta;
        changeTo2()
            .then((resposta=>{
                h1.innerHTML = resposta;
                changeTo1()
                    .then((resposta)=>{
                        h1.innerHTML = resposta;
                        changeToStart()
                            .then((resposta)=>{
                                h1.innerHTML = resposta;
                                HideModal()
                                    .then(()=>{
                                        initGame();
                                    });
                            });
                    });
            }));
    });
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

loadScores()
    .then(()=>{
        callCountdown();
    })
// callCountdown();