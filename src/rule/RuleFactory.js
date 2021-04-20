import {BLOCk_PARAGRAPH,} from '../common/block_types';
import ImageAltTextRule from "../rules/ImageAltTextRule";
import FontSize from "../rules/FontSize";
import AdjacentLinks from "../rules/AdjacentLinks";
import ImageAltTextLength from "../rules/ImageAltTextLength";


class RuleFactory {
    static getRules() {
        return [
            ImageAltTextRule,
            ImageAltTextLength,
            FontSize,
            // AdjacentLinks
        ]
    }
}

export default RuleFactory;
