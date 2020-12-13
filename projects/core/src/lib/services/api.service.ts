import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApiOptions } from '../models/api-options.model';
import { ITokenSettings } from '../models/token-settings.model';
import { isNullOrEmpty } from '../utils/commons.util';
import { LoggerService } from './logger.service';

export const LOCAL_STORAGE_TOKEN_KEY = 'volvoxTokenSettings';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(
        private readonly myLoggerService: LoggerService,
        private readonly myHttpClient: HttpClient,
    ) {
    }

    /**
     * Gets an access token
     * @deprecated use getToken()
     */
    public getAccessToken(): string {
        return window.localStorage.getItem('jwtAccessToken');
    }

    /**
     * Sets an access token
     * @param token
     * @deprecated use setToken()
     */
    public setAccessToken(token: string): void {
        window.localStorage.setItem('jwtAccessToken', token);
    }

    /**
     * Removes an access token from local storage
     * @deprecated use deleteAccessToken()
     */
    public removeAccessToken(): void {
        window.localStorage.removeItem('jwtAccessToken');
    }

    /**
     * Sets the token
     * @param tokenSettings
     */
    public setToken(tokenSettings: ITokenSettings): void {
        window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(tokenSettings));
    }

    /**
     * Gets token
     */
    public getToken(): ITokenSettings {
        const tokenSettings: string = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (!isNullOrEmpty(tokenSettings)) {
            return JSON.parse(tokenSettings);
        }
    }

    /**
     * Deletes token
     */
    public deleteToken(): void {
        window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }

    /**
     * Makes an async http get call
     * @param url
     * @param headers
     * @param options
     */
    public async getAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<T> {
        return this.get<T>(url, headers, options).toPromise();
    }

    /**
     * Makes an http get call
     * @param url
     * @param headers
     * @param options
     */
    public get<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<T> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        return this.myHttpClient.get<T>(url, { headers })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<any> => this.handleError(err, options)),
            );
    }

    /**
     * @deprecated use get instead
     */
    public async httpGet<T>(url: string, headers?: HttpHeaders, options: IApiOptions = null): Promise<T> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        return this.myHttpClient.get<T>(url, { headers }).toPromise();
    }

    /**
     * Makes an async http get call, which also includes the response headers
     * @param url
     * @param headers
     * @param options
     */
    public async getWithHeadersAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<HttpResponse<T>> {
        return this.getWithHeaders<T>(url, headers, options).toPromise();
    }

    /**
     * Makes an http get call, which also includes the response headers
     * @param url
     * @param headers
     * @param options
     */
    public getWithHeaders<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<HttpResponse<T>> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        return this.myHttpClient.get<T>(url, { headers, observe: 'response' })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<any> => this.handleError(err, options)),
            );
    }

    /**
     * @deprecated use getWithHeaders instead
     */
    public async httpGetWithHeaders<T>(url: string, headers?: HttpHeaders): Promise<HttpResponse<T>> {
        return this.myHttpClient.get<T>(url, { headers, observe: 'response' }).toPromise();
    }

    /**
     * Makes an async http patch call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public async patchAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.patch<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * Makes an http patch call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public patch<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        return this.myHttpClient.patch(url, data, { headers })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<any> => this.handleError(err, options)),
            );
    }

    /**
     * @deprecated use patch instead
     */
    public async httpPatch<T>(url: string, data?: T, headers?: HttpHeaders, options: IApiOptions = null): Promise<any> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.patch(url, data, { headers }).toPromise();
    }

    /**
     * Makes an async http put call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public async putAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.put<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * Makes an http put call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public put<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.put(url, data, { headers })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<any> => this.handleError(err, options)),
            );
    }

    /**
     * @deprecated use put instead
     */
    public async httpPut<T>(url: string, data?: T, headers?: HttpHeaders, options: IApiOptions = null): Promise<any> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.put(url, data, { headers }).toPromise();
    }

    /**
     * Makes an async http post call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public async postAsync<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Promise<T1> {
        return this.post<T, T1>(url, data, headers, options).toPromise();
    }

    /**
     * Makes an http post call
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public post<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.post<T>(url, data, { headers })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<any> => this.handleError(err, options)),
            );
    }

    /**
     * @deprecated use post
     */
    public async httpPost<T>(url: string, data?: T, headers?: HttpHeaders, options: IApiOptions = null): Promise<any> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.post(url, data, { headers }).toPromise();
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
     * makes an http delete call
     * @param url
     * @param headers
     * @param options
     * @returns Observable
     */
    public delete<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<T> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);
        return this.myHttpClient.delete<T>(url, { headers })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
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

    /**
     * @deprecated use delete instead
     */
    public async httpDelete(url: string, headers?: HttpHeaders): Promise<any> {
        headers = this.getHeaders(headers, null);
        return this.myHttpClient.delete(url, { headers }).toPromise();
    }

    private static serializeOptions(options: IApiOptions): IApiOptions {
        if (!options) {
            options = {};
        }

        if (!options.contentType) {
            options.contentType = 'application/json';
        }

        return options;
    }

    private handleError(err: HttpErrorResponse, options: IApiOptions): Observable<never> {
        if (!options?.skipErrorHandling) {
            this.myLoggerService.logError(null, err, true);
        }

        return throwError(err);
    }

    private getHeaders(headers: HttpHeaders, options: IApiOptions): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }

        if (options.contentType) {
            headers = headers.append('Content-Type', 'application/json');
        }

        if (!options?.skipAuth) {
            if (this.getToken()) {
                const tokenSettings: ITokenSettings = this.getToken();
                headers = headers.append('Authorization', `${ tokenSettings.tokenType } ${ tokenSettings.accessToken }`);
            } else {
                // Deprecated.
                headers = headers.append('Authorization', `Bearer ${ this.getAccessToken() }`);
            }
        }
        return headers;
    }
}
