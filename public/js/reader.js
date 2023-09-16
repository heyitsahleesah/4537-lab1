class readText {
    constructor(text){
        // get the div for the notes and create a new div
        this.container = document.getElementById('notes-container');
        this.row = document.createElement('div');
        this.container.appendChild(this.row);
        this.row.innerHTML = text;
    }
    
   
        // const currentNotes = [];

        // // pull the text and put it in the new div row
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     if (key.startsWith('note-')) {
        //         const savedText = localStorage.getItem(key);
        //         currentNotes.push(savedText);
        //     }
        // }
    
        // for (const note of currentNotes) {
        //     const noteDiv = document.createElement('div');
        //     noteDiv.textContent = note;
        //     this.row.appendChild(noteDiv);
        // }
    }

function updateNotes() {
    setInterval(() => {
        const container = document.getElementById('notes-container');
        container.innerHTML = '';
        const timestamp = document.getElementById('time-stamp-read');
        timestamp.innerHTML = 'Updated at: ' + new Date().toLocaleTimeString();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const addReadNote = new readText(localStorage.getItem(key));
        }
    }, 2000);
}

// create an instance of readText
const reader = new readText();