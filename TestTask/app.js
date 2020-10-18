document.getElementById('wordLengthFilterButton').addEventListener('click', filterByNumber);
document.getElementById('substringFilterButton').addEventListener('click', filterBySubstring);
document.getElementById('textInput').addEventListener('input', hideFormAlert);

function filterBySubstring() {
    let input = document.getElementById('textInput').value;
    let URL = 'https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json';
    if (input === "" || input == null) {
        return setAlert("Type smth first");
    }
    let outputArea = document.getElementById('textOutput');
    let filteredArray = [];

    fetchData(URL)
        .then(data => {
            let checkBox = document.getElementById('caseToggle');
            data.map(function (pet) {
                if (checkBox.checked === true) {
                    if (pet.indexOf(input) !== -1) {
                        filteredArray.push(pet);
                    }
                }
                else {
                    if (pet.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
                        filteredArray.push(pet);
                    }
                }
            });
            if (filteredArray.length === 0) {
                outputArea.value = "Nothing found";
            } else {
                console.log(filteredArray);
                outputArea.value = filteredArray.join("\n");
            }
        });
}

function filterByNumber() {
    let input = document.getElementById('textInput').value;
    let URL = 'https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json';
    if (input === "" || input == null) {
        return setAlert("Type smth first");
    }
    let outputArea = document.getElementById('textOutput');
    let numberOfSymbols = convertToNumber(input);
    let filteredArray = [];

    fetchData(URL)
        .then(data => {
            if (numberOfSymbols) {
                data.map(function (pet) {
                    if (pet.length > numberOfSymbols) {
                        filteredArray.push(pet);
                    }
                });
                if (filteredArray.length === 0) {
                    outputArea.value = "Nothing found";
                } else {
                    console.log(filteredArray);
                    outputArea.value = filteredArray.join("\n");
                }
            }
        });
}

function convertToNumber(text) {
    let result = Number(text);
    if (isNaN(result)) {
        console.log('not a number');
        return setAlert("Input is not a number");
    } else if (!Number.isInteger(result)) {
        console.log('not an integer');
        return setAlert("Input is not an integer");
    } else {
        return result;
    }

}

function hideFormAlert() {
    let formAlert = document.getElementById('formAlert');
    let inputWrapper = document.getElementById('inputWrapper');
    formAlert.style.display = "none";
    removeValidationErrorClass(inputWrapper);
}

function removeValidationErrorClass(element) {
    element.classList.remove("validation-error");
}

function setAlert(text) {
    let inputWrapper = document.getElementById('inputWrapper');

    inputWrapper.dataset.validationMessage = text;
    inputWrapper.classList.add('validation-error');
    return null;
}

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(responseData => responseData.data)
        .catch(error => console.log(error));
}

