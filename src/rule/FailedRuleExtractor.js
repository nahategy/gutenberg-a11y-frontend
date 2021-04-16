class FailedRuleExtractor {
    block_tree_list = null;
    failed_rules;

    constructor(wp_block_tree_list) {
        this.block_tree_list = wp_block_tree_list;
        this.failed_rules = [];
    }

    run = () => {
        for (var i = 0; i < this.block_tree_list.length; i++) {
            const failed_element = this.block_tree_list[i];
            this.failed_rules.push(...failed_element.failed_rules)
        }
        return this.failed_rules;
    }
}

export default FailedRuleExtractor