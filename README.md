# PopTheBubblesGame
A simple game made to practice the DOM manipulation, destrictions on objects to create new variables in a simple way, promises, events of clicking  and page load, etc. Feel free to play Pop Boubles as much as you can and make any suggestions on its future upgrades!

## Link to github Pages, so you can play it whenever you want!
https://victor1822.github.io/PopTheBubblesGame/

### Game Workflow - Read HTML file

If you look at the index.html file, you will see that the page should look the same as the image below (aplaying the styling that is on the main.css file)

![image](https://user-images.githubusercontent.com/30930332/86826468-2a2d5580-c067-11ea-8e0b-eccdc94485f4.png)

This is the body tag of the HTML, then the html file loads the main.js, right after loading the body tag on the browser. The main.js faile has our javascript funcions and function calls, promises and so on... that will make the game workflow start.

![image](https://user-images.githubusercontent.com/30930332/86827548-804ec880-c068-11ea-829e-b77c40bc8772.png)

The first functions to be called  is the loadScoresFromStorage() which returns a promise responsable to load the data of scores stored once before on the browser and save that data on a global array named allScores, an array of scores. When that is done, then it runs the callCountdown() function, that runs a set of functions to change the content of the div that contains the text "Get Ready!" To display "3", "2", "1", then "Go!!", insted of "Get Ready", as you can see below... 

![image](https://user-images.githubusercontent.com/30930332/86829749-2a2f5480-c06b-11ea-857e-8b56f416fbe3.png)

#### Those functions simply changes the div contents as follows: 

##### 1) Changes div content from "Get Ready!" to "3"
![image](https://user-images.githubusercontent.com/30930332/86830056-8eeaaf00-c06b-11ea-8279-cbd7ac36d52b.png)

##### 2) Then from "3" to "2"
![image](https://user-images.githubusercontent.com/30930332/86830297-e8eb7480-c06b-11ea-91f6-3772f483cf4a.png)

##### 3) Then from "2" to "1"
![image](https://user-images.githubusercontent.com/30930332/86830490-2223e480-c06c-11ea-8944-dfcbdfe4dcf3.png)

##### 4) Then from "1" to "Go!!"
![image](https://user-images.githubusercontent.com/30930332/86830903-a4140d80-c06c-11ea-8e35-86ac4ac9c0b0.png)

##### 5) Then it calls the function hideModal()
That simply adds a new class to the classlist of the div modal, that adds a display: none to its styling, and makes the page look like this:
![image](https://user-images.githubusercontent.com/30930332/86831871-d70ad100-c06d-11ea-8405-d50198754b6c.png)

##### 6) Then it runs the function initGame()
That function adds bombs and bubbles randomly for a certain ammount of time (250*200 ms = 50,000.00 ms = 50 s) as you can see at the next picture:
![image](https://user-images.githubusercontent.com/30930332/86833499-f99de980-c06f-11ea-9728-ba988d1a43f3.png)

The function "addChoose()" chooses which item is going to be added to the DOM tree, if it's a bomb or a bubble. This function is called by a setInterval (Which defines an interval as you can see in function initGame())
![image](https://user-images.githubusercontent.com/30930332/86908697-54295b00-c0ed-11ea-90f1-f6ba265d225b.png)
This interval ends by clearInterval() that is inside the function addChoose. clearInterval is called when the funcion is called 200 times, that makes 200 intervals of 250 ms (50 seconds of generating bombs and bubbles to the game)
![image](https://user-images.githubusercontent.com/30930332/86908614-33f99c00-c0ed-11ea-891e-4c2afafd0c23.png)
Then the game stops by calling the clearInterval() and it calls the next workflow that is triggered by the function stopGameAndDisplayScore(), that does exactly as it says: displays the score the player reached as you can see on the next image
![image](https://user-images.githubusercontent.com/30930332/86912927-36abbf80-c0f4-11ea-8410-31a83c3cd98e.png)

### How does the scores works?
There are two functions that manipulates the score of the game. The one that is triggered by clicking a bom, or a bubble.
#### If you click on a bomb, it calls the removeBomb() funcition
That function simply change the background image by adding a new class to it's styleSheet (displaying -5 to warn the player that his score just decreased by 5, after it removes the click events from that bomb, so the user can't click on it again until it's removed from the DOM ,then removes the element from the DOM tree. The last but not least thing this function does is decrease the score by 5.
![image](https://user-images.githubusercontent.com/30930332/86914050-049b5d00-c0f6-11ea-9408-c051a1840af1.png)
So, it goes from this: 
![image](https://user-images.githubusercontent.com/30930332/86914569-ebdf7700-c0f6-11ea-9a42-73d154be6cee.png)
To this:
![image](https://user-images.githubusercontent.com/30930332/86914618-ff8add80-c0f6-11ea-9ac0-88879b56134c.png)
Then it's removed from the DOM tree, from the game and changes the score of the game to score - 5, or 0, if the score is less than 5, so we don't display any negative scores.
#### If you click on a bubble, it calls the removeBubble() function
That does something similar to the removeBomb() function, but it doesn't chages the Background propeties, or displays -5, but +1 instead of it, and the last but not least thing it does it's to increase the score by 1. 

### When the game ends
It displays the score, an input and a button, so the user can type his name to create a new score record for the gamme
![image](https://user-images.githubusercontent.com/30930332/86912927-36abbf80-c0f4-11ea-8410-31a83c3cd98e.png)
Clicking on the green button, it calls the function reloadAndDisplayResults() which triggers an workflow that changes the dom tree to another content that displays the list of scores records stored before on the browser he is playing at (the local storage), as you can see on the next image:
![image](https://user-images.githubusercontent.com/30930332/86916830-8ee5c000-c0fa-11ea-9012-68c61224b258.png)
#### When the "Try Again" button is clicked it changes the DOM to it's original form from the html file and restarts the game.

