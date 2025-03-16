import { TRANSFORM_KEY } from "../constants"

export type Transformer = (value: any) => any

export type TransformOptions = {
    field?: string | null
    transformer: Transformer
    isGroup?: boolean
}


export function Transform(options: TransformOptions) {
    return (target: any, propertyKey: string) => {
        const field = options.field !== undefined ? options.field : propertyKey

        return Reflect.defineMetadata(TRANSFORM_KEY, {
            ...options,
            field: field
        }, target, propertyKey)
    }
}

export function getTransformMetadata(target: any, key: string): TransformOptions & { field: string } {
    return Reflect.getMetadata(TRANSFORM_KEY, target, key)
}