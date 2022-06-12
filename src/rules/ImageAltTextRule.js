import ARule from "./AbstractRule";
import {disableButtonIfFalse} from "../common/utils";


class ImageAltTextRule extends ARule {
    error_description = "Images should include an alt attribute describing the image content."
    name = "Image Alt Text Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H37.html";

    nextButtonRule;
    currentNumber = 0;
    currentFailedNumber = 0;
    errors = [];
    errors_element;
    errornumbersContainerRule;
    rulename;
    form_container;

    prevButton;
    nextButton;
    repairButton;
    alt_tag;
    checkbox;


    prev_rule(ev) {
        ev.preventDefault();
        this.ruleNumberLength = document.getElementsByClassName("ruleNumberCounter")[0].innerText
        let first = this.ruleNumberLength.split("/")[0]
        let second = this.ruleNumberLength.split("/")[1]
        this.ruleNumberLength = document.getElementsByClassName("issueCounter")[0].innerText
        let issueFirst = this.ruleNumberLength.split("/")[0]
        let issueSecond = this.ruleNumberLength.split("/")[1]
        if(Number(first)===1){
            return
        }
        if (this.currentNumber - 1 >= 0) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            // this.alt_tag.value = this.fails[this.currentNumber].alt;
            this.showFailedElementInDom();
            let sum = (Number(first) - 1) + ' / ' + second
            document.getElementsByClassName("ruleNumberCounter")[0].innerText = sum
        } else {
            document.querySelector("button[class='prevRule']").click()
            let sum = (Number(first) - 1) + ' / ' + second
            document.getElementsByClassName("ruleNumberCounter")[0].innerText = sum

            this.ruleNumberLength = document.getElementsByClassName("issueCounter")[0].innerText
            let issueFirst = this.ruleNumberLength.split("/")[0]
            let issueSecond = this.ruleNumberLength.split("/")[1]

            if (Number(issueFirst) === 1) {
                if (Number(issueSecond) > 1) {
                    let sum = (Number(first) - issueSecond) + ' / ' + second
                    document.getElementsByClassName("ruleNumberCounter")[0].innerText = sum
                    this.ruleNumberLength = document.getElementsByClassName(
                        "issueCounter")[0].innerText= `${issueFirst} / ${issueSecond}`
                    for (var i = 1; i < issueSecond; i++) {
                        document.querySelector("button[class='next_rule_error']").click()
                    }

                }
            }
        }

    }

    next_rule(ev) {
        ev.preventDefault();

        this.ruleNumberLength = document.getElementsByClassName("ruleNumberCounter")[0].innerText
        let first2 = this.ruleNumberLength.split("/")[0]
        let second2 = this.ruleNumberLength.split("/")[1]

        if(Number(first2)===Number(second2)){
            return
        }

        this.ruleNumberLength = document.getElementsByClassName("ruleNumberCounter")[0].innerText
        let first = this.ruleNumberLength.split("/")[0]
        let second = this.ruleNumberLength.split("/")[1]
        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            // this.alt_tag.value = this.fails[this.currentNumber].alt;
            this.showFailedElementInDom();
            let sum = (Number(first)+1) + ' / ' + second
            document.getElementsByClassName("ruleNumberCounter")[0].innerText=sum
        }else {
            let sum = (Number(first)+1) + ' / '+ second
            document.querySelector("button[class='nextRule']").click()
            document.getElementsByClassName("ruleNumberCounter")[0].innerText=sum
        }
    }

    showFailedElementInDom = () => {
        const src = this.fails[this.currentNumber].src;
        const element = jQuery(`img[src='${src}']`);
        this.highlight_failed_element(element[0])
    }


    repair(ev) {
        ev.preventDefault();
        if (this.alt_tag.value === '' && !this.checkbox.checked) {
            alert('Enter the new image alternative text');
            return
        }

        this.fails[this.currentNumber].alt = this.checkbox.checked ? " " :this.alt_tag.value;
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }


    _run = () => {
        if (!this.block_content) return;
        let images = this.block_content.find('img');
        if (!images) return;
        for (var i = 0; i < images.length; i++) {
            // Decorative images can have empty alt tags!
            if (!images[i].alt /*|| images[i].alt.toString().trim() === ""*/) {
                this.fails.push(images[i]);
            }
        }
    }

    form() {
        this.currentNumber = 0;
        this.currentFailedNumber = 0;
        this.currentFailedNumber = this.fails.length;
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
        this.errornumbersContainerRule.classList.add("issueCounter");
        element.appendChild(this.errornumbersContainerRule);
        this.errornumbersContainerRule.innerHTML = (this.currentNumber + 1) + " / " + (this.currentFailedNumber);
        div.appendChild(element);

        var checkboxLabel = document.createElement('label');
        checkboxLabel.innerText = "Decorative image ? ";

        var checkbox = document.createElement("input");
        this.checkbox = checkbox;
        checkbox.type = "checkbox";
        checkboxLabel.appendChild(checkbox);

        this.alt_tag = document.createElement("input");
        this.alt_tag.classList.add = "alt_tag";
        this.alt_tag.className = "alt_tag";
        this.alt_tag.type = "text";
        this.alt_tag.value = current_error.alt;
        div.appendChild(this.alt_tag);
        div.appendChild(checkboxLabel);
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

        disableButtonIfFalse(this.alt_tag, this.repairButton, (input) => {
            return input.value.length === "" && !checkbox.checked;
        })
        checkbox.onclick = function () {
            this.alt_tag.disabled = checkbox.checked;
            this.repairButton.disabled = this.alt_tag.value.length === "" && !checkbox.checked;;

        }.bind(this);

        return div;
    }
}

export default ImageAltTextRule;


