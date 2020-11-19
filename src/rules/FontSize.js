import ARule from "./AbstractRule";

const MIN_FONT_SIZE = 73;

class FontSize extends ARule {
    error_description = "Default size is too small"
    name = "FontSizeRule";

    run() {
        if (!this.html_element)
            return false;
        if (this.check_font_size(this.html_element))
            return this;
        return false;
    }

    check_font_size(element) {
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


