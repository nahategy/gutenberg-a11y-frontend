import RuleFactory from "./RuleFactory";
import WPBlockTree from "./WPBlockTree";

class RuleApplicator {
    editor_context_string;
    elements;


    constructor(editor_context_string) {
        this.editor_context_string = editor_context_string;
        this.elements = [];
    }


    find_elements = () => {
        //Regex:  <!-- wp:paragraph --> kontent <!-- wp:paragraph -->
        const start_block_regex = new RegExp('<!-- wp:.*? -->');
        const end_block_regex = new RegExp('<!-- \\/wp:.*? -->');


        const line = this.editor_context_string.replaceAll('\n', '');
        var str = "";
        var lists = {};
        var j = 0;
        var block_tree = new WPBlockTree();

        for (var i = 0; i < line.length; i++) {

            str += line[i];

            let start_position = str.search(start_block_regex);
            let matched_results_start = str.match(start_block_regex);

            if (start_position > -1) {
                if (start_position > 0) {
                    const kezd = str.substr(0, start_position)
                    block_tree.add_content(kezd)
                    const end = str.substring(start_position, start_position + matched_results_start[0].length)
                    block_tree.start_element(end)
                    str = "";
                }
                block_tree.start_element(str)
                str = "";
            }

            let end_position = str.search(end_block_regex);
            let matched_results_end = str.match(end_block_regex);

            if (end_position > -1) {
                if (end_position > 0) {
                    const kezd = str.substr(0, end_position)
                    block_tree.add_content(kezd)
                    const end = str.substring(end_position, end_position + matched_results_end[0].length)
                    block_tree.end_element(end)
                    str = "";
                }
                block_tree.end_element(str)
                str = "";
            }
        }
    }

    apply_rules = () => {
        return;
        const rules = RuleFactory.getRules();
        for (var i = 0; i < this.elements; i++) {
            for (var j = 0; j < rules.length; j++) {
                const rule = new rules[j](this.elements[i]);
                rule.run();
            }
        }
    }

}

export default RuleApplicator;


