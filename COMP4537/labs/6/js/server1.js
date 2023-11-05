// store user strings here
const selectWord = 'SELECT (word, definition, word-language, definition-language) FROM ENTRY WHERE word=';
const noWord = 'Please input both a word and definition. Also select languages for each.';
const emptySearch = 'Please input a word.';
const unexpected = 'Unexpected status code';
const requestString = 'Request returned: ';
const patchQuestion = 'Would you like to update the entry?'
const deleteMessage = 'Would you like to delete this entry?'
const yes = 'yes';
const no = 'no';

// create endpoint
const endpointRoot = 'https://www.wilwscott.com/COMP4537/labs/6/api/v1/';

// populate the dropdown menu of available languages
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

// adds definitions based on the user input
function addDefinition() {
    // get the word and definition from the html text box and area, get the languages from dropdowns
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguages').value;
    const defLanguage = document.getElementById('defLanguages').value;

    // create a JSON object with the data
    const data = {
        word: word,
        definition: definition,
        "word_language": wordLanguage,
        "definition_language": defLanguage
    };
    
    // Stringify JSON object for sending
    const jsonString = JSON.stringify(data);
    console.log(jsonString);

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // endpoint url for query
    const url = endpointRoot + 'definition/';

    // send POST request with stringified JSON object
    xhttp.open('POST', url, true)
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(jsonString);

    // check status and display returned message
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            console.log(xhttp.responseText);
            // get the response
            let response = JSON.parse(xhttp.responseText);
            if (xhttp.status === 201) { // if status successful
                // get the output div
                let outputDiv = document.getElementById('output')
                // get the message
                let returnMessage = `${response.message}<br><br>`;
                // get the word entry info 
                let entryInfo = `${requestString} <br> word: ${response.entry.word} <br> definition: ${response.entry.definition} <br> word language: ${response.entry['word_language']} <br> definition language: ${response.entry['definition_language']} <br> entry number: ${response.total}`;
                // append all to output div
                outputDiv.innerHTML = returnMessage + entryInfo;
            } else if (xhttp.status === 400 || xhttp.status === 502) {         // certain errors return messages 
                document.getElementById('output').innerHTML = response.message;
            }  else if (xhttp.status === 409) {         // need to check if user wants to update the database
                document.getElementById('output').innerHTML = `Message: ${response.message}`;
                // call patch function to ask user if they want to update entry
                patchDefinition(data)
            } else {
                // unexpected error
                document.getElementById('output').innerHTML = unexpected + xhttp.status;
            }
        } else {
            console.log('Processing request.');
        }
    };
}

// if the word already exists, check if the user wants to send a PATCH request to update the table
function patchDefinition(data) {
    console.log(data) // check if data sent properly
    let outputDiv = document.getElementById('output');

    // create a yes button
    let yesButton = document.createElement('Button');
    yesButton.textContent = yes;

    // yes button functionality to send PATCH request
    yesButton.onclick = function () {
        const jsonString = JSON.stringify(data);
        console.log(jsonString);

        // create a new xmlhttprequest
        let xhttp = new XMLHttpRequest();

        // endpoint url for query
        const url = endpointRoot + 'definition/';

        // send PATCH request
        xhttp.open('PATCH', url, true)
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(jsonString); // stringified JSON object

        // check status and display returned message
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                console.log(xhttp.responseText);
                // get the response
                let response = JSON.parse(xhttp.responseText);
                if (xhttp.status === 200) { // successful
                // get the output div
                let outputDiv = document.getElementById('output');
                // get the message
                let returnMessage = `${response.message} <br><br>`;
                // get the word entry info 
                let entryInfo = `${requestString} <br> word: ${response.entry.word} <br> definition: ${response.entry.definition} <br> word language: ${response.entry['word_language']} <br> definition language: ${response.entry['definition_language']} <br> entry number: ${response.entry.total}`;
                // append all to output div
                outputDiv.innerHTML = returnMessage + entryInfo;
                document.getElementById('add-button').style.display = ''; // show the add button again so user can add more entries
                } else if (xhttp.status === 400 || xhttp.status === 502) {
                    document.getElementById('output').innerHTML = `Message: ${response["message"]}`;
                }
            }
        }
    }

    // create a no button
    let noButton = document.createElement('Button');
    noButton.textContent = no;
    // Handle the no functionality
    noButton.onclick = function () {
        // toggle display of PATCH options and normal POST options
        areYouSureMessage.style.display = 'none';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        document.getElementById('add-button').style.display = '';
    }

    // ask the user if they would like to update
    let areYouSureMessage = document.createElement('p');
    areYouSureMessage.textContent = patchQuestion;

    outputDiv.appendChild(areYouSureMessage);
    outputDiv.appendChild(yesButton);
    outputDiv.appendChild(noButton); 
    document.getElementById('add-button').style.display = 'none'; // hide add button because not needed
}

