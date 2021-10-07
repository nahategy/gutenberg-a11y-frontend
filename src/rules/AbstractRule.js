import HelperService from "../services/helper.service";
import RuleButton from "../view/RuleButton";

class ARule {
    block;
    block_content;
    sub_blocks;
    error;
    error_description;
    name;
    fails;
    currentNumber=0;
    highlighter=null;

    constructor(block, rewrite_rules_function) {
        if (new.target === ARule)
            throw new TypeError("Abstract Rule  Cannot be constructed directly")
        this.block = block;
        this.block_content = block.toHTML();
        this.fails = [];
        this.sub_blocks = this.block_content[1];
        this.block_content = this.block_content[0];
        this.__rewrite_rules = rewrite_rules_function;
        for (var i = 0; i < this.sub_blocks.length; i++) {
            // new this.constructor(this.sub_blocks[i])
        }
    }


    run = () => {
        const result = this._run();

        // Found no error - was no error | errors has been fixed
        if (this.fails.length === 0) {
            return;
        }
        this.block.failed_rules.push(this);
    }

    _run = () => {
        throw new Error("Run method not Implemented yet!")
    }

    get name() {
        return HelperService.language.get_translation(this.name)
    }

    get error() {
        return HelperService.language.get_translation(this.error);
    };

    get error_description() {
        return HelperService.language.get_translation(this.error_description)
    };

    get wcag_link() {
        throw new Error("wcag_link Method not Implemented yet!")
    }

    form() {
        return ''
    }

    _update() {
        this.__rewrite_rules()
    }

    update() {
        return this.block.toOriginalText()
    }

    highlight_failed_element = (element) => {
        if(this.highlighter !== null){
            this.highlighter.remove();
        }

        if(!element)
            return;
        element.scrollIntoView();
        const positions = element.getBoundingClientRect();
        console.log(positions);
        this.highlighter = document.createElement("div");
        this.highlighter.classList.add("a11y-highlighter");
        this.highlighter.style.top =`${positions.top}px`;
        this.highlighter.style.left =`${positions.left}px`;
        this.highlighter.style.width = `${positions.width}px`;
        this.highlighter.style.height = `${positions.height}px`;

        document.querySelector("body").append(this.highlighter);

    }
}


export default ARule;
