import winston from "winston"

import { ClientInterface, ModuleInterface, ParserInterface, ScraperInterface, TransformerInterface } from "../lib/interfaces"
import { getModuleMetadata } from "./decorators/module.decorator"

export type CreateScrapingAppOtions = {
    modules: (new (...args: any[]) => ModuleInterface)[]
}

export type ModuleMetadata = {
    name: string
    scraper: new (client: ClientInterface) => ScraperInterface
    client: new () => ClientInterface
    parser: new (sources: string[]) => ParserInterface
    transformer: new (data: any[]) => TransformerInterface
}

export function createScrapingApp({ modules }: CreateScrapingAppOtions) {
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "application.log" })
        ],
    })

    const modulesMetadata: ModuleMetadata[] = []

    for (const module of modules) {
        const metadata = getModuleMetadata(module)
        logger.info(`Loading module ${metadata.name}`)
        modulesMetadata.push(metadata)
    }

    return {
        execute(name: string) {
            const moduleMetadata = modulesMetadata.find(metadata => metadata.name === name)

            if (!moduleMetadata) {
                throw new Error(`The module ${name} has not found!`)
            }

            const client = new moduleMetadata.client()
            const scraper = new moduleMetadata.scraper(client)
            const parser = new moduleMetadata.parser()
        },
        executeAll() {

        }
    }
}