import './style.css';
import HelperService from "./services/helper.service";
import 'bootstrap'

window.accessibility_errors = new Map();

HelperService.docReady(async function () {
    HelperService.initializeAccessibilityChecker();
});












