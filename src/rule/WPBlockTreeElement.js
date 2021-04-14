class WPBlockTreeElement {
    type = null;
    whole_type = null;
    content = [];

    constructor(type) {
        const start_block_regex = new RegExp('<!-- wp:(.*?)\\s');
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

}

export default WPBlockTreeElement;