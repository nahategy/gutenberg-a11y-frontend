import ARule from "./AbstractRule";
import {disableButtonIfInputEmpty} from "../common/utils";


class TableCaption extends ARule {
    error_description = "Tables should include a caption describing the contents of the table. Screen readers cannot interpret tables without the proper structure. Table captions describe the context and general understanding of the table.";
    name = "Table Caption Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H39.html";

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

    fail_comment_blocks = [];


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
            console.log('hello')
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
                console.log('issueFirst', issueFirst)
                console.log('issueSecond', issueSecond)

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
            console.log('iff')
            this.currentFaliedNumber = this.fails.length;
            console.log(this.currentFaliedNumber)
            this.currentNumber++;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            // this.alt_tag.value = this.fails[this.currentNumber].alt;
            this.showFailedElementInDom();
            let sum = (Number(first)+1) + ' / ' + second
            document.getElementsByClassName("ruleNumberCounter")[0].innerText=sum
        }else {
            console.log('else')
            let sum = (Number(first)+1) + ' / '+ second
            document.querySelector("button[class='nextRule']").click()
            document.getElementsByClassName("ruleNumberCounter")[0].innerText=sum
        }
    }

    repair(ev) {
        ev.preventDefault();
        let current_error = this.fails[this.currentNumber];
        let caption = this.getCaption();
        console.log(caption);
        if (caption.length > 0) {
            caption.text(this.alt_tag.value);
        } else {
            current_error.prepend(jQuery(`<caption>${this.alt_tag.value}</caption>`));
        }
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }

    getCaptionText() {
        let caption = this.getCaption();
        return caption.length > 0 ? caption.text() : "";
    }

    getCaption() {
        let current_error = this.fails[this.currentNumber];
        return current_error.find('caption');
    }


    _run = () => {
        if (!this.block_content)
            return;
        let $tables = this.block_content.find('table');
        for (let i = 0; i < $tables.length; i++) {
            if (jQuery($tables[i]).find("caption").length === 0) {
                // Csak akkor érdekes, ha nem blokkeditorból szerkeszti ( az nem kezeli ezt és beomlik )
                if ($tables[i].parentElement.className === "wp-block-code") {
                    this.fails.push(jQuery($tables[i]));
                }
            }
        }

    }


    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;

        this.currentFaliedNumber = this.fails.length;
        let current_error = this.fails[0];

        let div = document.createElement("div");
        div.setAttribute("class", "repair_div");
        div.setAttribute("id", "repair_div");
        div.classList.add("container");
        let element = document.createElement("h4");
        element.innerHTML = "Current error fix:";
        div.appendChild(element);
        element = document.createElement("label");
        element.innerHTML = "Issue   ";
        this.errornumbersContainerRule = document.createElement("span");
        this.errornumbersContainerRule.classList.add("issueCounter");
        element.appendChild(this.errornumbersContainerRule);
        this.errornumbersContainerRule.innerHTML = (this.currentNumber + 1) + " / " + (this.currentFaliedNumber);
        div.appendChild(element);
        this.alt_tag = document.createElement("input");
        this.alt_tag.classList.add = "alt_tag";
        this.alt_tag.className = "alt_tag";
        this.alt_tag.type = "text";
        div.appendChild(this.alt_tag);
        let button_container_rule = document.createElement('div');
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

       disableButtonIfInputEmpty(this.alt_tag,this.repairButton)

        return div;
    }


}

export default TableCaption;


