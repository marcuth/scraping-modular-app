import { HTMLElement } from "node-html-parser"

export function extractRawText(element: HTMLElement) {
    return element.rawText
}