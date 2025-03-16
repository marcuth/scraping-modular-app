import axios from "axios"

import { ClientFetchSourceOptions } from "../lib/interfaces/client.interface"
import { ClientInterface } from "../lib/interfaces"
import { Client } from "../lib/decorators"

@Client()
export class ExampleClient implements ClientInterface {
    async fetchSource(options: ClientFetchSourceOptions): Promise<string> {
        const response = await axios.get(options.url, options)
        return response.data
    }
}