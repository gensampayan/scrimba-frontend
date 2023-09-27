import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const contentEl = document.getElementById("content")
const senderEl = document.getElementById("sender")
const receiverEl = document.getElementById("receiver")
const championListEl = document.getElementById("championList")
// const heartEl = document.getElementById("heart")
contentEl.value = localStorage.getItem("storeChampion")

const appSettings = {
    databaseURL: "https://champions-34da0-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const championTableInDB = ref(database, "championList")

document.getElementById("publish-btn").addEventListener("click", () => {
    let inputValues = {
        contentValue: contentEl.value,
        senderValue: senderEl.value,
        receiverValue: receiverEl.value
    }

    let valuesInString = Object.values(inputValues).join(' ')
    push(championTableInDB, valuesInString)
    localStorage.setItem("storeChampion", valuesInString)
    clearContent()
})

onValue(championTableInDB, (snapshot) => {
    if(snapshot.exists()) {
        let endorsementEntry = Object.entries(snapshot.val())

        clearChampionList()

        for(let i = 0; i < endorsementEntry.length; i++){
            let currentItem = endorsementEntry[i]
            let currentId = currentItem[0]
            let currentValue = currentItem[1]

            // increment(currentItem)
            appendToEndorsementList(currentItem)
        }
    } else {
        championListEl.innerHTML = "No endorsement found."
    }
})

function clearContent() {
    contentEl.value = ""
    senderEl.value = ""
    receiverEl.value = ""
}

function clearChampionList() {
    championListEl.innerHTML = ""
}

/* Tried to implement the user like count but no luck
function increment(item) {
    let itemId = item[0]
    let itemValue = item[1]
    const heartEl = document.getElementById("heart")

    heartEl.addEventListener("click", () => {
      const exactLocationOfItemInDB = ref(`championList/${itemId}`);
  
      exactLocationOfItemInDB.once("value")
        .then((snapshot) => {
          let currentLikes = snapshot.val().likes || 0;
            currentLikes++;
  
          exactLocationOfItemInDB.update({ likes: currentLikes });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }
*/

function appendToEndorsementList(item) {
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.innerHTML = `
        <h4 id="from">From: ${senderEl.value}</h4>
        </br>
        <p id="body">${contentEl.value}</p>
        </br>
        <h4 id="to">To: ${receiverEl.value}</h4> 
        </br>
    `
    /* like icon and value holder in fe
        <i id="heart" class="fa-regular fa-heart">${heartEl.value}</i>
    */

    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database, `championList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    championListEl.append(newEl)
}

// Create a variable to hold the like count
// add event listener to the element that holds the count
// get the location of the db and used update method