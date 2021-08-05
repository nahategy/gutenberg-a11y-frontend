import './style.css';
import HelperService from "./services/helper.service";

window.accessibility_errors = new Map();

HelperService.docReady(async function () {
  HelperService.initializeAccessibilityChecker();
});












