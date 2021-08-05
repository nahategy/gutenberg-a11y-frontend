import ARule from "./AbstractRule";


class ImageAltTextRule extends ARule {
    error_description = "The alt images is missing"
    name = "ImageAltTextRule";

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
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
        }

    }

    next_rule(ev) {
        ev.preventDefault();
        if (this.currentNumber + 1 < this.fails.length) {
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].alt;
        }

    }

    repair(ev) {
        ev.preventDefault();
        if (this.alt_tag.value === '') {
            alert('Add a text');
            return
        }
        this.fails[this.currentNumber].alt = this.alt_tag.value;
        // TODO: block contentből újra generálni a TreeElementet!

        var div = jQuery('<div></div>')
        div.append(this.block.toHTML()[0])
        console.log('1', div.html())
        console.log(this.block);
        //this._update();
    }


    _run = () => {
        if (!this.block_content)
            return;
        let images = this.block_content.find('img');
        this.block_content.find('img').alt = "abct";
        if (!images)
            return;
        for (var i = 0; i < images.length; i++) {
            if (!images[i].alt || images[i].alt.toString().trim() === "") {
                this.fails.push(images[i]);
            }
        }
    }

    form() {
        //console.log('idx: ', idx);
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;

        this.currentFaliedNumber = this.fails.length;
        var current_error = this.fails[0];
        for (var i = 0; i < this.fails.length; i++) {
            console.log('alt ', i, ' ', this.fails[i].alt);
        }


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
        this.prevButton.classList.add("prev_rule");
        this.prevButton.onclick = this.prev_rule.bind(this);
        button_container_rule.appendChild(this.prevButton);
        this.nextButtonRule = document.createElement("button");
        this.nextButtonRule.innerHTML = "Next";
        this.nextButtonRule.classList.add("next_rule");
        this.nextButtonRule.onclick = this.next_rule.bind(this);
        button_container_rule.appendChild(this.nextButtonRule);
        div.appendChild(button_container_rule);
        return div;
    }
}

export default ImageAltTextRule;


