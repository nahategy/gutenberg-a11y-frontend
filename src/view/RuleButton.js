import ViewRule from "./view";

const RULE_BUTTON_CLASS = "rule-button";
const RULE_BUTTON_CLASS_SELECTOR = `.${RULE_BUTTON_CLASS}`;

class RuleButton {
    html_element;
    rules;

    constructor(element, rules) {
        this.html_element = element;
        this.rules = rules;
        this.html_element.onclick = this.click.bind(this);
        this.remove_button();
        this.create_button();
    }

    remove_button() {
        const existing_button = this.html_element.querySelector(RULE_BUTTON_CLASS_SELECTOR);
        if (existing_button)
            existing_button.remove();
        return this;
    }

    create_button() {
        const button = document.createElement('button');
        button.classList.add(RULE_BUTTON_CLASS);
        this.html_element.appendChild(button);
        return this;
    }

    click() {
        let v = new ViewRule;
        v.function_hello(this.rules);
    }

}

export default RuleButton;
