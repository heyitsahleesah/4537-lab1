// Some code checked and adapted from chatgpt

// user strings
const noWord = 'Please input both a word and definition.';
const invalidCharacters = 'Input contains invalid characters. Please remove them.';
const emptySearch = 'Please input a word.';

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/4/api/definitions/';

function addDefinition() {
    // get the word and definition from the html text box and area
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    
    // Regular expression to disallow numbers and special characters [chatgpt]
    const invalidChars = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/'"\-=]/;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    if (!word || !definition || word.trim() === '' || definition.trim() ==='') {
        document.getElementById('output').innerHTML = noWord;
    } else if (invalidChars.test(word) || invalidChars.test(definition)) {
        document.getElementById('output').innerHTML = invalidCharacters; 
    } else {
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
                document.getElementById('output').innerHTML = "Request: " + response.count + "<br>" + response.message;
            } else if (xhttp.status === 400) {
                document.getElementById('output').innerHTML = xhttp.responseText.message;
            }  else {
                document.getElementById('output').innerHTML = 'Unexpected status code' + xhttp.status;
            }
        };
    }
}

function getDefinitions() {
    // get word from text box
    const wordSearch = document.getElementById('wordSearch').value;

    // Regular expression to disallow numbers and special characters [chatgpt]
    const invalidChars = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/'"\-=]/;

    // check for empty input
    if (!wordSearch || wordSearch.trim() === '') {
        document.getElementById('wordContainer').innerHTML = emptySearch;
        // check for invalid characters
    } else if (invalidChars.test(wordSearch)) {
        document.getElementById('wordContainer').innerHTML = invalidCharacters; 
        //  proceed if input is acceptable
    } else {
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
                document.getElementById('wordContainer').innerHTML = "Request: " + response.count + "<br>" + response.definition;
            } else {
                document.getElementById('wordContainer').innerHTML = xhttp.responseText.message;
            }
        }
    } 
}