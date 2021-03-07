import HelperService from "../services/helper.service";
import RulesService from "../services/rules.service";
import RuleButton from "../view/RuleButton";

class ARule {
  html_element;
  error;
  error_description;
  observer;
  rule_button;
  name;

  constructor(html_element) {
    if (new.target === ARule)
      throw new TypeError("Cannot construct Abstract Rule directly")
    this.html_element = html_element;
    this.rule_button = new RuleButton.get_instance();
  }

  listen() {
    const config = {childList: true};
    this.observer = new MutationObserver(this._run.bind(this));
    this.observer.observe(this.html_element, config);
    this.html_element.oninput = this._run.bind(this);
  }

  cancel() {
    console.log('Cancel rule')
    this.observer.disconnect();
    this.rule_button.remove();
  }

  _run() {
    const result = this.run();
    if (!result) {
      window.accessibility_errors.delete(this.html_element);
      if (this.rule_button.is_created) {
        this.rule_button.set_rules(new Map())
      }
      return;
    }

    let failed_rules = window.accessibility_errors.get(this.html_element);
    if (!failed_rules)
      failed_rules = new Map();
    failed_rules.set(this.constructor.name, this);
    window.accessibility_errors.set(this.html_element, failed_rules);

    if (this.html_element && this.html_element.toString() != '') {
      this.rule_button.create_button();
    }
    if (this.rule_button.is_created) {
      this.rule_button.set_rules(failed_rules);
    }
  }

  run() {
    throw new Error("Run method not Implemented yet!")
  }

  get name() {
    return HelperService.language.get_translation(this.name)
  }

  get error() {
    return this.error;
  };

  get error_description() {
    return HelperService.language.get_translation(this.error_description)
  };

  get wcag_link() {
    throw new Error("wcag_link Method not Implemented yet!")
  }

}


export default ARule;
