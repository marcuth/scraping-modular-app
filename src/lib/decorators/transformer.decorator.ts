import { TRANSFORMER_OPTIONS_KEY } from "../constants"

export type TransformerOptions = {
    name?: string
}

export function Transformer(options?: TransformerOptions) {
    return (target: Function) => {
        const className = target.name
        
        const updatedOptions = {
            ...options,
            name: className
        }

        return Reflect.defineMetadata(TRANSFORMER_OPTIONS_KEY, updatedOptions, target)
    }
}

export function getTransformerMetadata(target: Function): TransformerOptions {
    return Reflect.getMetadata(TRANSFORMER_OPTIONS_KEY, target)
}