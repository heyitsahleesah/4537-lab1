function addDefinition() {
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const endpoint = 'http://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

    let wordObj = {
        word: word,
        definition: definition
    };
    
    let post = JSON.stringify(wordObj);
    let xhttp = new XMLHttpRequest();

    xhttp.open('POST', endpoint, true)
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhttp.send(post);

    xhttp.onload = function () {
        if(xhttp.status === 200) {
            console.log("Definition successfully saved!");
        }
    };
}

function getDefinitions() {
    const wordSearch = document.getElementById('wordSearch').value;
    const param = '?word=' + wordSearch
    const url = endpoint + param;
    
    xhttp.open('GET', url, true);
    xhttp.set();
    xhttp.onload = function () {
        if(xhttp.status === 200) {
            const response = JSON.parse(this.responseText)
            document.getElementById('wordsContainer').innerHTML = response.definition;
        }
    };
}