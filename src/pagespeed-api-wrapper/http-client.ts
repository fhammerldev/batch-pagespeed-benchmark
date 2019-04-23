const fetch: any = require("node-fetch");

export class HttpClient {
    public async httpGet(url: string): Promise<any> {
        return fetch(url);
    }
}
