import ARule from "./AbstractRule";

const MIN_FONT_SIZE = 73;

class FontSize extends ARule {
    error_description = "Default size is too small"
    name = "FontSizeRule";


    _run = () => {
        if (!this.block_content)
            return;
        const sizes = this.block_content;

        //console.log('size: '. window.getComputedStyle(sizes[0]).fontSize);

        // if (window.getComputedStyle(sizes[0]).fontSize) {
        //     var result = window.getComputedStyle(sizes[0]).fontSize.replace("px", "");
        //     result = parseInt(result);
        //     console.log('res : ', result);
        // }

        if (!sizes)
            return;

        return;

        for (var i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            if (this.check_font_size(size)) {
                console.log('for size: ', size);
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


