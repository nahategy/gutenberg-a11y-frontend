import ARule from "./AbstractRule";

const MIN_FONT_SIZE = 73;

class FontSize extends ARule {
    error_description = "Default size is too small"
    name = "FontSizeRule";
    error = "Valami"

    _run = () => {
        // if (!this.block_content)
        return false;
        for (var i = 0; i < this.block_content.length; i++) {
            if (this.check_font_size(this.block_content[i])) {
                // TODO itt nem vissza térni, hanem eltárolni az elemeket.
                return this;
            }
        }
        return false;
    }

    check_font_size() {
        let result = false;

        if (element.childNodes > 0) {
            for (let i = 0; i < element.childNodes; i++) {
                result = result || this.check_font_size(element.childNodes[i]);
                console.log(result);
            }
        }
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
}

export default FontSize;


