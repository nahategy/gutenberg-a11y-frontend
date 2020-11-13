import get_language_file from "./language.service";
import ContrastRule from "../rules/ContrastRule";
import RulesService from "./rules.service";

class HelperService {
    static language;

    static docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    static initializeAccessibilityChecker() {
        HelperService.language = get_language_file()
        let rule = new ContrastRule();
        rule.run();
        console.log(rule.error_description);
        HelperService.initializeLib()

    }

    static initializeLib() {
        let node = document.getElementsByClassName('block-editor-block-list__layout is-root-container')[0];
        if (!node) {
            setTimeout(HelperService.initializeLib, 500);
            return
        }
        const config = {childList: true};
        const observer = new MutationObserver(function (mutationlist, observeer) {
            if (mutationlist.length > 0) {
                for (let mutation in mutationlist) {
                    mutation = mutationlist[mutation];
                    if (mutation.addedNodes.length > 0) {
                        RulesService.applyRules(mutation.addedNodes[0]);
                    }

                    if (mutation.removedNodes.length > 0) {
                        RulesService.removeRules(mutation.removedNodes[0]);
                    }
                }
            }
        });
        observer.observe(node, config)
    }
}


export default HelperService;
