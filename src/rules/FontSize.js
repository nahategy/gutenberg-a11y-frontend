import ARule from "./AbstractRule";

const MIN_FONT_SIZE = 12;

class FontSize extends ARule {
    error_description = "Default size is too small";
    name = "FontSizeRule";
    link = "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html";

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
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            //this.alt_tag.value = this.fails[this.currentNumber].style.fontSize.replace("px", "");
        }

    }

    next_rule(ev) {
        ev.preventDefault();

        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            //this.alt_tag.value = this.fails[this.currentNumber].style.fontSize.replace("px", "");
        }

    }

    repair(ev) {
        ev.preventDefault();
        if (this.alt_tag.value === '') {
            alert('Add a text');
        }
        else {
            var current_error = this.fails[this.currentNumber];
            this.fails[this.currentNumber].style.fontSize = `${this.alt_tag.value}px`;
            let elem = this.fail_comment_blocks[this.currentNumber];
            elem.nodeValue = elem.nodeValue.replace(/fontSize":"(\d+)px"/, `"fontSize":"${this.alt_tag.value}px"`)


            // for (var i = 0; i < this.fails.length; i++) {
            //     if (this.fails[i].nodeName == '#comment') {
            //         this.fails[i].nodeValue = this.fails[i].nodeValue.replace(/fontSize":"(\d+)px"/, `"fontSize":"${this.alt_tag.value}px"`);
            //     }
            // }
            // this._update();
        }
    }


    _run = () => {
        if (!this.block_content)
            return;
        const htmlElementList = this.block_content;

        if (!htmlElementList)
            return;

        console.log(this.block_content)
        for (let i = 0; i < this.block_content.length; i++) {

            if (htmlElementList[i].style?.fontSize) {
                var result = parseInt(htmlElementList[i].style.fontSize.replace("px", ""));
                if (result < MIN_FONT_SIZE) {
                    this.fails.push(htmlElementList[i]);
                    this.fails.push(htmlElementList[i - 1]);
                }
            }
        }

        return false;
    }


    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;

        // for (var i = 0; i < this.fails.length; i++) {
        //     if (this.fails[i].nodeName == '#comment') {
        //         this.currentFaliedNumber++;
        //     }
        // }

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

export default FontSize;


