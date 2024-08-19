import * as axios from "axios";
import {AxiosResponse, ResponseType} from "axios";
import {rand} from "../utils/number.util.js";

type RequestOptions = { timeout?: number, clientIp?: string, lang?: string, i18nPrefs?: string }

export class RequestService {

    public axios = axios.default;

    async get(url: URL, options?: RequestOptions, responseType: ResponseType = 'json'): Promise<AxiosResponse> {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'accept': '*/*',
            'accept-encoding': '',
            'X-Forwarded-For': options?.clientIp || '',
            'pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'Cookie': `session-id=260-${rand(1000000, 9999999)}-${rand(1000000, 9999999)};session-id-time=2082787201l;`,
        }

        const cookies: { [key: string]: string } = {
            "lc-acbde": options?.lang || "de_DE",
            "i18n-prefs": options?.i18nPrefs || "EUR"
        }

        headers['Cookie'] = Object.keys(cookies).map(c => (c + '=' + cookies[c])).join(';') + ';'

        return await this.axios.get(url.href, {
            baseURL: url.origin,
            timeout: options?.timeout || undefined,
            headers,
            responseType: responseType,
        })
    }
}
