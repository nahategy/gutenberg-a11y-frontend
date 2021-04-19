import {BLOCk_PARAGRAPH,} from '../common/block_types';
import ImageAltTextRule from "../rules/ImageAltTextRule";
import FontSize from "../rules/FontSize";
import AdjacentLinks from "../rules/AdjacentLinks";


class RuleFactory {
  static getRules() {
    return [
      ImageAltTextRule,
      // FontSize,
      // AdjacentLinks
    ]
  }
}

export default RuleFactory;
