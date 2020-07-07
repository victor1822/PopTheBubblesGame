# PopTheBubblesGame
A simple game made to practice the DOM manipulation, destrictions on objects to create new variables in a simple way, promises, events of clicking  and page load, etc. Feel free to play Pop Boubles as much as you can and make any suggestions on its future upgrades!

## Link to github Pages, so you can play it whenever you want!
https://victor1822.github.io/PopTheBoublesGame/

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
That adds bombs and bubbles randomly for a certain ammount of time (250*200 ms = 50,000.00 ms = 50 s) as you can see at the next picture:
![image](https://user-images.githubusercontent.com/30930332/86833499-f99de980-c06f-11ea-9728-ba988d1a43f3.png)