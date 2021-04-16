import WPBlockTreeElement from "./WPBlockTreeElement";

class WPBlockTree {
    structure = [];
    recursive_structure = [];
    current_element_index = -1;

    start_element = (str) => {
        if (str == '')
            return
        this.current_element_index += 1;
        const tree_element = new WPBlockTreeElement(str)
        this.recursive_structure[this.current_element_index] = tree_element;
        if (this.current_element_index === 0)
            this.structure.push(tree_element)
        else if (this.current_element_index > 0)
            this.recursive_structure[this.current_element_index - 1].add_content(tree_element)
    }

    end_element = (str) => {
        if (str == '')
            return
        this.current_element_index -= 1;
    }

    add_content = (str) => {
        if (str == '')
            return
        this.recursive_structure[this.current_element_index].add_content(str)
    }


    toString = () => {
        var str = "";
        for (var i = 0; i < this.structure.length; i++) {
            str += this.structure[i].toString();
        }
        return str;
    }

}

export default WPBlockTree;