class RulesService {
    static ELEMENTS_TO_WATCH = new Map();

    static applyRules(element) {
        RulesService.ELEMENTS_TO_WATCH.set(element, element)
        console.log(element.dataset.type);
    }

    static removeRules(element) {
        RulesService.ELEMENTS_TO_WATCH.delete(element);
    }


    static getRules() {
        return RulesService.ELEMENTS_TO_WATCH;
    }

}

export default RulesService;
