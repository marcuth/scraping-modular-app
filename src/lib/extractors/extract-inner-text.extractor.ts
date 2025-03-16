import { HTMLElement } from "node-html-parser"

export function extractInnerText(element: HTMLElement) {
    return element.innerText
}