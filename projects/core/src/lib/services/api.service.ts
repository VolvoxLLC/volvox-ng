import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApiOptions } from '../models/api-options.model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(
        private readonly myHttpClient: HttpClient
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

    public get<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<T> {
        if (!options?.preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, { headers })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    public async getAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<T> {
        return this.get<T>(url, headers, options).toPromise();
    }

    /**
     * @deprecated use get instead
     */
    public async httpGet<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<T> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, { headers }).toPromise();
    }

    public getWithHeaders<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<HttpResponse<T>> {
        if (!options?.preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, { headers, observe: 'response' })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    public async getWithHeadersAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<HttpResponse<T>> {
        return this.getWithHeaders<T>(url, headers, options).toPromise();
    }

    /**
     * @deprecated use getWithHeaders instead
     */
    public async httpGetWithHeaders<T>(url: string, headers?: HttpHeaders, preventAuth?: boolean): Promise<HttpResponse<T>> {
        if (!preventAuth) {
            headers = this.getHeaders(headers);
        }

        return this.myHttpClient.get<T>(url, { headers, observe: 'response' }).toPromise();
    }

    public patch<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.patch(url, data, { headers })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    public async patchAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.patch<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * @deprecated use patch instead
     */
    public async httpPatch<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.patch(url, data, { headers }).toPromise();
    }

    public put<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.put(url, data, { headers })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    public async putAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.put<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * @deprecated use put instead
     */
    public async httpPut<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.put(url, data, { headers }).toPromise();
    }

    public post<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.post<T>(url, data, { headers })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    public async postAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.post<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * @deprecated use post
     */
    public async httpPost<T>(url: string, data?: T, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, true);
        return this.myHttpClient.post(url, data, { headers }).toPromise();
    }

    /**
     * makes an http delete call
     * @param url
     * @param headers
     * @param options
     * @returns Observable
     */
    public delete<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<T> {
        headers = this.getHeaders(headers);
        return this.myHttpClient.delete<T>(url, { headers })
            .pipe(
                catchError((err: any): Observable<any> => {
                    if (!options?.skipErrorHandling) {
                        throw err;
                    }
                    return of(err);
                }),
            );
    }

    /**
     * makes an http async delete call
     * @param url
     * @param headers
     * @param options
     * @return Promise
     */
    public async deleteAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<T> {
        return this.delete<T>(url, headers, options).toPromise();
    }

    /**
     * @deprecated use delete instead
     */
    public async httpDelete(url: string, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers);
        return this.myHttpClient.delete(url, { headers }).toPromise();
    }

    /**
     * Appends a script to the html body
     * @param path
     * @param attributes
     * @param onLoad
     */
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
