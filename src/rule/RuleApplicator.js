import RuleFactory from "./RuleFactory";
import WPBlockTree from "./WPBlockTree";
import FailedWPBlockTreeElementExtractor from "./FailedWPBlockTreeElementExtractor";
import WPBlockTreeElementDummy from "./WPBlockTreeElementDummy";

class RuleApplicator {
    editor_context_string;
    block_tree = new WPBlockTree();
    failed_block_extractor = null;

    constructor(editor_context_string) {
        this.editor_context_string = editor_context_string;
        this.failed_block_extractor = new FailedWPBlockTreeElementExtractor(this.block_tree);
    }

    find_elements_ = () => {
        //Regex:  <!-- wp:paragraph --> kontent <!-- wp:paragraph -->
        const start_block_regex = new RegExp('<!-- wp:.*? -->');
        const end_block_regex = new RegExp('<!-- \\/wp:.*? -->');
        const line = this.editor_context_string.replaceAll('\n', '');


        var str = "";
        for (var i = 0; i < line.length; i++) {
            str += line[i];

            let start_position = str.search(start_block_regex);
            let matched_results_start = str.match(start_block_regex);

            if (start_position > -1) {
                if (start_position > 0) {
                    const kezd = str.substr(0, start_position)
                    this.block_tree.add_content(kezd)
                    const end = str.substring(start_position, start_position + matched_results_start[0].length)
                    this.block_tree.start_element(end)
                    str = "";
                }
                this.block_tree.start_element(str)
                str = "";
            }

            let end_position = str.search(end_block_regex);
            let matched_results_end = str.match(end_block_regex);

            if (end_position > -1) {
                if (end_position > 0) {
                    const kezd = str.substr(0, end_position)
                    this.block_tree.add_content(kezd)
                    const end = str.substring(end_position, end_position + matched_results_end[0].length)
                    this.block_tree.end_element(end)
                    str = "";
                }
                this.block_tree.end_element(str)
                str = "";
            }
        }
    }

    find_elements = () => {
        const element_ = new WPBlockTreeElementDummy();
        this.block_tree.structure[0] = element_;
        const line = this.editor_context_string.replaceAll('\n', '');

        element_.add_content(line)
    }

    apply_rules = (rewrite_rules_function) => {
        const rules = RuleFactory.getRules();
        for (var i = 0; i < this.block_tree.structure.length; i++) {
            for (var j = 0; j < rules.length; j++) {
                new rules[j](this.block_tree.structure[i], rewrite_rules_function).run();
            }
        }
    }

    get_failed_tree_elements = () => {
        console.log()
        return this.block_tree.structure[0].failed_rules
    }

}

export default RuleApplicator;
