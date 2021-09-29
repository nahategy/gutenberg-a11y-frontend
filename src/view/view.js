import HelperService from "../services/helper.service";

class ViewRule {
    nextButton;
    prevButton;
    currentNumber = 0;
    currentFaliedNumber = 0;
    errors = [];
    errors_element;
    errornumbersContainer;
    rulename;
    form_container;


    next(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.errors.length) {
            this.currentNumber++;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainer.innerHTML = `${this.currentNumber + 1} / ${this.errors.length}`;
            this.errors_element.innerHTML = this.errors[this.currentNumber].error_description;
            //this.errors_element.innerHTML = this.errors[this.currentNumber].errors_element;
            this.rulename.innerHTML = this.errors[this.currentNumber].name;
            this.form_container.innerHTML = '';
            this.form_container.appendChild(current_error.form());
            var div = document.getElementById('.repair_div');
        }
    }

    prev(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentNumber--;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainer.innerHTML = `${this.currentNumber + 1} / ${this.errors.length}`;
            this.errors_element.innerHTML = this.errors[this.currentNumber].error_description;
            this.rulename.innerHTML = this.errors[this.currentNumber].name;
            this.form_container.innerHTML = '';
            this.form_container.appendChild(current_error.form());
            var div = document.getElementById('.repair_div');
        }
    }


    function_hello(failed_rules) {
        // Mindig teljes hiba listát adunk át.
        this.errors = failed_rules;
        if (this.errors.length == 0) {
            return false;
        }
        this.create_side_bar(this.errors.length);

        return true;
    }

    create_side_bar(numberOfErrors) {
        var current_error = this.errors[this.currentNumber];

        var div = document.createElement("div");
        div.classList.add("sidebar");
        div.classList.add("accessibility-container");
        div.setAttribute("id", "sidebar");
        div.classList.add("container");
        var element = document.createElement("h4");
        element.innerHTML = "Accessibility Checker";
        div.appendChild(element);
        element = document.createElement("label");
        element.innerHTML = "Block   ";
        this.errornumbersContainer = document.createElement("span");
        element.appendChild(this.errornumbersContainer);
        this.errornumbersContainer.innerHTML = (this.currentNumber + 1) + " / " + numberOfErrors;
        div.appendChild(element);
        this.rulename = document.createElement('div');
        this.rulename.classList.add('rulename');
        this.rulename.innerHTML = current_error.name;
        div.appendChild(this.rulename);
        this.errors_element = document.createElement("span");
        element.appendChild(this.errors_element);
        this.errors_element.innerHTML += current_error.error_description;
        this.errors_element.classList.add("d-block");
        div.appendChild(element);
        this.form_container = document.createElement('div');
        this.form_container.classList.add('form-container');
        console.log('current numb create side bar :', this.currentNumber);
        this.form_container.appendChild(current_error.form());
        div.appendChild(this.form_container);
        var button_container = document.createElement('div');
        button_container.classList.add('button-container');
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "Prev";
        this.prevButton.classList.add("prev");
        this.prevButton.onclick = this.prev.bind(this);
        button_container.appendChild(this.prevButton);
        this.nextButton = document.createElement("button");
        this.nextButton.innerHTML = "Next";
        this.nextButton.classList.add("next");
        this.nextButton.onclick = this.next.bind(this);
        button_container.appendChild(this.nextButton);
        if (numberOfErrors > 1)
            div.appendChild(button_container);
        document.body.appendChild(div);


        var close_button_text = "<button type=\"button\" tabindex=\"0\"\n" +
            "        style=\"margin: 0px; cursor: pointer;\">X\n" +
            "</button>";


        var close_button = document.createElement("div");
        close_button.setAttribute("class", "close-button");
        close_button.setAttribute("id", "closeButton");
        HelperService.language.get_translation("Close accessibility checker").then(function (res) {
            close_button.title = res;
        })
        close_button.innerHTML = close_button_text;
        close_button.addEventListener('click', this.hide_view);
        document.getElementById('sidebar').appendChild(close_button);
    }

    hide_view = () => {
        var x = document.getElementById("sidebar").remove();
    }

}

export default ViewRule;

