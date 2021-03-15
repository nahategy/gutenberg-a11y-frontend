import get_language_file from "./language.service";
import RulesService from "./rules.service";
import RuleButton from "../view/RuleButton";

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
    HelperService.initializeLib()
    window.addEventListener('unload', HelperService.beforeUnload)
    RuleButton.GetInstance();
  }

  static beforeUnload() {
    const buttons = document.querySelectorAll('.rule-button_container');
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.remove();
    }
  }

  static initializeLib() {
    let node = document.getElementsByClassName('block-editor-block-list__layout is-root-container')[0];
    if (!node) {
      setTimeout(HelperService.initializeLib, 500);
      return
    }
    const config = {childList: true};
    const observer = new MutationObserver(function (mutation_list, observeer) {
      if (mutation_list.length > 0) {
        for (let mutation in mutation_list) {
          mutation = mutation_list[mutation];
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


  static async waitFor(selector, cb) {
    console.log('waiting for: ', selector)
    return setTimeout(async () => {
      if (document.querySelector(selector) == null)
        return await this.waitFor(selector, cb);
      cb();
      console.log('waiting finished for: ', selector)
    }, 500);
  }

}


export default HelperService;
