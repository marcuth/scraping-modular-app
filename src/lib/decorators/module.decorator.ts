import { ClientInterface, ParserInterface, ScraperInterface, TransformerInterface } from "../interfaces"
import { MODULE_OPTIONS_KEY } from "../constants"

export type ModuleOptions = {
    name?: string
    scraper: new (...args: any[]) => ScraperInterface
    client: new (...args: any[]) => ClientInterface
    parser: new (...args: any[]) => ParserInterface
    transformer: new (...args: any[]) => TransformerInterface
}

export function Module(options?: ModuleOptions) {
    return (target: Function) => {
        const className = target.name
        
        const updatedOptions = {
            ...options,
            name: className
        }

        return Reflect.defineMetadata(MODULE_OPTIONS_KEY, updatedOptions, target)
    }
}

export function getModuleMetadata(target: Function): ModuleOptions & { name: string } {
    return Reflect.getMetadata(MODULE_OPTIONS_KEY, target)
}