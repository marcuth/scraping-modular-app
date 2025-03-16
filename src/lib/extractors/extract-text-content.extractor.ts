import { HTMLElement } from "node-html-parser"

export function extractTextContent(element: HTMLElement) {
    return element.textContent
}