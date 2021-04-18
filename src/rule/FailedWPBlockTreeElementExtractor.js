class FailedWPBlockTreeElementExtractor {
    block_tree = null;
    failed_block_tree_elements;

    constructor(wp_block_tree) {
        this.block_tree = wp_block_tree;
        this.failed_block_tree_elements = [];
    }

    run = () => {
        for (var i = 0; i < this.block_tree.structure.length; i++) {
            var main_element = this.block_tree.structure[i];
            this.extract_failed_elements(main_element)
        }
        return this.failed_block_tree_elements;
    }

    extract_failed_elements = (wp_block_tree_element) => {
        if (wp_block_tree_element.failed_rules.length > 0) {
            this.failed_block_tree_elements.push(wp_block_tree_element);
        }
        var sub_block_tree_elements = wp_block_tree_element.get_sub_elements();
        for (var i = 0; i < sub_block_tree_elements.length; i++) {
            this.extract_failed_elements(sub_block_tree_elements[i]);
        }
    }

}

export default FailedWPBlockTreeElementExtractor