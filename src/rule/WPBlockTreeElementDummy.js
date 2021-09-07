class WPBlockTreeElementDummy {
    content;
    failed_rules;

    constructor() {
        this.content = []
        this.failed_rules = [];
    }

    add_content = (str) => {
        this.content = str
    }

    toString = () => {

    }

    toHTML = () => {
        return [jQuery(this.content), []];
    }

    toOriginalText = () => {
        return "";
    }

    get_sub_elements = () => {

    }

}

export default WPBlockTreeElementDummy;
