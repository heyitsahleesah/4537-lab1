// Some code checked and adapted from chatgpt

// strings for what the user would see
const noQuery = 'Please input a SELECT or INSERT query.';
const invalidCharacters = 'Input contains invalid characters. Please remove them.';
const tryAgain = 'Must only be SELECT or INSERT methods. Please try again.';
const unexpected = 'Unexpected status code ';
const invalidSQL = 'That is an invalid SQL statement. Cannot process.'
let insertPatientStatement = 'INSERT INTO patient(name, dateOfBirth) VALUES';

// variables to be used
let response; 

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/5/api/v1/sql/';

// sends a post call to the server to insert the specified info
function insertRows() {
    // values to be inserted
    let names = ['Sarah Brown', 'John Smith', 'Jack Ma', 'Elon Musk'];
    let birthdays = ['1901-01-01', '1941-01-01', '1961-01-30', '1990-01-01'];
    let patientValues = '';

    // insert all values with each click
   for (let i = 0; i < names.length; i++) {
        patientValues += "('" + names[i] + "', '" + birthdays[i] + "')"
        if (i < names.length -1 ){
        patientValues += ","
        }
   }
    let param = encodeURIComponent(insertPatientStatement += patientValues);
    let url = endpoint + param;

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // send POST request
    xhttp.open('POST', url, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send();

    // check status and display returned message
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.responseText.result);
            let response = JSON.parse(xhttp.responseText);
            // display success
            document.getElementById('response').innerHTML = response.result;
        } else if (xhttp.status === 400) {
            // display any errors
            document.getElementById('response').innerHTML = xhttp.responseText.result;
        }  else {
            document.getElementById('response').innerHTML = unexpected + xhttp.status;
        }
    };
}

// sends a GET or POST request depending on whether INSERT or SELECT was input in the textarea
function queryDB() {
    // get query from text box
    const sqlQuery = document.getElementById('query').value;

    // Regular expression to disallow numbers and special characters [chatgpt]
    const invalidChars = /[!@#$^&_+{}\[\]:;<>.?~\\\/"]/;

    // check for empty input
    if (!sqlQuery || sqlQuery.trim() === '') {
        document.getElementById('returnMessage').innerHTML = noQuery;
        // check for invalid characters
    } else if (invalidChars.test(sqlQuery)) {
        document.getElementById('returnMessage').innerHTML = invalidCharacters; 
        //  check if not select or insert
    } else if (!sqlQuery.toLowerCase().startsWith("select") && !sqlQuery.toLowerCase().startsWith("insert")) {
        document.getElementById('returnMessage').innerHTML = tryAgain; 
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
            console.log(xhttp.send());
            // check for response
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200){
                    console.log('Response from server:', xhttp.responseText);
                    let display = document.getElementById('returnMessage');
                    display.innerHTML = '';
                    let response = JSON.parse(xhttp.responseText)
                    let maxRowsToDisplay = 10; // Set the maximum number of rows to display

                    // parsing all of the rows is code adapted from [chatgpt]
                    response.result.forEach((row) => {
                        let rowElement = document.createElement('div');
                        let content = '';
                        content += `Patient ID: ${row.patientid}, Name: ${row.name}, Date of Birth: ${row.dateOfBirth}`
                        rowElement.textContent = content;
                        // Append the new element to the display element
                        display.appendChild(rowElement);
                    });
                } else if (xhttp.status === 500) {
                    document.getElementById('returnMessage').innerHTML = invalidSQL;
                } else {
                    document.getElementById('returnMessage').innerHTML = unexpected + xhttp.status;
                }
            }
        } else {
            // create a new xmlhttprequest
            let xhttp = new XMLHttpRequest();
            
            const param = encodeURIComponent(sqlQuery);
            let url = endpoint + param;

            // send POST request
            xhttp.open('POST', url, true)
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send();

            // check status and display returned message
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    console.log(xhttp.responseText);
                    let response = JSON.parse(xhttp.responseText);
                    // display on success
                    document.getElementById('returnMessage').innerHTML = response.result;
                    //deterimine display if anything other than 200 shows
                } else if (xhttp.status === 400) {
                    document.getElementById('returnMessage').innerHTML = xhttp.responseText.result;
                } else if (xhttp.status === 500) {
                    document.getElementById('returnMessage').innerHTML = invalidSQL;
                } else {
                    document.getElementById('returnMessage').innerHTML = unexpected + xhttp.status;
                }
            };
        }
    }
}
