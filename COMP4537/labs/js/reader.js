class readText {
    constructor(text){
        // get the div for the notes and create a new div
        this.container = document.getElementById('notes-container');
        this.row = document.createElement('div');
        this.container.appendChild(this.row);
        this.row.innerHTML = text;
    }
}

function updateNotes() {
    updateContents();
    setInterval(() => {
        updateContents();
    }, 2000);
}

function updateContents(){
    const container = document.getElementById('notes-container');
    container.innerHTML = '';
    const timestamp = document.getElementById('time-stamp-read');
    timestamp.innerHTML = 'Updated at: ' + new Date().toLocaleTimeString();
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key))
        const addReadNote = new readText(data.message);
    }
}