import parse, { HTMLElement } from "node-html-parser"

import { HTML_EXTRACT_KEY } from "../constants"

export type Extractor = (element: HTMLElement) => string | undefined

export type HtmlExtractOptions = {
    query: string
    extractor: Extractor
    isGroup?: boolean
}

export function HtmlExtract(options: HtmlExtractOptions) {
    return (target: any, key: string) => {
        return Reflect.defineMetadata(HTML_EXTRACT_KEY, options, target, key)
    }
}

export function getHtmlExtractMetadata(target: Function, key: string): HtmlExtractOptions {
    return Reflect.getMetadata(HTML_EXTRACT_KEY, target, key)
}

export function extractHtmlData(source: string, target: any) {
    for (const key of Object.keys(target)) {
        const options = getHtmlExtractMetadata(target, key)

        if (options) {
            const root = parse(source)
            
            if (options.isGroup) {
                const foundElements = root.querySelectorAll(options.query)
                return target[key] = foundElements.map(options.extractor)
            }
 
            const foundElement = root.querySelector(options.query)

            if (!foundElement) {
                throw new Error("Not found element!")
            }

            target[key] = options.extractor(foundElement)
        }
    }
}