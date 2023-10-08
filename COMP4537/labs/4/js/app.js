// Some code checked with chatgpt

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

function addDefinition() {
    // get the word and definition from the html text box and area
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // if (!word || !definition || word.trim() === '' || definition.trim() ==='') {
    //     document.getElementById('output').innerHTML = 'Please input both a word and definition to enter.';
    // } else {
    
    // create params and add to endpoint url for query
    const param = '?word=' + word + "&definition=" + definition;
    const url = endpoint + param;

    // send POST request
    xhttp.open('POST', url, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send();

    // check status and display returned message
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            console.log(xhttp.responseText);
        }
        else if(xhttp.status === 200) {
            const response = JSON.parse(xhttp.responseText);
            document.getElementById('output').innerHTML = response.message;
        }   
    };
}
// }

function getDefinitions() {
    // get word from text box
    const wordSearch = document.getElementById('wordSearch').value;
    // if (!wordSearch || wordSearch.trim() === '') {
    //     document.getElementById('wordsContainer').innerHTML = 'Please input a word to search';
    // } else {

    // create param to add to endpoint or query
    const param = '?word=' + wordSearch
    const url = endpoint + param;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();
    
    // send GET request
    xhttp.open('GET', url, true);
    xhttp.send();

    // check for response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4){
            console.log('Response from server:', xhttp.responseText);
        } else if (xhttp.status === 200) {
            const response = JSON.parse(xhttp.responseText)
            // print definition if successful
            document.getElementById('wordContainer').innerHTML = response.definition;
        } else {
            // print error message
            document.getElementById('wordContainer').innerHTML = xhttp.status;
        }
    }
}
// } 