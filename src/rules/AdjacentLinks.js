import ARule from "./AbstractRule";

class AdjacentLinks extends ARule {

    error_description = "AdjacentLinks error"
    name = "AdjacentLinks";

    _run = () => {
        if (!this.block_content)
            return;


        for (let i = 0; i < this.block_content.length; i++) {
            this.test(this.block_content[i])
        }

    }

    onlyChild = parent => {
        return !parent.firstElementChild
    }

    test = (element) => {
        if (!this.onlyChild(element))
            for (let i = 0; i < element.childNodes.length; i++) {
                this.test(element.childNodes[i])
            }

        for (let i = 0; i < element.childNodes.length - 1; i++) {
            let elem1 = element.childNodes[i];
            let elem2 = element.childNodes[i + 1];

            if (elem1.nodeName === "A" && elem2.nodeName === "#text") {
                elem2 = element.childNodes[i++ + 1]
            }

            if (this.shouldMergeAnchors(elem1, elem2)) {
                this.fails.push(elem2)
            }
        }
    }


    repair = (ev) => {
        ev.preventDefault();
        this.fails[this.currentNumber].href = "";
        this._update();
    }


    shouldMergeAnchors = (elem1, elem2) => {
        if (!elem1 || !elem2 || elem1.tagName !== "A" || elem2.tagName !== "A") {
            return false
        }
        return elem1.getAttribute("href") === elem2.getAttribute("href")
    }

}


export default AdjacentLinks;