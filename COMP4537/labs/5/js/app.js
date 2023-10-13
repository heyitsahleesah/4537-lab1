// Some code checked and adapted from chatgpt

// create endpoint for both functions
const endpoint = 'https://www.wilwscott.com/COMP4537/labs/5/api/v1/sql/';

function insertRows() {
    names = ['Sarah Brown', 'John Smith', 'Jack Ma', 'Elon Musk'];
    birthdays = ['1901-01-01', '1941-01-01', '1961-01-30', '199-01-01'];
    let count = 0;

    for(leti = count; i < names.length(); i++) {
        sqlInsert = 'INSERT INTO <tablename> VALUES ' + names[i] + ', ' + birthdays[i];
    }

    // create a new xmlhttprequest
    let xhttp = new XMLHttpRequest();

    // create params and add to endpoint url for query
    const param = sqlInsert;
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
            // TO DO: update with how the server will respond
            document.getElementById('response').innerHTML = "Request: " + response.count + "<br>" + response.message;
        } else if (xhttp.status === 400) {
            document.getElementById('output').innerHTML = xhttp.responseText.message;
        }  else {
            document.getElementById('output').innerHTML = 'Unexpected status code' + xhttp.status;
        }
    };
}

function queryDB() {
    // get word from text box
    const sqlQuery = document.getElementById('query').value;

    // Regular expression to disallow numbers and special characters [chatgpt]
    const invalidChars = /[!@#$%^&()_+{}\[\]:;<>,.?~\\\/'"\-=]/;
    

    // check for empty input
    if (!sqlQuery || sqlQuery.trim() === '') {
        document.getElementById('errorMessage').innerHTML = 'Please input a SELECT or INSERT query.';
        // check for invalid characters
    } else if (invalidChars.test(wordSearch)) {
        document.getElementById('errorMessage').innerHTML = 'Input contains invalid characters. Please remove them.'; 
        //  check if select or insert
    } else if (!sqlQuery.toLowerCase().startsWith("select") || !sqlQuery.toLowerCase().startsWith("insert")) {
        document.getElementById('errorMessage').innerHTML = 'Must only be SELECT or INSERT methods. Please try again'; 
        //  proceed if input is acceptable
    } else {
        // create param to add to endpoint or query
        const param = '?word=' + wordSearch
        const url = endpoint + param;

        // create a new xmlhttprequest
        let xhttp = new XMLHttpRequest();
        if (sqlQuery.toLowerCase().startsWith("select")){
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
        } else {
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
                    // TO DO: update with how the server will respond
                    document.getElementById('response').innerHTML = "Request: " + response.count + "<br>" + response.message;
                } else if (xhttp.status === 400) {
                    document.getElementById('output').innerHTML = xhttp.responseText.message;
                }  else {
                    document.getElementById('output').innerHTML = 'Unexpected status code' + xhttp.status;
                }
            };
        }
        
        }
    } 
