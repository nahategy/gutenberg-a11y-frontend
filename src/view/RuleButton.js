import ViewRule from "./view";

const RULE_BUTTON_CONTAINER_CLASS = "rule-button-container";
const RULE_BUTTON_CLASS = "rule-button";
const RULE_BUTTON_CLASS_SELECTOR_CONTAINER = `.${RULE_BUTTON_CONTAINER_CLASS}`;
const RULE_BUTTON_CLASS_SELECTOR = `.${RULE_BUTTON_CLASS}`;

class RuleButton {
    html_element;
    rules;
    button_container;
    button;
    is_created = false;
    static instance = null;

    static get_instance(){
        if (RuleButton.instance != null){
          RuleButton.instance = RuleButton();
        }
        return RuleButton.instance;
    }

    set_rules(failed_rules) {
        this.rules = failed_rules;
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

    create_button() {
        const existing_button_container = this.html_element.parentNode.querySelector(RULE_BUTTON_CLASS_SELECTOR_CONTAINER);
        const existing_button = this.html_element.parentNode.querySelector(RULE_BUTTON_CLASS_SELECTOR);

        if (this.button_container || existing_button) {
            this.button_container = existing_button;
            this.button = existing_button;
            this.update_button();
        }
        if (existing_button)
            return
        const coordinates = this.html_element.getBoundingClientRect();
        this.button_container = document.createElement('div');
        this.button_container.classList.add(RULE_BUTTON_CONTAINER_CLASS);

        this.button = document.createElement('button');
        this.button.classList.add(RULE_BUTTON_CLASS);
        this.button.innerHTML = this.error_number();
        this.button_container.appendChild(this.button);

        this.button_container.onclick = this.click.bind(this);

        this.button_container.style.left = `${coordinates.right}px`;
        if (!existing_button)
            this.html_element.parentNode.appendChild(this.button_container);

        this.is_created = true;
        return this;
    }

    error_number() {
        const failed_rules_map = window.accessibility_errors.get(this.html_element);

        if (failed_rules_map !== undefined && failed_rules_map)
            return failed_rules_map.size;
        return 0;
    }

    update_button() {
        console.log("UPDATE");
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
