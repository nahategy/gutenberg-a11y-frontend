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

    constructor(block) {
        if (new.target === ARule)
            throw new TypeError("Abstract Rule  Cannot be constructed directly")
        this.block = block;
        this.block_content = block.toHTML();
        this.fails = [];
        this.sub_blocks = this.block_content[1];
        this.block_content = this.block_content[0];
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
        // TODO: beletenni a blockba hogy ha volt fail és melyik elemeken.
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

    }

    update() {

    }

}


export default ARule;
