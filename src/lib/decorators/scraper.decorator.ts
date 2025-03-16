import { SCRAPER_OPTIONS_KEY } from "../constants"
import { ClientFetchSourceOptions } from "../interfaces/client.interface"

export type ScraperOptions = {
    name?: string
    requests: ClientFetchSourceOptions[]
}

export function Scraper(options: ScraperOptions) {
    return (target: Function) => {
        const className = target.name
        
        const updatedOptions = {
            ...options,
            name: className
        }

        return Reflect.defineMetadata(SCRAPER_OPTIONS_KEY, updatedOptions, target)
    }
}

export function getScraperMetadata(target: Function): ScraperOptions {
    return Reflect.getMetadata(SCRAPER_OPTIONS_KEY, target)
}