import ImageAltTextRule from "../rules/ImageAltTextRule";


class ViewRule {
    nextButton;
    prevButton;
    currentNumber = 1;
    errors = [];
    errornumbersContainer;

    next(ev) {
        ev.preventDefault();
        var error_number = this.currentNumber;
        if (error_number > this.errors.length - 1) {
            var error = this.errors[error_number];
            this.errornumbersContainer.innerHTML = `${this.currentNumber++} / ${this.errors.length}`;
        }
    }

    prev(ev) {
        ev.preventDefault();
        var error_number = this.currentNumber;
        if (error_number <= this.errors.length-1) {
            var error = this.errors[error_number];
            this.errornumbersContainer.innerHTML = `${this.currentNumber--} / ${this.errors.length}`;
        }
    }

    function_hello(failed_rules, need = 1) {
        var numberOfErrors = 0;
        var need = 1;

        failed_rules.forEach(function (value) {
            this.errors[numberOfErrors] = value.name;
            numberOfErrors++;
        }.bind(this));

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
        this.errornumbersContainer.innerHTML = this.currentNumber + " / " + numberOfErrors;
        div.appendChild(element);
        element = document.createElement("label");
        this.errors = document.createElement("span");
        element.appendChild(this.errors);
        this.errors.innerHTML = "<br><br>" + this.errors[0] + "<br><br>";
        div.appendChild(element);
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "prev";
        this.prevButton.classList.add("prev");
        this.prevButton.onclick = this.prev.bind(this);
        div.appendChild(this.prevButton);
        this.nextButton = document.createElement("button");
        this.nextButton.innerHTML = "next";
        this.nextButton.classList.add("next");
        this.nextButton.onclick = this.next.bind(this);
        div.appendChild(this.nextButton);
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
        close_button.innerHTML=close_button_text;
        close_button.addEventListener('click', this.hide_view.bind(this));
        document.getElementById('sidebar').appendChild(close_button);
    }

    hide_view() {
        var x = document.getElementById("sidebar");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
}

export default ViewRule;

