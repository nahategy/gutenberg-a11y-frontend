function disableButtonIfInputEmpty(input, button) {
    input.onkeyup = function () {
        button.disabled = input.value === "";
    }
    if (input.value === "") button.disabled = true;
}

function disableButtonIfFalse(input, button, delegate) {
    input.onkeyup = function () {
        button.disabled = !!delegate(input);
    }
    if (input.value === "") button.disabled = true;
}

export {disableButtonIfInputEmpty, disableButtonIfFalse};