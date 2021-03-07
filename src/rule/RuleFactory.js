import {BLOCk_PARAGRAPH,} from '../common/block_types';
import ImageAltTextRule from "../rules/ImageAltTextRule";
import FontSize from "../rules/FontSize";


class RuleFactory {
  static getRulesByBlockType(block_type) {
    var rules = [];
    switch (block_type) {
      case BLOCk_PARAGRAPH:
        rules = [ImageAltTextRule, FontSize]
      default:
        break;
    }
    return rules;
  }
}

export default RuleFactory;
