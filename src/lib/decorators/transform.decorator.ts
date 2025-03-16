import { TRANSFORM_KEY } from "../constants"

export type Transformer = (value: any) => any

export type TransformOptions = {
    key?: string
    transformer: Transformer
    isGroup?: boolean
}


export function Transform(options: TransformOptions) {
    return (target: any, propertyKey: string) => {
        const finalKey = options.key ?? propertyKey

        return Reflect.defineMetadata(TRANSFORM_KEY, {
            ...options,
            finalKey: finalKey
        }, target, propertyKey)
    }
}

export function getTransformMetadata(target: any, key: string): TransformOptions & { finalKey: string } {
    return Reflect.getMetadata(TRANSFORM_KEY, target, key)
}