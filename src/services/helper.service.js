import get_language_file from "./language.service";
import ContrastRule from "../rules/ContrastRule";

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
        const config = {attributes: true, childList: true, subtree: true};
        const observer = new MutationObserver(function (mutationlist, observeer) {
            console.log(mutationlist);
            console.log(observeer);
        });
        observer.observe(node, config)
    }

}


export default HelperService;
