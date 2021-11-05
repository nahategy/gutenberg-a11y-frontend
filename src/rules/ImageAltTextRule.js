import ARule from "./AbstractRule";


class ImageAltTextRule extends ARule {
    error_description = "Images should include an alt attribute describing the image content."
    name = "Image Alt Text Rule";
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
    alt_tag;


    prev_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber - 1 >= 0) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
            this.showFailedElementInDom();
        }

    }

    next_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
            this.showFailedElementInDom();
        }

    }

    showFailedElementInDom = () => {
        const src = this.fails[this.currentNumber].src;
        const element = jQuery(`img[src='${src}']`);
        this.highlight_failed_element(element[0])
    }


    repair(ev) {
        ev.preventDefault();
        if (this.alt_tag.value === '') {
            alert('Enter the new image alternative text');
            return
        }

        this.fails[this.currentNumber].alt = this.alt_tag.value;
        this.showAlert('Error corrected', 'alert-primary');
        this._update();
    }


    _run = () => {
        if (!this.block_content)
            return;
        let images = this.block_content.find('img');
        if (!images)
            return;
        for (var i = 0; i < images.length; i++) {
            if (!images[i].alt || images[i].alt.toString().trim() === "") {
                this.fails.push(images[i]);
            }
        }
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
        this.alt_tag = document.createElement("input");
        this.alt_tag.classList.add = "alt_tag";
        this.alt_tag.className = "alt_tag";
        this.alt_tag.type = "text";
        this.alt_tag.value = current_error.alt;
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

export default ImageAltTextRule;


