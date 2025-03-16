import { HTMLElement } from "node-html-parser"

export function extractAttribute(key: string) {
    return (element: HTMLElement) => {
        return element.getAttribute(key)
    }
}