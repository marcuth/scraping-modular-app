import { AxiosRequestConfig } from "axios"

export type ClientFetchSourceOptions = AxiosRequestConfig & {
    url: string
}

export interface ClientInterface {
    fetchSource(options: ClientFetchSourceOptions): Promise<string>
}