export default class AccessibilityContainer {
    elementToAttach = null;
    highlighter = null;

    constructor(elementToAttach) {
        let skeleton = document.querySelector(".interface-interface-skeleton__content");
        skeleton.addEventListener('scroll', this.onScroll);
        this.elementToAttach = elementToAttach;

        this.highlighter = document.createElement("div");
        this.highlighter.classList.add("a11y-highlighter");
        let htmlBodyElement = document.querySelector("body");
        htmlBodyElement.append(this.highlighter);
        this.onScroll();
    }


    onScroll = () => {
        const positions = this.elementToAttach.getBoundingClientRect();
        this.highlighter.style.top = `${positions.top}px`;
        this.highlighter.style.left = `${positions.left}px`;
        this.highlighter.style.width = `${positions.width}px`;
        this.highlighter.style.height = `${positions.height}px`;
    }

}