import {BLOCk_PARAGRAPH,} from '../common/block_types';
import ImageAltTextRule from "../rules/ImageAltTextRule";
import FontSize from "../rules/FontSize";
import AdjacentLinks from "../rules/AdjacentLinks";
import ImageAltTextLength from "../rules/ImageAltTextLength";
import HeaderOrder from "../rules/HeaderOrder";
import TextAlignJustified from "../rules/TextAlignJustified";
import TextUnderLine from "../rules/TextUnderLine";
import TableHeader from "../rules/TableHeader";
import TableCaption from "../rules/TableCaption";
import ImageAltTextFileName from "../rules/ImageAltTextFileName";


class RuleFactory {
    static getRules() {
        return [
            ImageAltTextRule,
            ImageAltTextLength,
            ImageAltTextFileName,
            FontSize,
            // AdjacentLinks,
            TableCaption,
            TableHeader,
            HeaderOrder,
            TextAlignJustified,
            TextUnderLine
        ]
    }
}

export default RuleFactory;
