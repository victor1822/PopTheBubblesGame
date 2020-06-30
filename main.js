//Function to be called when the element is clicked
function removeBall(element){
    //It removes the element from the DOM three
    document.querySelector("body").removeChild(element);
}

//Function to add a new Element to the Dom Three as a child of the body node
function addBall(){
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

    //Set this positions on the New Ball Element, setting a new atrribute for its css style
    newBall.setAttribute("style","left:"+left+"px; top:"+top+"px; height:"+diameter+"px; width:"+diameter+"px;")
    document.querySelector("body").appendChild(newBall);
}

//function that calls addBall() fuction infinite times in an interval of 250 milliseconds
function initGame(){
    //It will add a new ball to the dom tree every 0.25 seconds
    setInterval(addBall,250)
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
            resolve();
        },1000);
    });
}

changeTo3()
    .then((resposta)=>{
        document.querySelector("#modal .content h1").innerHTML = resposta;
        changeTo2()
            .then((resposta=>{
                document.querySelector("#modal .content h1").innerHTML = resposta;
                changeTo1()
                    .then((resposta)=>{
                        document.querySelector("#modal .content h1").innerHTML = resposta;
                        changeToStart()
                            .then((resposta)=>{
                                document.querySelector("#modal .content h1").innerHTML = resposta;
                                HideModal()
                                    .then(()=>{
                                        document.querySelector("#modal").classList.add("hide");
                                        initGame();
                                    });
                            });
                    });
            }));
    });