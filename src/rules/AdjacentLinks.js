import ARule from "./AbstractRule";
import HelperService from "../services/helper.service";

class AdjacentLinks extends ARule {

    error_description = "Adjacent links with the same URL should be a single link."
    name = "AdjacentLinks";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H2.html";

    _run = () => {
        if (!this.block_content)
            return;

        for (let i = 0; i < this.block_content.length; i++) {
            this.test(this.block_content[i])
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


export default AdjacentLinks;