// Some code checked with chatgpt

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

function addDefinition() {
    // get the word and definition from the html text box and area
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    console.log('word: ', word);
    console.log('definition: ', definition);

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // if (!word || !definition || word.trim() === '' || definition.trim() ==='') {
    //     document.getElementById('output').innerHTML = 'Please input both a word and definition to enter.';
    // } else {
    
    // create params and add to endpoint url for query
    const param = '?word=' + word + "&definition=" + definition;
    const url = endpoint + param;

    // send POST request
    xhttp.open('POST', endpoint, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(param);

    let response; 

    // check status and display returned message
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.responseText);
            response = JSON.parse(xhttp.responseText);
            document.getElementById('output').innerHTML = response.message;
        } else if (xhttp.status === 400) {
            response = JSON.parse(xhttp.responseText);
            document.getElementById('output').innerHTML = "received code: " + xhttp.status + ". " + response.message;
        }  else {
            document.getElementById('output').innerHTML = 'Unexpected status code' + xhttp.status;
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
        if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log('Response from server:', xhttp.responseText);
            const response = JSON.parse(xhttp.responseText)
            // print definition if successful
            document.getElementById('wordContainer').innerHTML = response.definition;
        } else {
            // print error message
            document.getElementById('wordContainer').innerHTML = "received code: " + xhttp.status + ". Please input a word";
        }
    }
}
// } 