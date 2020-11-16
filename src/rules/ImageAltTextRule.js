import ARule from "./AbstractRule";


class ImageAltTextRule extends ARule {
    error_description = "contr rule"

    run() {
        console.log('contrast rule')
    }
}


export default ImageAltTextRule;


