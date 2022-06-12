import ARule from "./AbstractRule";
import HelperService from "../services/helper.service";

class AdjacentLinks extends ARule {

    error_description = "Adjacent links with the same URL should be a single link."
    name = "Adjacent Links Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H2.html";

    _run = () => {
        if (!this.block_content)
            return;

        for (let i = 0; i < this.block_content.length; i++) {
            this.test(this.block_content[i])
        }

    }

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

    onlyChild = parent => {
        return !parent.firstElementChild
    }

    test = (element) => {
        if (!this.onlyChild(element))
            for (let i = 0; i < element.childNodes.length; i++) {
                this.test(element.childNodes[i])
            }

        for (let i = 0; i < element.childNodes.length - 1; i++) {
            let elem1 = element.childNodes[i];
            let elem2 = element.childNodes[i + 1];

            if (elem1.nodeName === "A" && elem2.nodeName === "#text") {
                i++;
                elem2 = element.childNodes[i + 1];
            }

            if (this.shouldMergeAnchors(elem1, elem2)) {
                this.fails.push(elem2)
            }
        }
    }


    repair = (ev) => {
        ev.preventDefault();
        this.fails[this.currentNumber].href = "";
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }


    shouldMergeAnchors = (elem1, elem2) => {
        if (!elem1 || !elem2 || elem1.tagName !== "A" || elem2.tagName !== "A") {
            return false
        }
        return elem1.getAttribute("href") === elem2.getAttribute("href")
    }

    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;


        this.currentFaliedNumber = this.fails.length;


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
        this.errornumbersContainerRule.innerHTML = (this.currentNumber + 1) + " / " + (this.currentFaliedNumber);
        div.appendChild(element);
        var button_container_rule = document.createElement('div');
        button_container_rule.classList.add('button-container-rule');
        var checkbox_container = document.createElement("div");
        var checkbox_label = document.createElement("label");
        HelperService.language.get_translation("Merge links ? ").then((translation) => {
            checkbox_label.innerText = translation;
            checkbox_label.appendChild(checkbox);
        });

        var checkbox = document.createElement("input");
        checkbox.onclick = () =>{
          if(checkbox.checked)
              this.repairButton.disabled="";
          else
              this.repairButton.disabled="disabled";

        }
        checkbox.type = 'checkbox';
        checkbox_container.appendChild(checkbox_label);
        button_container_rule.appendChild(checkbox_container);

        this.repairButton = document.createElement("button");
        this.repairButton.disabled = 'disabled';
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


export default AdjacentLinks;