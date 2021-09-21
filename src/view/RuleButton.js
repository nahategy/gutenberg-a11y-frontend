import ViewRule from "./view";
import HelperService from "../services/helper.service";
import RuleApplicator from "../rule/RuleApplicator";
import FailedRuleExtractor from "../rule/FailedRuleExtractor";

const RULE_BUTTON_CONTAINER_CLASS = "rule-button-container";
const RULE_BUTTON_CLASS = "rule-button";

class RuleButton {
    static instance = null;

    failed_rules;
    is_created = false;

    constructor() {
        this.failed_rules = new Map();
        this.rule_applicator = null;
    }


    static GetInstance() {
        if (RuleButton.instance == null) {
            RuleButton.instance = new RuleButton();
            RuleButton.instance.create_button();
        }
        return RuleButton.instance;
    }

    create_button = async () => {
        if (this.is_created)
            return this.update_button()


        this.button_container = document.createElement('div');
        this.button_container.classList.add(RULE_BUTTON_CONTAINER_CLASS);

        this.button = document.createElement('button');
        this.button.classList.add(RULE_BUTTON_CLASS);
        this.button.innerHTML = this.error_number();
        this.button_container.appendChild(this.button);
        this.button_container.onclick = this.click;

        // Inserting the container before the editor
        // The editor is created by js, so the element which will contain the button may not exists on the first run
        await HelperService.waitFor('.interface-interface-skeleton__body', this.append_button_to_document);
        return this;
    }

    append_button_to_document = () => {
        const editor = document.querySelector('.interface-interface-skeleton__body');
        editor.parentNode.insertBefore(this.button_container, editor);
        this.is_created = true;
    }

    error_number = () => {
        let fail_number = 0;
        this.failed_rules.forEach((value) => {
            fail_number += value.length;
        })
        return fail_number;
    }

    update_button = () => {
        if (this.button)
            this.__set_rule_number();
        return this;
    }

    click = (ev) => {
        ev.preventDefault();
        let view_rule = new ViewRule
        this.open_sidebar_if_rules_failed(view_rule)
    }

    rewrite_rules = () => {
        console.log('Tree', this.rule_applicator.block_tree.structure[0].content);
        var output = "";
        for (var i = 0; i < this.rule_applicator.block_tree.structure.length; i++) {
            const wpTreeElementDummy = this.rule_applicator.block_tree.structure[i];
            console.log(i, wpTreeElementDummy)
            if (wpTreeElementDummy.failed_rules) {
                output += wpTreeElementDummy.toOriginalText();
            }
        }
        this.toggle_code_editor()
        var editor = this.getGutenbergCodeEditorElement();
        editor.prop("disabled", "");
        editor.focus();
        window.setNativeValue(editor[0], output)
        document.querySelector(".editor-post-text-editor").dispatchEvent(new Event("change", {bubbles: true}));
        document.querySelector(".editor-post-text-editor").dispatchEvent(new Event("blur", {bubbles: true}));
        this.button_container.focus();
        this.toggle_code_editor()

    }


    open_sidebar_if_rules_failed = (view_rule) => {
        this.toggle_code_editor()
        let gutenbergCodeEditor = this.getGutenbergCodeEditorElement();
        if (gutenbergCodeEditor.length == 0)
            return;
        this.rule_applicator = new RuleApplicator(gutenbergCodeEditor.val())
        this.rule_applicator.find_elements();
        this.rule_applicator.apply_rules(this.rewrite_rules);
        var fails = this.rule_applicator.get_failed_tree_elements();
        var result;
        var failed_rule_extractor = new FailedRuleExtractor(fails);
        if ((result = view_rule.function_hello(this.rule_applicator.get_failed_tree_elements()))) {
            this.toggle_code_editor();
        }
        return result
    }

    getGutenbergCodeEditorElement() {
        let gutenbergCodeEditor = jQuery('.editor-post-text-editor');
        return gutenbergCodeEditor;
    }

    toggle_code_editor = () => {
        jQuery('.edit-post-more-menu').find('button').click();
        jQuery('.components-menu-item__shortcut:contains("Ctrl+Shift+Alt+M")').closest('.components-button').click();
        jQuery('.editor-post-text-editor').attr('disabled', 'disabled');
        jQuery('.edit-post-more-menu').find('button').click();
    }

    remove = () => {
        if (this.button)
            this.button.remove();
        if (this.button_container)
            this.button_container.remove();
    }

}

export default RuleButton;
