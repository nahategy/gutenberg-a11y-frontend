import ARule from "./AbstractRule";


class HeaderOrder extends ARule {
    error_description = "Heading levels should not be skipped."
    name = "Header Order Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/G141.html";

    nextButtonRule;
    prevButton;
    currentNumber = 0;
    currentFaliedNumber = 0;
    errors = [];
    errors_element;
    errornumbersContainerRule;
    rulename;
    form_container;

    prevButton;
    nextButton;
    repairButton;
    alt_tag;


    prev_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
        }

    }

    next_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
        }

    }


    repair(ev) {
        ev.preventDefault();
    }


    _run = () => {
        if (!this.block_content)
            return;

        var $headers = jQuery(this.block_content).filter('h1, h2 ,h3 ,h4, h5, h6 ');

        var nexType = 1;
        for (let i = 0; i < $headers.length; i++) {
            let $element = $headers[i];

            var elementType =$headers[i].nodeName;
            var elementSize = elementType.split("")[1];

            if (elementSize > nexType)
                nexType = elementSize;

            if (elementSize < nexType)
                //Hiba rossz a sorrendje az elemeknek ( ezt keressük ) .
            {
                this.fails.push($element[0]);
                break;
            }

        }
        return this.fails.length < 1
    }

    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;
        var div = document.createElement("div");
        div.setAttribute("class", "repair_div");
        div.setAttribute("id", "repair_div");
        div.classList.add("container");
        var element = document.createElement("h4");
        element.innerHTML = "We are only reporting the error at this time, the fix will be available later";
        div.appendChild(element);
        return div;
    }
}

export default HeaderOrder;



