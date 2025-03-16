import { stringToNumber } from "./string-to-number.transformer"
import { toInt } from "./to-int.transformer"

export function stringToInt(value: string) {
    return toInt(
        stringToNumber(value)
    )
}