import { ParseMode } from "../enums/parse-mode.enum"
import { PARSER_MODE_KEY } from "../constants"

export function SwitchToHtml() {
    return (target: any, key: string) => {
        return Reflect.defineMetadata(PARSER_MODE_KEY, ParseMode.Html, target, key)
    }
}

export function getParseMode(target: any, key: string): `${ParseMode}` | undefined {
    return Reflect.getMetadata(PARSER_MODE_KEY, target, key)
}