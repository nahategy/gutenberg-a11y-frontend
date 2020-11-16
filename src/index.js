import _ from 'lodash';
import './style.css';
import HelperService from "./services/helper.service";
import ViewRule from "./view/view";

HelperService.docReady(async function () {
    var view1 = new ViewRule();
    view1.function_hello();


    HelperService.initializeAccessibilityChecker();
});












