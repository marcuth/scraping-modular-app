import { Scraper } from "../lib/decorators"

@Scraper({
    requests: [
        {
            url: "https://example.com",
        }
    ]
})
export class ExampleScraper {}