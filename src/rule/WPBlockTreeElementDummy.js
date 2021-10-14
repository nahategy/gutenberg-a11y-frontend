class WPBlockTreeElementDummy {
    content;
    failed_rules;

    constructor() {
        this.content = []
        this.failed_rules = [];
    }

    add_content = (str) => {
        this.content = jQuery(str);
    }

    toString = () => {

    }

    toHTML = () => {
        return [this.content, []];
    }

    toOriginalText = () => {
        return (jQuery("<div></div>").append(this.content)).html();
    }

    get_sub_elements = () => {

    }

}

export default WPBlockTreeElementDummy;
