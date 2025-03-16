import * as jmespath from "jmespath"

import { JSON_EXTRACT_KEY } from "../constants"

export function JsonExtract(path: string) {
    return (target: any, key: string) => {
        return Reflect.defineMetadata(JSON_EXTRACT_KEY, path, target, key)
    }
}

export function getJsonExtractMetadata(target: any, key: string) {
    return Reflect.getMetadata(JSON_EXTRACT_KEY, target, key)
}

export function extractJsonData(data: Record<string, any>, target: any) {
    for (const key of Object.keys(target)) {
        const query = getJsonExtractMetadata(target, key)

        if (query) {
            target[key] = jmespath.search(data, query)
        }
    }
}