import ARule from "./AbstractRule";
import {disableButtonIfFalse} from "../common/utils";


class TextAlignJustified extends ARule {
    error_description = "Not link texts should not be underlined"
    name = "Invalid Text Underline Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H37.html";

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


    prev_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.showFailedElementInDom();
        }

    }

    next_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.showFailedElementInDom();
        }

    }

    showFailedElementInDom = () => {
    }

    repair(ev) {
        ev.preventDefault();
        this.fails[this.currentNumber].style.textDecoration = 'unset';
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }

    check_element = (element) => {
        let e = element;
        let $element = jQuery(e);

        if ($element.is('u') && e.style?.textDecoration !== "unset" || e.style?.textDecoration === "underline") {
            if ($element.closest('a').length === 0) {
                this.fails.push(e);
            }
        }
        for (let i = 0; i < $element.children().length; i++) {
            this.check_element($element.children()[i])
        }
    }

    _run = () => {
        if (!this.block_content)
            return;

        for (let i = 0; i < this.block_content.length; i++) {
            this.check_element(this.block_content[i]);
        }

        return this.fails.length < 1;
    }

    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;
        this.currentFaliedNumber = this.fails.length;
        var current_error = this.fails[0];

        setTimeout(() => {
            this.showFailedElementInDom();
        }, 500);

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

        var formDiv = document.createElement('div');
        var checkboxLabel  = document.createElement('label');
        checkboxLabel.innerText = "Underline will be removed "

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkboxLabel.appendChild(checkbox);
        formDiv.appendChild(checkboxLabel);
        div.appendChild(formDiv);

        var button_container_rule = document.createElement('div');
        button_container_rule.classList.add('button-container-rule');
        this.repairButton = document.createElement("button");
        this.repairButton.innerHTML = "Repair";
        this.repairButton.classList.add("repair");
        this.repairButton.onclick = this.repair.bind(this);
        this.repairButton.disabled = true;
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

        checkbox.onclick = function () {
            this.repairButton.disabled = !checkbox.checked;
        }.bind(this);

        return div;
    }
}

export default TextAlignJustified;



