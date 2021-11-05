import ARule from "./AbstractRule";


class TableHeader extends ARule {
    error_description = "Tables should include at least one header. Screen readers cannot interpret tables without the proper structure. Table headers provide direction and overview of the content.";
    name = "Table Header Rule";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H43.html";

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

    fail_comment_blocks = [];


    prev_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            let current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
        }

    }

    next_rule(ev) {
        ev.preventDefault();

        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            let current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
        }

    }

    repair(ev) {
        ev.preventDefault();
        let current_error = this.fails[this.currentNumber];

        let $tr = current_error.find("tr").first()
        let listoftd = $tr.find('td');
        for (let i = 0; i < listoftd.length; i++) {
            this.changeTagType(listoftd[i], 'th');
        }
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }

    changeTagType(elem, tagName) {
        const newElem = elem.ownerDocument.createElement(tagName)
        while (elem.firstChild) {
            newElem.appendChild(elem.firstChild)
        }
        for (let i = elem.attributes.length - 1; i >= 0; --i) {
            newElem.attributes.setNamedItem(elem.attributes[i].cloneNode())
        }
        elem.parentNode.replaceChild(newElem, elem)
        return newElem
    }

    _run = () => {
        if (!this.block_content)
            return;

        let $tables = this.block_content.find('table');
        for (let i = 0; i < $tables.length; i++) {
            if (jQuery($tables[i]).find("th").length === 0) {
                this.fails.push(jQuery($tables[i]));
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
        element.appendChild(this.errornumbersContainerRule);
        this.errornumbersContainerRule.innerHTML = (this.currentNumber + 1) + " / " + (this.currentFaliedNumber);
        div.appendChild(element);
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
        return div;
    }


}

export default TableHeader;


