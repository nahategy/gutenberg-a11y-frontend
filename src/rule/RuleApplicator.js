class RuleApplicator {
    element;
    rules_to_apply;

    constructor(element, rules_to_apply) {
        this.element = element;
        this.rules_to_apply = rules_to_apply;
    }

    apply_rules() {
        for (let i = 0; i < this.rules_to_apply.length; i++) {
            const rule = this.rules_to_apply[i];
            let rule_object = new rule(this.element);
            rule_object.listen()
        }
    }

}

export default RuleApplicator;
