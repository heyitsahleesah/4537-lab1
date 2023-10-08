const endpoint = 'http://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

function addDefinition() {
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    // const definitionWithoutSpaces = definition.replace(' ', '+');
    let xhttp = new XMLHttpRequest();

    if (!word || !definition || word.trim() === '' || definition.trim() ==='') {
        document.getElementById('output').innerHTML = 'Please input both a word and definition to enter.';
    } else {
        const param = '?word=' + word + "&definition=" + definition;
        const url = endpoint + param;


        xhttp.open('POST', url, true)
        xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if(xhttp.status === 200) {
                const response = JSON.parse(this.responseText);
                document.getElementById('output').innerHTML = response;
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
        xhttp.onreadystatechange = function () {
        const response = JSON.parse(this.responseText)
            if(response.status === 200) {
                // const actualDefinition = response.definition.replace('+', ' ');
                document.getElementById('wordsContainer').innerHTML = response.definition;
            } else {
                document.getElementById('wordsContainer').innerHTML = response.message;
            }
        }
    };
} 