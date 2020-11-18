import ViewRule from "./view";

const RULE_BUTTON_CLASS = "rule-button";
const RULE_BUTTON_CLASS_SELECTOR = `.${RULE_BUTTON_CLASS}`;

class RuleButton {
    html_element;
    rules;
    button;

    constructor(element, rules) {
        this.html_element = element;
        this.rules = rules;
        this.html_element.onclick = this.click.bind(this);
        this.create_button();
    }

    create_button() {
        if (this.button) {
            this.update_button();
            return;
        }
        const coordinates = this.html_element.getBoundingClientRect()
        this.button = document.createElement('button');
        this.button.classList.add(RULE_BUTTON_CLASS);

        this.button.style.top = coordinates.top;
        this.button.style.right = coordinates.right;
        this.button.onclick = this.click.bind(this);
        document.body.appendChild(this.button);
    }

    update_button() {
        existing_button.html('asdasdadaasd');
    }

    click(ev) {
        ev.preventDefault();
        let v = new ViewRule;
        v.function_hello(this.rules);
    }

}

export default RuleButton;
