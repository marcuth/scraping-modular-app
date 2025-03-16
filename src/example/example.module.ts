import { Module } from "../lib/decorators"

import { ExampleTransformer } from "./example.transformer"
import { ExampleScraper } from "./example.scraper"
import { ExampleParser } from "./example.parser"
import { ExampleClient } from "./example.client"

@Module({
    client: ExampleClient,
    scraper: ExampleScraper,
    parser: ExampleParser,
    transformer: ExampleTransformer
})
export class ExampleModule {}