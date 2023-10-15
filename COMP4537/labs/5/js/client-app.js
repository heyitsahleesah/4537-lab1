// Some code checked and adapted from chatgpt

// strings for what the user would see
const noQuery = 'Please input a SELECT or INSERT query.';
const invalidCharacters = 'Input contains invalid characters. Please remove them.';
const tryAgain = 'Must only be SELECT or INSERT methods. Please try again';
const unexpected = 'Unexpected status code';
const insertPatientStatement = 'INSERT INTO lab5_table(name, dateOfBirth) VALUES';

// variables to be used
let response; 

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/5/api/v1/sql/';

function insertRows() {
    names = ['Sarah Brown', 'John Smith', 'Jack Ma', 'Elon Musk'];
    birthdays = ['1901-01-01', '1941-01-01', '1961-01-30', '199-01-01'];
    let i = 0;

   if (i < names.length) {
        const param = insertPatientStatement += ' (' + names[i] + ', ' + birthdays[i] + ')';

        // create a new xmlhttprequest
        let xhttp = new XMLHttpRequest();x

        // send POST request
        xhttp.open('POST', endpoint, true)
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(param);

        // check status and display returned message
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                console.log(xhttp.responseText);
                response = JSON.parse(xhttp.responseText);
                // TO DO: update with how the server will respond
                document.getElementById('response').innerHTML = xhttp.responseText.message;
            } else if (xhttp.status === 400) {
                document.getElementById('response').innerHTML = xhttp.responseText.message;
            }  else {
                document.getElementById('response').innerHTML = unexpected + xhttp.status;
            }
        };
        // increment the i count for the next name and birthday 
        i++; 

        // reset the count before i ever gets greater than 4
        if (i === names.length){
            i = 0;
        }
    }
}

function queryDB() {
    // get word from text box
    const sqlQuery = document.getElementById('query').value;

    // Regular expression to disallow numbers and special characters [chatgpt]
    const invalidChars = /[!@#$%^&()_+{}\[\]:;<>,.?~\\\/'"\-=]/;

    // check for empty input
    if (!sqlQuery || sqlQuery.trim() === '') {
        document.getElementById('errorMessage').innerHTML = noQuery;
        // check for invalid characters
    } else if (invalidChars.test(sqlQuery)) {
        document.getElementById('errorMessage').innerHTML = invalidCharacters; 
        //  check if not select or insert
    } else if (!sqlQuery.toLowerCase().startsWith("select") || !sqlQuery.toLowerCase().startsWith("insert")) {
        document.getElementById('errorMessage').innerHTML = tryAgain; 
        //  proceed if input is acceptable
    } else {
        if (sqlQuery.toLowerCase().startsWith("select")) {
            // create param to add to endpoint or query
            const param = encodeURIComponent(sqlQuery);
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
                    document.getElementById('returnMessage').innerHTML = xhttp.responseText.message;
                } else {
                    document.getElementById('returnMessage').innerHTML = xhttp.responseText.message;
                } 
            }
        } else {
            // create a new xmlhttprequest
            let xhttp = new XMLHttpRequest();
            
            const param = encodeURIComponent(sqlQuery);
            console.log(sqlQuery);

            // send POST request
            xhttp.open('POST', endpoint, true)
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(param);

            // check status and display returned message
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    console.log(xhttp.responseText);
                    response = JSON.parse(xhttp.responseText);
                    // TO DO: update with how the server will respond
                    document.getElementById('returnMessage').innerHTML = xhttp.responseText.message;
                } else if (xhttp.status === 400) {
                    document.getElementById('returnMessage').innerHTML = xhttp.responseText.message;
                }  else {
                    document.getElementById('returnMessage').innerHTML = unexpected + xhttp.status;
                }
            };
        }
    }
}
