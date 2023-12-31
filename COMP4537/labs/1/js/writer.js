// strings shown to the user
const timestampStoreMessage = 'Last Stored at: ';
const emptyString = '';

class newTextArea {
    constructor(id) {
        // create the div container for the notes
        this.container = document.getElementById("notes-container");
        this.row = document.createElement("div");
        this.container.appendChild(this.row);

        // create a new text area and remove button
        this.textArea = document.createElement("textarea");
        this.textArea.className = "note";
        this.textArea.id = id;
        this.textArea.value = emptyString;

        // append textArea to the row div
        this.row.appendChild(this.textArea);

        // create a remove button to combine with the textArea
        this.removeButton = document.createElement("button");
        this.removeButton.className = "remove-button";
        this.removeButton.innerText = "Remove";

        // append removeButton to the row div
        this.row.appendChild(this.removeButton);
        this.newline = document.createElement("br");
        this.row.appendChild(this.newline);

        // add eventListener for input for each textArea
        this.textArea.addEventListener('input', () => {
            // create a JSON object for localstorage
            const note = {
                message: this.textArea.value,
                timestamp: Date.now()
            };
            // send updated object to localStorage
            localStorage.setItem(this.textArea.id, JSON.stringify(note));
            // update top right corner time stamp with the most recent stored time
            const timestampElement = document.getElementById('time-stamp-written');
            timestampElement.innerHTML = timestampStoreMessage + new Date(note.timestamp).toLocaleTimeString();
        })
        
        // create event listener for the remove button
        this.removeButton.addEventListener('click', () => {
            // remove the row
            this.row.remove();
            // remove the data from localStorage
            localStorage.removeItem(this.textArea.id);
        });
    }

    // fill the text area with the text
    fillText(text) {
        this.textArea.value = text;
    }
}

// load any JSON objects stored in localStorage when the page opens
function loadStorage() {
    // make an array for any time stamps that exist
    const timestamps = [];
    // check if the localstorage has data stored
    if (localStorage.length > 0) {
        // iterate through the stored keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // parse the JSON object associated with each key
            const data = JSON.parse(localStorage.getItem(key))
            // create a newTextArea for each key
            const addNote = new newTextArea(key);
            // fill the textarea with the input
            addNote.fillText(data.message);
            // add the timestamp for the object to the array
            timestamps.push(data.timestamp);
    }
    // find the most recent time in the timestamps array
    const RecentTime = Math.max(...timestamps);
    // add this as the last time data was stored on the top right
    const timestampElement = document.getElementById('time-stamp-written');
    timestampElement.innerHTML = timestampStoreMessage + new Date(RecentTime).toLocaleTimeString();
    }
}

function addNote() {
    // create new instance of AddNote class with functionality
    const addNote = new newTextArea(Date.now());
}