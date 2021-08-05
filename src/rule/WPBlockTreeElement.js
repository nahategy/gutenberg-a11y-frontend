class WPBlockTreeElement {
    type = null;
    whole_type = null;
    content;
    failed_rules;

    constructor(type) {
        const start_block_regex = new RegExp('<!-- wp:(.*?)\\s');
        this.content = []
        this.failed_rules = [];
        this.whole_type = type;
        this.type = type.match(start_block_regex)[1]
    }

    add_content = (str) => {
        this.content.push(str)
    }

    toString = () => {
        var str = "";
        str += this.whole_type;
        for (var i = 0; i < this.content.length; i++) {
            str += this.content[i].toString();
        }
        str += `<!-- /wp:${this.type} -->`;
        return str;
        // TODO: betenni block headert contentet végig iterálni toStringel majd betenni a block footer
    }

    toHTML = () => {
        var str = "";
        var sub_blocks = [];
        for (var i = 0; i < this.content.length; i++) {
            if (typeof this.content[i] != 'WPBlockTreeElement')
                str += this.content[i].toString();
            else {
                sub_blocks.push(this.content[i])
            }
        }
        return [jQuery(str), sub_blocks];
    }

    toOriginalText = () => {
        const tmp_div = jQuery('<div></div>');
        tmp_div.append(this.toHTML()[0])
        return tmp_div.html();
    }

    get_sub_elements = () => {
        return this.toHTML()[1];
    }

}

export default WPBlockTreeElement;