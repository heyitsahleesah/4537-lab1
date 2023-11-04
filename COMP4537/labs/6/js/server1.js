// store strings here
const dropdownSelect = 'SELECT DISTINCT language FROM language';
const selectWord = 'SELECT (word, definition, word-language, definition-language) FROM ENTRY WHERE word=';
const noWord = 'Please input both a word and definition. Also select languages for each.';
const emptySearch = 'Please input a word.';
const unexpected = 'Unexpected status code';
const requestString = "Request returned: ";

// create endpoint for both functions
const endpointRoot = 'https://www.wilwscott.com/COMP4537/labs/6';

// endpoints for various calls
const wordDefEndpoint = '/api/v1/definition/';
const getLanguage = '/api/v1/languages/';

// use sql to populate the dropdown menu of available languages
function updateDropdown() {
    // url to send with get
    const url = endpointRoot + getLanguage + dropdownSelect;

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
            let defLanguageDisplay = document.getElementById('definition-languages');
            defLanguageDisplay.innerHTML = '';
            let wordLanguageDisplay = document.getElementById('word-languages');
            wordLanguageDisplay.innerHTML = '';
            let response = JSON.parse(xhttp.responseText)

            // parsing all of the rows is code adapted from [chatgpt]
            response.result.forEach((lingo) => {
                let optionElement = document.createElement('option');
                // set the value and content of dropdown languages to languages from SQL
                optionElement.value = lingo.language;
                optionElement.textContent = lingo.language;
                // Append the new element to the display element
                defLanguageDisplay.appendChild(optionElement);
                wordLanguageDisplay.appendChild(optionElement);
            });
        }
    }
}

function getDefinitions() {
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
      const defLanguage = document.getElementById('definitionLanguages').value;
      
  
      // create a new xmlhttprequest
      let xhttp = new XMLHttpRequest();
  
      if (!word || !definition || !wordLanguage || !defLanguage || word.trim() === '' || definition.trim() ==='') {
          document.getElementById('output').innerHTML = noWord;
      } else {
          // create params and add to endpoint url for query
          const param = `INSERT (${word}, ${definition}, ${wordLanguage}, ${defLanguage}) INTO ENTRY`;
          const url = endpointRoot + wordDefEndpoint + param;
  
          // send POST request
          xhttp.open('POST', url, true)
          xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          xhttp.send();
  
          // check status and display returned message
          xhttp.onreadystatechange = function () {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  console.log(xhttp.responseText);
                  let response = JSON.parse(xhttp.responseText);
                  document.getElementById('output').innerHTML = requestString + "<br> word: " + response.word + "<br> definition: " + response.definition + "<br> word language: " + response.word_language + "<br> definition language: " + response.definition_language + "<br> entry number: " + response.total;
              } else if (xhttp.status === 400) {
                  document.getElementById('output').innerHTML = xhttp.responseText.message;
              }  else {
                  document.getElementById('output').innerHTML = unexpected + xhttp.status;
              }
          };
      }
}