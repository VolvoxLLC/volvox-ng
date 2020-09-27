import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(
        private myHttpClient: HttpClient,
    ) {
    }

    public getAccessToken(): string {
        return window.localStorage.getItem('jwtAccessToken');
    }

    public setAccessToken(token: string): void {
        window.localStorage.setItem('jwtAccessToken', token);
    }

    public removeAccessToken(): void {
        window.localStorage.removeItem('jwtAccessToken');
    }

    public get<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Observable<T> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, {headers});
    }

    public async getAsync<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<T> {
        return this.get<T>(url, headers, preventAuth).toPromise();
    }

    /**
     * @deprecated use get instead
     */
    public async httpGet<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<T> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, {headers}).toPromise();
    }

    public getWithHeaders<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Observable<HttpResponse<T>> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, {headers, observe: 'response'});
    }

    public async getWithHeadersAsync<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<HttpResponse<T>> {
        return this.getWithHeaders<T>(url, headers, preventAuth).toPromise();
    }

    /**
     * @deprecated use getWithHeaders instead
     */
    public async httpGetWithHeaders<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<HttpResponse<T>> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, {headers, observe: 'response'}).toPromise();
    }

    public patch<T>(url: string, data?: T, headers?: HttpHeaders): Observable<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.patch(url, data, {headers});
    }

    public async patchAsync<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        return this.patch(url, data, headers).toPromise();
    }

    /**
     * @deprecated use patch instead
     */
    public async httpPatch<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.patch(url, data, {headers}).toPromise();
    }

    public put<T>(url: string, data?: T, headers?: HttpHeaders): Observable<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.put(url, data, {headers});
    }

    public async putAsync<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        return this.put(url, data, headers).toPromise();
    }

    /**
     * @deprecated use put instead
     */
    public async httpPut<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.put(url, data, {headers}).toPromise();
    }

    public post<T>(url: string, data?: T, headers?: HttpHeaders): Observable<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.post(url, data, {headers});
    }

    public async postAsync<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        return this.post(url, data, headers).toPromise();
    }

    /**
     * @deprecated use post
     */
    public async httpPost<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.post(url, data, {headers}).toPromise();
    }

    public delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
        headers = this.getHeaders(headers);
        return this.myHttpClient.delete<T>(url, {headers});
    }

    public async deleteAsync(url: string, headers?: HttpHeaders): Promise<any> {
        return this.delete(url, headers).toPromise();
    }

    /**
     * @deprecated use delete instead
     */
    public async httpDelete(url: string, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers);
        return this.myHttpClient.delete(url, {headers}).toPromise();
    }

    public loadExternalScript(path: string, attributes?: { key: string, value: string }[],
                              onLoad?: ((this: GlobalEventHandlers, ev: Event) => any)): void {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = path;
        script.async = true;

        if (onLoad) {
            script.onload = onLoad;
        }

        if (attributes) {
            for (const attribute of attributes) {
                script.setAttribute(attribute.key, attribute.value);
            }
        }

        document.body.append(script);
    }

    private getHeaders(headers?: HttpHeaders, json?: boolean): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }

        if (json) {
            headers = headers.append('Content-Type', 'application/json');
        }

        if (this.getAccessToken()) {
            return headers.append('Authorization', `Bearer ${ this.getAccessToken() }`);
        }
        return headers;
    }
}
