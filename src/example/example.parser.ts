import { extractInnerText, extractHref } from "../lib/extractors"
import { Parser, HtmlExtract } from "../lib/decorators"

@Parser({ mode: "html" })
export class ExampleParser {
    @HtmlExtract({ query: "title", extractor: extractInnerText })
    title: string

    @HtmlExtract({ query: "a", extractor: extractHref, isGroup: true })
    links: string[]
}