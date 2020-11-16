import {BLOCk_PARAGRAPH,} from '../common/block_types';
import ImageAltTextRule from "../rules/ImageAltTextRule";


class RuleFactory {
    static getRulesByBlockType(block_type) {
        var rules = [];
        switch (block_type) {
            case BLOCk_PARAGRAPH:
                rules = [ImageAltTextRule]

            default:
                break;
        }
        return rules;
    }
}

export default RuleFactory;
