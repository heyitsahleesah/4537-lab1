// store strings here
const selectWord = 'SELECT (word, definition, word-language, definition-language) FROM ENTRY WHERE word=';
const noWord = 'Please input both a word and definition. Also select languages for each.';
const emptySearch = 'Please input a word.';
const unexpected = 'Unexpected status code';
const requestString = 'Request returned: ';
const patchQuestion = 'Would you like to update the entry?'

// create endpoint for both functions
const endpointRoot = 'https://www.wilwscott.com/COMP4537/labs/6/api/v1/';

// use sql to populate the dropdown menu of available languages
function updateDropdown() {
    let resource = 'languages/'
    // url to send with get
    const url = endpointRoot + resource;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // send GET request
    xhttp.open('GET', url, true);
    xhttp.send();
    // check for response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log('Response from server:', xhttp.responseText);
            // get the dropdown for the options
            let defDrop = document.getElementById('defLanguages');
            defDrop.innerHTML = '';
            let wordDrop = document.getElementById('wordLanguages');
            wordDrop.innerHTML = '';
            let response = JSON.parse(xhttp.responseText)

            // parsing all of the rows is code adapted from [chatgpt]
            for (let result of response) {
                let optionElement = document.createElement('option');
                // set the value and content of dropdown languages to languages from SQL
                optionElement.value = result.language_name;
                optionElement.textContent = result.language_name;
                // Append the new element to the display element
                defDrop.appendChild(optionElement);

                 // Create a new option element for the 'wordLanguages' dropdown [chatgpt]
                let wordOptionElement = optionElement.cloneNode(true);
                wordDrop.appendChild(wordOptionElement);
            }
        }
    }
}

function getDefinition() {
    // get word from text box
    const wordSearch = document.getElementById('wordSearch').value;

    // check for empty input
    if (!wordSearch || wordSearch.trim() === '') {
        document.getElementById('wordContainer').innerHTML = emptySearch;
        // check for invalid characters
    } else if (invalidChars.test(wordSearch)) {
        document.getElementById('wordContainer').innerHTML = invalidCharacters; 
        //  proceed if input is acceptable
    } else {
        // create param to add to endpoint or query
        const param = selectWord + `${wordSearch}`
        const url = endpoint + wordDefEndpoint + param;

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
                document.getElementById('wordContainer').innerHTML = requestString + response.word + '<br>' + response.definition + '<br>' + response.word-language + '<br>' + response.definition-language;
            } else {
                document.getElementById('wordContainer').innerHTML = xhttp.responseText.message;
            }
        }
    } 
}

function addDefinition() {
    // get the word and definition from the html text box and area
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguages').value;
    const defLanguage = document.getElementById('defLanguages').value;

    const data = {
        word: word,
        definition: definition,
        "word_language": wordLanguage,
        "definition_language": defLanguage
    };
    
    const jsonString = JSON.stringify(data);
    console.log(jsonString);

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // create params and add to endpoint url for query
    const url = endpointRoot + 'definition/';

    // send POST request
    xhttp.open('POST', url, true)
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(jsonString);

    // check status and display returned message
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 201) {
            console.log(xhttp.responseText);
            // get the response
            let response = JSON.parse(xhttp.responseText);
            // get the output div
            let outputDiv = document.getElementById('output')
            // get the message
            let returnMessage = response.message + '<br>';
            // get the word entry info 
            let entryInfo = `${requestString} <br> word: ${response.entry.word} <br> definition: ${response.entry.definition} <br> word language: ${response.entry['word_language']} <br> definition language: ${response.entry['definition_language']} <br> entry number: ${response.total}`;
        
            // append all to output div
            outputDiv.appendChild(returnMessage);
            outputDiv.appendChild(entryInfo);

        } else if (xhttp.status === 400 || xhttp.status === 502) {         // certain errors return messages 
            document.getElementById('output').innerHTML = xhttp.responseText.message;
        }  else if (xhttp.status === 409) {         // need to check if user wants to update the database
            document.getElementById('output').innerHTML = `Error: ${xhttp.responseText.error} <br> Message: ${xhttp.responseText.message}`;
            patchDefinition(data)
        } else {
            document.getElementById('output').innerHTML = unexpected + xhttp.status;
        }
    };
}

function patchDefinition(data) {
    let outputDiv = document.getElementById('output');

    // create a yes button
    let yesButton = document.createElement('Button');
    yesButton.textContent = "Yes";
    // yes button functionality to send PATCH request
    yesButton.onclick = function () {
        const jsonString = JSON.stringify(data);
        console.log(jsonString);

        // create a new xmlhttprequest
        let xhttp = new XMLHttpRequest();

        // create params and add to endpoint url for query
        const url = endpointRoot + 'definition/';

        // send POST request
        xhttp.open('PATCH', url, true)
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(jsonString);

        // check status and display returned message
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 201) {
                console.log(xhttp.responseText);
                // get the response
                let response = JSON.parse(xhttp.responseText);
                // get the output div
                let outputDiv = document.getElementById('output')
                // get the message
                let returnMessage = response.message + '<br>';
                // get the word entry info 
                let entryInfo = `${requestString} <br> word: ${response.entry.word} <br> definition: ${response.entry.definition} <br> word language: ${response.entry['word_language']} <br> definition language: ${response.entry['definition_language']} <br> entry number: ${response.total}`;
            
                // append all to output div
                outputDiv.appendChild(returnMessage);
                outputDiv.appendChild(entryInfo);
            }
        }
    }

    // create a no button
    let noButton = document.createElement('Button');
    noButton.textContent = "No";
    // Handle the no functionality
    noButton.onclick = function () {
        areYouSureMessage.style.display = 'none';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    }

    // ask the user if they would like to update
    let areYouSureMessage = document.createElement('p');
    areYouSureMessage.textContent = patchQuestion;
    let space = document.createElement('p').textContent = ' ';

    outputDiv.appendChild(areYouSureMessage);
    outputDiv.appendChild(yesButton);
    outputDiv.appendChild(space);
    outputDiv.appendChild(noButton); 
    document.getElementById('add-button').style.display = 'none';
}