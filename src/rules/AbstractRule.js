import HelperService from "../services/helper.service";
import RuleButton from "../view/RuleButton";

class ARule {
  block;
  error;
  error_description;
  rule_button;
  name;

  constructor(block) {
    if (new.target === ARule)
      throw new TypeError("Abstract Rule  Cannot be constructed directly")
    this.block = block;
    this.rule_button = RuleButton.GetInstance();
  }


  run = () => {
    const result = this._run();

    // Found no error - was no error | errors has been fixed
    if (!result) {
      return;
    }
    // TODO: beletenni a blockba hogy ha volt fail és melyik elemeken.
  }

  _run = () => {
    throw new Error("Run method not Implemented yet!")
  }

  get name() {
    return HelperService.language.get_translation(this.name)
  }

  get error() {
    return HelperService.language.get_translation(this.error);
  };

  get error_description() {
    return HelperService.language.get_translation(this.error_description)
  };

  get wcag_link() {
    throw new Error("wcag_link Method not Implemented yet!")
  }

  _update() {

  }

  update() {

  }

}


export default ARule;
