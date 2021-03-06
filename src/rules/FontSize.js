import ARule from "./AbstractRule";

const MIN_FONT_SIZE = 12;

class FontSize extends ARule {
    error_description = "Default size is too small"
    name = "FontSizeRule";

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
        if(this.currentNumber - 1 >= 0){
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber--;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].style.fontSize.replace("px", "");
        }

    }

    next_rule(ev) {
        ev.preventDefault();

        if(this.currentNumber + 1 < this.fails.length){
            this.currentFaliedNumber = this.fails.length;
            this.currentNumber++;
            var current_error = this.errors[this.currentNumber];
            this.errornumbersContainerRule.innerHTML = `${this.currentNumber + 1} / ${this.currentFaliedNumber}`;
            this.alt_tag.value = this.fails[this.currentNumber].style.fontSize.replace("px", "");
        }

    }

    repair(ev) {
        ev.preventDefault();
        if (this.alt_tag.value === '') {
            alert('Add a text');
        }else{
            var current_error = this.fails[this.currentNumber];
            this.fails[this.currentNumber].alt=this.alt_tag.value;
        }
    }



    _run = () => {
        if (!this.block_content)
            return;
        const sizes = this.block_content;

        if (!sizes)
            return;

        if(sizes[0].style.fontSize){
            var result = sizes[0].style.fontSize.replace("px", "");
            if(result < MIN_FONT_SIZE){
                this.fails.push(sizes[0]);
            }
        }


        // if (window.getComputedStyle(sizes[0]).fontSize) {
        //     var result = window.getComputedStyle(sizes[0]).fontSize.replace("px", "");
        //     result = parseInt(result);
        //     console.log('res : ', result);
        // }



        return;

        for (var i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            if (this.check_font_size(size)) {
                // TODO itt nem vissza térni, hanem eltárolni az elemeket.
                return this;
            }
        }
        return false;
    }

    check_font_size(element) {
        let result = false;


        // if (element.childNodes > 0) {
        //     for (let i = 0; i < element.childNodes; i++) {
        //         result = result || this.check_font_size(element.childNodes[i]);
        //         console.log(result);
        //     }
        // }


        if (window.getComputedStyle(element).fontSize) {
            result = window.getComputedStyle(element).fontSize.replace("px", "");
            if (!result)
                return false;
            try {
                result = parseInt(result);
            } catch (err) {
                return false;
            }
            return result < MIN_FONT_SIZE;
        }
    }

    form() {
        this.currentNumber = 0;
        this.currentFaliedNumber = 0;

        this.currentFaliedNumber = this.fails.length;
        var current_error = this.fails[0];
        var result = this.fails[0].style.fontSize.replace("px", "");

        // for(var i=0;i<this.fails.length;i++){
        //     console.log('alt ',i,' ', this.fails[i].alt);
        // }


        var div = document.createElement("div");
        div.setAttribute("class", "repair_div");
        div.setAttribute("id", "repair_div");
        div.classList.add("container");
        var element = document.createElement("h4");
        element.innerHTML = "Aktuális hiba jav:";
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
        this.repairButton.innerHTML = "Javítás";
        this.repairButton.classList.add("repair");
        this.repairButton.onclick = this.repair.bind(this);
        button_container_rule.appendChild(this.repairButton);
        this.prevButton = document.createElement("button");
        this.prevButton.innerHTML = "prev";
        this.prevButton.classList.add("prev_rule");
        this.prevButton.onclick = this.prev_rule.bind(this);
        button_container_rule.appendChild(this.prevButton);
        this.nextButtonRule = document.createElement("button");
        this.nextButtonRule.innerHTML = "next";
        this.nextButtonRule.classList.add("next_rule");
        this.nextButtonRule.onclick = this.next_rule.bind(this);
        button_container_rule.appendChild(this.nextButtonRule);
        div.appendChild(button_container_rule);
        return div;
    }


}

export default FontSize;


