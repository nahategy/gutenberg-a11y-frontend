import ViewRule from "./view";
import HelperService from "../services/helper.service";

const RULE_BUTTON_CONTAINER_CLASS = "rule-button-container";
const RULE_BUTTON_CLASS = "rule-button";

class RuleButton {
  static instance = null;

  html_element;
  rules;
  is_created = false;

  constructor() {

  }


  static GetInstance() {
    if (RuleButton.instance == null) {
      RuleButton.instance = new RuleButton().create_button();
    }
    return RuleButton.instance;
  }

  add_rules(failed_rules) {
    this.rules = [...this.rules, ...failed_rules];
    if (this.button) {
      this.__set_rule_number()
    }
  }

  __set_rule_number() {
    const number = this.error_number()
    if (number > 0) {
      this.button.innerHTML = this.error_number();
      return;
    }
    this.button.remove();
    this.button_container.remove();
    this.is_created = false;

  }

  async create_button() {
    if (this.is_created)
      return this.update_button()


    this.button_container = document.createElement('div');
    this.button_container.classList.add(RULE_BUTTON_CONTAINER_CLASS);

    this.button = document.createElement('button');
    this.button.classList.add(RULE_BUTTON_CLASS);
    this.button.innerHTML = this.error_number();
    this.button_container.appendChild(this.button);
    this.button_container.onclick = this.click.bind(this);
    // Inserting the container before the editor
    await HelperService.waitFor('.interface-interface-skeleton__body', this.append_button_to_document.bind(this));
    return this;
  }

  append_button_to_document() {
    const editor = document.querySelector('.interface-interface-skeleton__body');
    editor.parentNode.insertBefore(this.button_container, editor);
    this.is_created = true;
  }

  error_number() {
    const failed_rules_map = window.accessibility_errors.get(this.html_element);
    if (failed_rules_map !== undefined && failed_rules_map)
      return failed_rules_map.size;
    return 0;
  }

  update_button() {
    if (this.button)
      this.__set_rule_number();
    return this;
  }

  click(ev) {
    ev.preventDefault();
    let v = new ViewRule;
    v.function_hello(this.rules);
  }

  remove() {
    if (this.button)
      this.button.remove();
    if (this.button_container)
      this.button_container.remove();
  }

}

export default RuleButton;
