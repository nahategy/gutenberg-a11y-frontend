import ARule from "./AbstractRule";


class TableHeaderScope extends ARule {
    error_description = "Screen readers cannot interpret tables without the proper structure. Table headers provide direction and content scope.";
    name = "Tables headers should specify scope.";
    link = "https://www.w3.org/TR/WCAG20-TECHS/H63.html";

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

        let $th = current_error.find("th")
        $th.attr('scope', 'col');
        this._update();
    }

    _run = () => {
        if (!this.block_content)
            return;

        let $tables = this.block_content.find('table');
        for (let i = 0; i < $tables.length; i++) {
            var $th = jQuery($tables[i]).find("th");
            this.searchForScopelessThs($th, $tables[i]);
        }

    }


    searchForScopelessThs($th, $table) {
        for (let j = 0; j < $th.length; j++) {
            let $elem = jQuery($th[j]);
            if ($elem.attr('scope') === undefined || $elem.attr('scope') === "") {
                this.fails.push(jQuery($table));
                return;
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
        return div;
    }


}

export default TableHeaderScope;


