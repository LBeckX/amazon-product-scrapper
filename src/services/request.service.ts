import * as axios from "axios";
import {AxiosResponse, ResponseType} from "axios";

type RequestOptions = { timeout?: number, clientIp?: string, language?: string, currency?: string }

export class RequestService {

    public axios = axios.default;

    async get(url: URL, options?: RequestOptions, responseType: ResponseType = 'json'): Promise<AxiosResponse> {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'accept': '*/*',
            'accept-encoding': '',
            'X-Forwarded-For': options?.clientIp || '',
            'referer': 'https://google.com/',
            'pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'Cookie': ''
        };

        const cookies: { [key: string]: string } = {
            "lc-acbde": options?.language || "de_DE",
            "i18n-prefs": options?.currency || "EUR"
        }

        headers['Cookie'] = Object.keys(cookies).map(c => (c + '=' + cookies[c])).join(';') + ';';

        return await this.axios.get(url.href, {
            baseURL: url.origin,
            timeout: options?.timeout || undefined,
            headers,
            responseType: responseType,
        });
    }
}
