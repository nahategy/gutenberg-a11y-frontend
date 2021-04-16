import ViewRule from "./view";
import HelperService from "../services/helper.service";
import RuleApplicator from "../rule/RuleApplicator";

const RULE_BUTTON_CONTAINER_CLASS = "rule-button-container";
const RULE_BUTTON_CLASS = "rule-button";

class RuleButton {
  static instance = null;

  html_element;
  failed_rules;
  is_created = false;

  constructor() {
    this.failed_rules = new Map();
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
    if (jQuery('.editor-post-text-editor').length == 0)
      return;
    const rule_applicator = new RuleApplicator(jQuery('.editor-post-text-editor').val())
    rule_applicator.find_elements();
    rule_applicator.apply_rules();
  }

  open_sidebar_if_rules_failed = (view_rule) => {
    this.toggle_code_editor()
    var result;
    if ((result = view_rule.function_hello(this.failed_rules))) {
      this.toggle_code_editor();
    }
    return result
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
