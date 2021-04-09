import ARule from "./AbstractRule";

class AdjacentLinks extends ARule {

    error_description = "AdjacentLinks error"
    name = "AdjacentLinks";

    run() {


        if (!this.block)
            return;

        const images = this.block.querySelectorAll('img');
        if (!images)
            return;

        if (this.block.tagName !== "A") {
            return;
        }
        if (!this.shouldMergeAnchors()) {
            console.log('184*/*/7*/');
            console.log(this.block);
            return this;
        }

    }

    update() {
        const rootElem = this.block.parentNode
        if (data.combine) {
            const next = elem.nextElementSibling

            // https://www.w3.org/TR/WCAG20-TECHS/H2.html
            const image = descendantImageWithRedundantAltText(elem, next)
            if (image) {
                image.setAttribute("data-decorative", "true")
                image.setAttribute("alt", "")
            }

            rootElem.removeChild(next)
            elem.innerHTML += ` ${next.innerHTML}`
        }
        return elem
    }


    shouldMergeAnchors = () => {
        const elem1 = this.block;
        const elem2 = this.block.nextSibling;

        if (!elem1 || !elem2 || elem1.tagName !== "A" || elem2.tagName !== "A") {
            return false
        }
        return elem1.getAttribute("href") === elem2.getAttribute("href")
    }


    notWhitespace = node => {
        return node.nodeType !== Node.TEXT_NODE || node.textContent.match(/\S/)
    }


    onlyChild = parent => {
        let child = parent.firstElementChild
        if (!child) {
            return null
        }
        if ([...parent.childNodes].filter(notWhitespace).length > 1) {
            return null
        }
        return child
    }


    solitaryDescendantImage = link => {
        let parent = link
        let child = onlyChild(parent)
        while (child) {
            if (child.tagName === "IMG") {
                return child
            }
            parent = child
            child = onlyChild(parent)
        }
        return null
    }


    normalizeText = text => {
        // normalize whitespace and trim leading and trailing whitespace
        return text.replace(/\s+/g, " ").trim()
    }


    descendantImageWithRedundantAltText = (left, right) => {
        let leftImage = solitaryDescendantImage(left)
        let rightImage = solitaryDescendantImage(right)
        if (
            leftImage &&
            !rightImage &&
            normalizeText(leftImage.getAttribute("alt")) ===
            normalizeText(right.textContent)
        ) {
            return leftImage
        } else if (
            rightImage &&
            !leftImage &&
            normalizeText(rightImage.getAttribute("alt")) ===
            normalizeText(left.textContent)
        ) {
            return rightImage
        } else {
            return null
        }
    }

}


export default AdjacentLinks;

// export default {
//     id: "adjacent-links",
//     test: function (elem) {
//
//     },
//
//     data: elem => {
//         return {
//             combine: false
//         }
//     },
//
//     form: () => [
//         {
//             label: formatMessage("Merge links"),
//             checkbox: true,
//             dataKey: "combine"
//         }
//     ],
//
//     update: function (elem, data) {
//         const rootElem = elem.parentNode
//         if (data.combine) {
//             const next = elem.nextElementSibling
//
//             // https://www.w3.org/TR/WCAG20-TECHS/H2.html
//             const image = descendantImageWithRedundantAltText(elem, next)
//             if (image) {
//                 image.setAttribute("data-decorative", "true")
//                 image.setAttribute("alt", "")
//             }
//
//             rootElem.removeChild(next)
//             elem.innerHTML += ` ${next.innerHTML}`
//         }
//         return elem
//     },
//
//     rootNode: function (elem) {
//         return elem.parentNode
//     },
//
//     message: () =>
//         formatMessage("Adjacent links with the same URL should be a single link."),
//
//     why: () =>
//         formatMessage(
//             "Keyboards navigate to links using the Tab key. Two adjacent links that direct to the same destination can be confusing to keyboard users."
//         ),
//
//     link: "https://www.w3.org/TR/WCAG20-TECHS/H2.html",
//     linkText: () => formatMessage("Learn more about adjacent links")
// }
