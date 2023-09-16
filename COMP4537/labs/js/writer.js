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
        this.removeButton = document.createElement("button");
        this.removeButton.className = "remove-button";
        this.removeButton.innerText = "Remove";
        // append removeButton to the row div
        this.row.appendChild(this.removeButton);
        this.newline = document.createElement("br");
        this.row.appendChild(this.newline);

        this.textArea.addEventListener('input', () => {
            localStorage.setItem(this.textArea.id, this.textArea.value);
            const timestamp = document.getElementById('time-stamp-written');
            timestamp.innerHTML = 'Stored at: ' + new Date().toLocaleTimeString();
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
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const addNote = new newTextArea(key);
        addNote.fillText(localStorage.getItem(key));
    }
}

function addNote() {
    // create new instance of AddNote class with functionality
    const addNote = new newTextArea(Date.now());
}