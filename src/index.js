import './style.css';
import HelperService from "./services/helper.service";

window.accessibility_errors = ['asd'];

HelperService.docReady(async function () {
    HelperService.initializeAccessibilityChecker();
});












