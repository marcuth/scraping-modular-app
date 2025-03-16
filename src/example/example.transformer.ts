import { trimString } from "../lib/transformers"
import { Transformer } from "../lib/decorators"
import { Transform } from "../lib/decorators"

@Transformer()
export class ExampleTransformer {
    @Transform({ transformer: trimString })
    title: string

    @Transform({ transformer: trimString, isGroup: true })
    links: string[]
}