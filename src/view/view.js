class ViewRule {
    nextButton;
    prevButton;
    currentNumber = 0;
    errors = [];
    errors_element;
    errornumbersContainer;
    rulename;

    next(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.errors.length) {
            this.currentNumber++;
            this.errornumbersContainer.innerHTML = `${this.currentNumber+1} / ${this.errors.length}`;
            this.errors_element.innerHTML = this.errors[this.currentNumber].error_description;
            this.rulename.innerHTML = this.errors[this.currentNumber].name;
        }
    }

    prev(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentNumber--;
            this.errornumbersContainer.innerHTML = `${this.currentNumber+1} / ${this.errors.length}`;
            this.errors_element.innerHTML = this.errors[this.currentNumber].error_description;
            this.rulename.innerHTML = this.errors[this.currentNumber].name;
        }
    }

    function_hello(failed_rules, need = 1) {
        var numberOfErrors = 0;
        var need = 1;
        if (failed_rules)
            failed_rules.forEach(function (value) {
                this.errors[numberOfErrors] = value;
                numberOfErrors++;
            }.bind(this));
        else
            return
        // console.log("Hibák száma: " + numberOfErrors);


        var div = document.createElement("div");
        div.setAttribute("class", "sidebar");
        div.setAttribute("id", "sidebar");
        div.classList.add("container");
        var element = document.createElement("h4");
        element.innerHTML = "Accessibility Checker";
        div.appendChild(element);
        element = document.createElement("label");
        element.innerHTML = "Issue   ";
        this.errornumbersContainer = document.createElement("span");
        element.appendChild(this.errornumbersContainer);
        this.errornumbersContainer.innerHTML = (this.currentNumber + 1) + " / " + numberOfErrors;
        div.appendChild(element);
        this.rulename = document.createElement('div');
        this.rulename.classList.add('rulename');
        this.rulename.innerHTML = this.errors[this.currentNumber].name;
        div.appendChild(this.rulename);
        this.errors_element = document.createElement("span");
        element.appendChild(this.errors_element);
        this.errors_element.innerHTML += this.errors[this.currentNumber].error_description ;
        this.errors_element.classList.add("d-block");
        div.appendChild(element);
        var button_container = document.createElement('div');
        button_container.classList.add('button-container');
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "prev";
        this.prevButton.classList.add("prev");
        this.prevButton.onclick = this.prev.bind(this);
        button_container.appendChild(this.prevButton);
        this.nextButton = document.createElement("button");
        this.nextButton.innerHTML = "next";
        this.nextButton.classList.add("next");
        this.nextButton.onclick = this.next.bind(this);
        button_container.appendChild(this.nextButton);
        div.appendChild(button_container);
        document.body.appendChild(div);


        var close_button_text = "<button type=\"button\" tabindex=\"0\"\n" +
            "        style=\"margin: 0px; cursor: pointer;\"><span class=\"bavIU_caGd\"><span class=\"bavIU_eoCh\"><svg\n" +
            "        name=\"IconX\" viewBox=\"0 0 1920 1920\" rotate=\"0\" width=\"1em\" height=\"1em\" aria-hidden=\"true\" role=\"presentation\"\n" +
            "        focusable=\"false\" data-cid=\"InlineSVG SVGIcon\"><g role=\"presentation\"><path\n" +
            "        d=\"M771.548 960.11L319 1412.658l188.562 188.562 452.548-452.548 452.548 452.548 188.562-188.562-452.548-452.548 452.548-452.548L1412.658 319 960.11 771.548 507.562 319 319 507.562z\"\n" +
            "        fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\"></path></g></svg></span></span>\n" +
            "</button>";


        var close_button = document.createElement("div");
        close_button.setAttribute("class", "button-1");
        close_button.setAttribute("id", "button-1");
        close_button.innerHTML = close_button_text;
        close_button.addEventListener('click', this.hide_view.bind(this));
        document.getElementById('sidebar').appendChild(close_button);
    }

    hide_view() {
        var x = document.getElementById("sidebar").remove();
    }

}

export default ViewRule;

