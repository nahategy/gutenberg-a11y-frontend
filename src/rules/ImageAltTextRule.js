import ARule from "./AbstractRule";


class ImageAltTextRule extends ARule {
    error_description = "The alt images is missing"
    name = "ImageAltTextRule";

    _run = () => {
        if (!this.block_content)
            return;
        console.log(this.block_content);
        const images = this.block_content.find('img');
        if (!images)
            return;
        for (var i = 0; i < images.length; i++) {
            const image = images[i];
            if (!image.alt || image.alt.toString().trim() === "") {
                this.fails.push(image);
            }
        }
    }
}

export default ImageAltTextRule;


