import get_language_file from "./language.service";

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

    }

}


export default HelperService;