// code beyond this point used in search.html

// gets definitions based on the user input
function getDefinition() {
    // get word from text box
    const wordSearch = document.getElementById('wordSearch').value;
 
    const url = endpointRoot + 'definition/' + wordSearch;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();
    
    // send GET request
    xhttp.open('GET', url, true);
    xhttp.send();

    // check for response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            console.log('Response from server:', xhttp.responseText);
            let response = JSON.parse(xhttp.responseText);
          if (xhttp.status === 200) {
            // print definition if successful
            document.getElementById('wordContainer').innerHTML = `${response.message} <br><br> ${requestString} <br> Word: ${response.entry.word} <br> Definition: ${response.entry.definition} <br> Word Language: ${response.entry['word_language']} <br> Definition Language: ${response.entry['definition_language']}`;
            deleteDefinition(response.entry.word); // call function to determine if user wants to delete entry
            } else if (xhttp.status === 400) {
                document.getElementById('wordContainer').innerHTML = response["message"];
            } else {
                document.getElementById('wordContainer').innerHTML = unexpected + response.status;
            }
        } else {
            console.log('Processing request.');
        }
    }
} 

// function called from search.html to delete entry if the user approves
function deleteDefinition(data) {
    let wordContainer = document.getElementById('wordContainer');

    // determine if the user wants to delete the entry
    let deleteQuestion = document.createElement('p');
    deleteQuestion.innerHTML = deleteMessage;

    // create yes button
    let yesButton = document.createElement('Button');
    yesButton.textContent = yes;

    // yes button functionality to send PATCH request
    yesButton.onclick = function () {

        // create a new xmlhttprequest
        let xhttp = new XMLHttpRequest();

        // create params and add to endpoint url for query
        const url = endpointRoot + 'definition/' + data;

        // send POST request
        xhttp.open('DELETE', url, true)
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();

        // check status and display returned message
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) { 
                console.log(xhttp.responseText);
                // get the response
                let response = JSON.parse(xhttp.responseText);
                if (xhttp.status === 200) {          
                    // append all to output div
                    wordContainer.innerHTML = `Message: ${response.message} <br> Total Entries: ${response.total}`;
                    document.getElementById('get-button').style.display = '';
                } else if (xhttp.status === 400 || xhttp.status === 502) {
                    document.getElementById('output').innerHTML = `Message: ${response.message}`;
                }
            }
        }
    }
    // create a no button
    let noButton = document.createElement('Button');
    noButton.textContent = no;
    // Handle the no functionality
    noButton.onclick = function () {
        // toggle display of delete options and search options
        deleteQuestion.style.display = 'none';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        document.getElementById('get-button').style.display = ''
    }

    wordContainer.appendChild(deleteQuestion);
    wordContainer.appendChild(yesButton);
    wordContainer.appendChild(noButton); 
    document.getElementById('get-button').style.display = 'none';
}