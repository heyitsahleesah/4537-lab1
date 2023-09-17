// strings shown to the user
const timestampUpdatedMessage = 'Updated at: ';

class readText {
    constructor(text){
        // get the container in reader.html for the notes and create a new div
        this.container = document.getElementById('notes-container');
        this.row = document.createElement('div');
        this.row.className = "reader-note";

        // append the text to the new row
        this.container.appendChild(this.row);
        this.row.innerHTML = text;
    }
}

function updateNotes() {
    // call the update contents to display on page load
    updateContents();
    // reload every 2 seconds
    setInterval(() => {
        updateContents();
    }, 2000);
}

// update the note contents from localStorage 
function updateContents(){
    const container = document.getElementById('notes-container');
    // ensure that the container is clear on load
    container.innerHTML = '';
    // get the top right corner timestamp for updating
    const timestamp = document.getElementById('time-stamp-read');
    timestamp.innerHTML = timestampUpdatedMessage + new Date().toLocaleTimeString();
    // iterrate through the keys in localstorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // parse the values in localStorage for each key
        const data = JSON.parse(localStorage.getItem(key))
        // add a new row for each JSON object message
        const addReadNote = new readText(data.message);
    }
}