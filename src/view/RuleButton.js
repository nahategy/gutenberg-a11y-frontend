import ViewRule from "./view";
import HelperService from "../services/helper.service";

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

  get_failed_rules_for_element = (element) => {
    let failed_rules_of_element = this.failed_rules.get(element);
    if (failed_rules_of_element === undefined) {
      this.failed_rules.set(element, []);
      failed_rules_of_element = [];
    }
    return failed_rules_of_element;
  }
  set_failed_rules_for_element = (element, rules) => {
    this.failed_rules.set(element, rules);
    return this;
  }

  add_rule = (rule) => {
    const failed_rules = this.get_failed_rules_for_element(rule.html_element);
    failed_rules.push(rule);
    this.set_failed_rules_for_element(rule.html_element, failed_rules);
    this.__set_rule_number()
    return this;
  }

  __set_rule_number = () => {
    const number = this.error_number()
    console.log('Set rule number' + number)
    if (number > 0) {
      this.button.innerHTML = this.error_number();
    }
    // this.button.remove();
    // this.button_container.remove();
    // this.is_created = false;

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
    let view_rule = new ViewRule;
    view_rule.function_hello(this.failed_rules);
  }

  remove = () => {
    if (this.button)
      this.button.remove();
    if (this.button_container)
      this.button_container.remove();
  }

}

export default RuleButton;
