import ARule from "./AbstractRule";


class ImageAltTextRule extends ARule {
    error_description = "contr rule"
    name = "ImageAltTextRule";

    run() {
        if (!this.html_element)
            return;
        const images = this.html_element.querySelectorAll('img');
        if (!images)
            return;
        for (var i = 0; i < images.length; i++) {
            const image = images[i];
            if (!image.alt || image.alt.toString().trim() === "") {
                return this;
            }
        }
    }


}

export default ImageAltTextRule;


