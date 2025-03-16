import "reflect-metadata"

import { ExampleModule } from "./example/example.module"
import { createScrapingApp } from "./lib/factory"

async function bootstrap() {
    const app = createScrapingApp({
        modules: [ExampleModule]
    })
}

bootstrap()