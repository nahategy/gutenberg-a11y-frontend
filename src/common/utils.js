
function disableButtonIfInputEmpty(input, button) {
    input.onkeyup = function () {
        if(input.value ==="")
            button.disabled = true;
        else
            button.disabled = false;

    }
    if (input.value === "")
        button.disabled = true;
}

export {disableButtonIfInputEmpty};