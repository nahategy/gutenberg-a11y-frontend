import './style.css';
import HelperService from "./services/helper.service";

window.accessibility_errors = new Map();

HelperService.docReady(async function () {
  HelperService.initializeAccessibilityChecker();
});


window.setNativeValue = function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}









