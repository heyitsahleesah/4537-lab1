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
        this.textArea.value="";

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

        this.textArea.addEventListener('input', () => {
            const note = {
                message: this.textArea.value,
                timestamp: Date.now()
            }
            localStorage.setItem(this.textArea.id, JSON.stringify(note));
            const timestampElement = document.getElementById('time-stamp-written');
            timestampElement.innerHTML = 'Last Stored at: ' + new Date(note.timestamp).toLocaleTimeString();
        })

        this.removeButton.addEventListener('click', () => {
            this.row.remove();
            localStorage.removeItem(this.textArea.id);
        });
    }

    fillText(text) {
        this.textArea.value = text;
    }
}

function loadStorage() {
    const timestamps = [];
    if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key))
        const addNote = new newTextArea(key);
        addNote.fillText(data.message);
        timestamps.push(data.timestamp);
        // addNote.fillText(localStorage.getItem(key));
    }
    console.log(timestamps)
    const RecentTime = Math.max(...timestamps);
    const timestampElement = document.getElementById('time-stamp-written');
    timestampElement.innerHTML = 'Last Stored at: ' + new Date(RecentTime).toLocaleTimeString();
    }
}

function addNote() {
    // create new instance of AddNote class with functionality
    const addNote = new newTextArea(Date.now());
}