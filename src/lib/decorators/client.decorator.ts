import { CLIENT_OPTIONS_KEY } from "../constants"

export type ClientOptions = {
    name?: string
}

export function Client(options?: ClientOptions) {
    return (target: Function) => {
        const className = target.name
        
        const updatedOptions = {
            ...options,
            name: className
        }

        return Reflect.defineMetadata(CLIENT_OPTIONS_KEY, updatedOptions, target)
    }
}

export function getClientMetadata(target: Function) {
    return Reflect.getMetadata(CLIENT_OPTIONS_KEY, target)
}