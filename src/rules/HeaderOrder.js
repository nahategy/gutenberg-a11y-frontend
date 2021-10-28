import ARule from "./AbstractRule";


class HeaderOrder extends ARule {
    error_description = "Heading levels should not be skipped."
    name = "Header order rule";
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

        document.querySelector('.a11y-highlighter').remove();


        this.currentFaliedNumber = this.fails.length;

        var current_error = this.fails[0];
        var result = this.fails[0].style.fontSize.replace("px", "");

        var div = document.createElement("div");
        div.setAttribute("class", "repair_div");
        div.setAttribute("id", "repair_div");
        div.classList.add("container");
        var element = document.createElement("h4");
        element.innerHTML = "Current error fix:";
        div.appendChild(element);
        element = document.createElement("label");
        element.innerHTML = "Issue   ";
        this.errornumbersContainerRule = document.createElement("span");
        element.appendChild(this.errornumbersContainerRule);
        this.errornumbersContainerRule.innerHTML = (this.currentNumber + 1) + " / " + (this.currentFaliedNumber);
        div.appendChild(element);
        this.alt_tag = document.createElement("input");
        this.alt_tag.classList.add = "alt_tag";
        this.alt_tag.className = "alt_tag";
        this.alt_tag.type = "text";
        this.alt_tag.value = current_error.style.fontSize.replace("px", "");
        div.appendChild(this.alt_tag);
        var button_container_rule = document.createElement('div');
        button_container_rule.classList.add('button-container-rule');
        this.repairButton = document.createElement("button");
        this.repairButton.innerHTML = "Repair";
        this.repairButton.classList.add("repair");
        this.repairButton.onclick = this.repair.bind(this);
        button_container_rule.appendChild(this.repairButton);
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "Prev";
        this.prevButton.classList.add("prev_rule_error");
        this.prevButton.onclick = this.prev_rule.bind(this);
        button_container_rule.appendChild(this.prevButton);
        this.nextButtonRule = document.createElement("button");
        this.nextButtonRule.innerHTML = "Next";
        this.nextButtonRule.classList.add("next_rule_error");
        this.nextButtonRule.onclick = this.next_rule.bind(this);
        button_container_rule.appendChild(this.nextButtonRule);
        div.appendChild(button_container_rule);
        return div;
    }
}

export default HeaderOrder;



