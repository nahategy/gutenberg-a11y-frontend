import HelperService from "../services/helper.service";
import AbstractRule from "../rules/AbstractRule";
import ARule from "../rules/AbstractRule";
import GC from "../services/GC";

class ViewRule {
    nextButton;
    prevButton;
    currentNumber = 0;
    currentFaliedNumber = 0;
    errors = [];
    errors_element;
    errornumbersContainer;
    rulename;
    link;
    form_container;


    next(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.errors.length) {
            this.currentNumber++;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainer.innerHTML = `${this.currentNumber + 1} / ${this.errors.length}`;
            this.errors_element.innerHTML = this.errors[this.currentNumber].error_description;
            this.rulename.innerHTML = this.errors[this.currentNumber].name;
            this.link.innerText = this.errors[this.currentNumber].link;
            this.form_container.innerHTML = '';
            this.form_container.appendChild(current_error.form());
            var div = document.getElementById('.repair_div');
            document.querySelector('.a11y-highlighter')?.remove();
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
            this.link.innerText = this.errors[this.currentNumber].link;
            this.form_container.innerHTML = '';
            this.form_container.appendChild(current_error.form());
            var div = document.getElementById('.repair_div');
            document.querySelector('.a11y-highlighter')?.remove();
        }
    }


    function_hello(failed_rules) {
        this.errors = failed_rules;
        if (this.errors.length == 0) {
            return false;
        }
        this.create_side_bar(this.errors.length);

        return true;
    }

    create_side_bar(numberOfErrors) {
        GC.runStart();
        document.querySelector('#sidebar')?.remove();

        var current_error = this.errors[this.currentNumber];

        var masikdiv = document.createElement("div");
        masikdiv.classList.add("accessibility-container");

        var div = document.createElement("div");
        div.classList.add("sidebar");
        div.setAttribute("id", "sidebar");
        div.classList.add("container");
        var element = document.createElement("h3");
        element.className = 'accessibilityHeader';
        element.innerHTML = "Accessibility Checker";
        div.appendChild(element);
        element = document.createElement("label");
        element.innerHTML = "Rule  ";
        this.errornumbersContainer = document.createElement("span");
        element.appendChild(this.errornumbersContainer);
        this.errornumbersContainer.innerHTML = (this.currentNumber + 1) + " / " + numberOfErrors;
        div.appendChild(element);
        this.rulename = document.createElement('div');
        this.rulename.classList.add('rulename');
        div.appendChild(this.rulename);
        this.rulename.innerHTML = current_error.name;
        this.errors_element = document.createElement("span");
        element.appendChild(this.errors_element);
        // this.errors_element.innerHTML += this.rulename;
        //this.errors_element.appendChild(this.rulename);
        this.errors_element.innerHTML += current_error.error_description;
        this.errors_element.classList.add("d-block");
        div.appendChild(element);
        let descDiv = document.createElement('div');
        descDiv.className = 'errDescDiv';
        descDiv.innerHTML = '<div class="rulename">WCAG description:</div>';
        this.link = document.createElement('a');
        this.link.href = current_error.link;
        this.link.className = 'ruleLink';
        this.link.target = '_blank';
        this.link.innerText = current_error.link;
        descDiv.appendChild(this.link);
        div.appendChild(descDiv);
        let line = document.createElement('hr');
        div.appendChild(line);


        this.form_container = document.createElement('div');
        this.form_container.classList.add('form-container');
        this.form_container.appendChild(current_error.form());
        div.appendChild(this.form_container);
        var button_container = document.createElement('div');
        button_container.classList.add('button-container');
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "Prev Rule";
        this.prevButton.classList.add("prevRule");
        this.prevButton.onclick = this.prev.bind(this);
        button_container.appendChild(this.prevButton);
        this.nextButton = document.createElement("button");
        this.nextButton.innerHTML = "Next Rule";
        this.nextButton.classList.add("nextRule");
        this.nextButton.onclick = this.next.bind(this);
        button_container.appendChild(this.nextButton);
        let line2 = document.createElement('hr');
        div.appendChild(line2);
        div.appendChild(button_container);
        document.body.appendChild(masikdiv);
        masikdiv.appendChild(div);


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
        document.querySelector('.a11y-highlighter')?.remove();
    }

}

export default ViewRule;

