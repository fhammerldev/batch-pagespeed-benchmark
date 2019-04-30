import { Observable, from } from "rxjs";

const fetch: any = require("node-fetch");

export class HttpClient {
    public httpGet(url: string): Observable<any> {
        return from(fetch(url));
    }
}
