function addDefinition() {
    const word = document.getElementById('word');
    const definition = document.getElementById('definition');
    const endpoint = 'https://alissalg-fd0c12a35b34.herokuapp.com/COMP4537/labs/4/api/definitions/';

    let wordObj = {
        word: word,
        definition: definition
    }
    
    let post = JSON.stringify(wordObj);
    let xhttp = new XMLHttpRequest();

    xhttp.open('POST', endpoint, true)
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhttp.send(post);

    xhttp.onload = function () {
        if(xhttp.status === 200) {
            console.log("Definition successfully saved!") 
        }
    }
}