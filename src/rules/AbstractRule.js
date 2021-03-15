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
      throw new TypeError("Abstract Rule  Cannot be constructed directly")
    this.html_element = html_element;
    this.rule_button = RuleButton.GetInstance();
  }

  listen() {
    const config = {childList: true};
    this.observer = new MutationObserver(this._run.bind(this));
    this.observer.observe(this.html_element, config);
    this.html_element.oninput = this._run.bind(this);
  }

  cancel() {
    this.observer.disconnect();
  }

  _run() {
    const result = this.run();

    // Found no error - was no error | errors has been fixed
    if (!result) {
      return;
    }
    this.rule_button.add_rule(this);
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

    _update(){

    }

    update(){

    }

}


export default ARule;
