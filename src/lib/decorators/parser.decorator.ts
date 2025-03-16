import { ParseMode } from "../enums/parse-mode.enum"
import { PARSER_OPTIONS_KEY } from "../constants"

export type ParserOptions = {
    name?: string
    mode?: `${ParseMode}`
}

export function Parser(options?: ParserOptions) {
    return (target: Function) => {
        const className = target.name
        
        const updatedOptions = {
            ...options,
            name: className
        }

        Reflect.defineMetadata(PARSER_OPTIONS_KEY, updatedOptions, target)

        const handler = {
            construct(target: any, args: any[]) {
                if (!args[0]) {
                    throw new Error(`A propriedade 'source' é obrigatória ao criar uma instância de ${className}`)
                }

                const instance = new target(...args)

                return instance
            }
        }

        const proxyClass = new Proxy(target, handler)

        return proxyClass
    }
}

export function getParserMetadata(target: Function): ParserOptions {
    return Reflect.getMetadata(PARSER_OPTIONS_KEY, target)
}