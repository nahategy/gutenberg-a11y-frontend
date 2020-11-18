import ViewRule from "./view";

const RULE_BUTTON_CONTAINER_CLASS = "rule-button-container";
const RULE_BUTTON_CLASS = "rule-button";
const RULE_BUTTON_CLASS_SELECTOR = `.${RULE_BUTTON_CONTAINER_CLASS}`;

class RuleButton {
    html_element;
    rules;
    button_container;
    button;

    constructor(element, rules) {
        this.html_element = element;
        this.rules = rules;
        this.html_element.onclick = this.click.bind(this);
        this.create_button();
    }

    create_button() {
        const existing_button = this.html_element.parentNode.querySelector(RULE_BUTTON_CLASS_SELECTOR);
        console.log('exbtn', existing_button);
        if (this.button_container || existing_button) {
            this.button_container = existing_button;
            this.update_button();
        }
        if (existing_button)
            return
        const coordinates = this.html_element.getBoundingClientRect();
        this.button_container = document.createElement('div');
        this.button_container.classList.add(RULE_BUTTON_CONTAINER_CLASS);

        this.button = document.createElement('button');
        this.button.classList.add(RULE_BUTTON_CLASS);
        this.button_container.appendChild(this.button);

        this.button_container.onclick = this.click.bind(this);

        this.button_container.style.left = `${coordinates.right}px`;
        if (!existing_button)
            this.html_element.parentNode.appendChild(this.button_container);

        this.button_container = true;
        return this;
    }

    update_button() {
        console.log('update', this.button_container);
        return this;
    }

    click(ev) {
        ev.preventDefault();
        let v = new ViewRule;
        v.function_hello(this.rules);
    }

}

export default RuleButton;
