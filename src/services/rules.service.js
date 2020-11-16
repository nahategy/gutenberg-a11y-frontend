import RuleFactory from "../rule/RuleFactory";
import RuleApplicator from "../rule/RuleApplicator";

class RulesService {
    static RULES_TO_RUN = new Map();

    static applyRules(element) {
        RulesService.RULES_TO_RUN.set(element, RulesService.createRules(element))
    }

    static removeRules(element) {
        RulesService.RULES_TO_RUN.delete(element);
    }


    static getRules() {
        return RulesService.RULES_TO_RUN;
    }

    static createRules(element) {
        const type = element.dataset.type;
        const rules_to_apply = RuleFactory.getRulesByBlockType(type);
        return new RuleApplicator(element, rules_to_apply).apply_rules()
    }

}

export default RulesService;
