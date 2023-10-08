const endpoint = 'http://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

function addDefinition() {
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    if (!word || !definition || word.trim() === '' || definition.trim() ==='') {
        document.getElementById('output').innerHTML = 'Please input both a word and definition to enter.';
    } else {
        const param = '?word=' + word + "&definition=" + definition;
        const url = endpoint + param;
        let xhttp = new XMLHttpRequest();

        xhttp.open('POST', url, true)
        xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        xhttp.send(post);

        xhttp.onload = function () {
            if(xhttp.status === 200) {
                document.getElementById('output').innerHTML ='Definition successfully saved!';
            }   
        };
    };
}

function getDefinitions() {
    const wordSearch = document.getElementById('wordSearch').value;
    if (!wordSearch || wordSearch.trim() === '') {
        document.getElementById('wordsContainer').innerHTML = 'Please input a word to search';
    } else {
        const param = '?word=' + wordSearch
        const url = endpoint + param;

        let xhttp = new XMLHttpRequest();
        
        xhttp.open('GET', url, true);
        xhttp.send();
        xhttp.onload = function () {
            if(xhttp.status === 200) {
                const response = JSON.parse(this.responseText)
                document.getElementById('wordsContainer').innerHTML = response.definition;
            }
        };
    };
}