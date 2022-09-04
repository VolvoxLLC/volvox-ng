import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IApiOptions } from '../models/api-options.model';
import { ITokenSettings } from '../models/token-settings.model';
import { isNullOrEmpty } from '../utils/commons.util';
import { CoreLoggerService } from './core-logger.service';

export const LOCAL_STORAGE_TOKEN_KEY = 'volvoxTokenSettings';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(
        private readonly myCoreLoggerService: CoreLoggerService,
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
     * Makes an http get call
     * @param url
     * @param headers
     * @param options
     */
    public get<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<T> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.myHttpClient.get<T>(url, { ...options.httpOptions as any, headers })
            .pipe(
                map((response: HttpEvent<T>) => this.handleResponse(response)),
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
    }

    /**
     * Makes an async http get call, which also includes the response headers
     * @param url
     * @param headers
     * @param options
     */
    public async getWithHeadersAsync<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Promise<HttpEvent<T>> {
        return this.getWithHeaders<T>(url, headers, options).toPromise();
    }

    /**
     * Makes an http get call, which also includes the response headers
     * @param url
     * @param headers
     * @param options
     */
    public getWithHeaders<T>(url: string, headers?: HttpHeaders, options?: IApiOptions): Observable<HttpEvent<T>> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.myHttpClient.get<T>(url, { ...options.httpOptions as any, headers, observe: 'response' })
            .pipe(
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
    }

    /**
     * Makes an http patch call (For partial updates)
     * @param url
     * @param data
     * @param headers
     * @param options
     */
    public patch<T, T1>(url: string, data?: T, headers?: HttpHeaders, options?: IApiOptions): Observable<T1> {
        options = ApiService.serializeOptions(options);
        headers = this.getHeaders(headers, options);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.myHttpClient.patch<T1>(url, data, { ...options.httpOptions as any, headers })
            .pipe(
                map((response: HttpEvent<T1>) => this.handleResponse(response)),
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.myHttpClient.put<T1>(url, data, { ...options.httpOptions as any, headers })
            .pipe(
                map((response: HttpEvent<T1>) => this.handleResponse(response)),
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.myHttpClient.post<T1>(url, data, { ...options.httpOptions as any, headers })
            .pipe(
                map((response: HttpEvent<T1>) => this.handleResponse(response)),
                catchError((err: HttpErrorResponse): Observable<never> => this.handleError(err, options)),
            );
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
        // eslint-disable-next-line @typescript-eslint/ban-types
        return this.myHttpClient.delete<T>(url, { ...options.httpOptions as {}, headers })
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
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    private handleError(err: HttpErrorResponse, options: IApiOptions): Observable<never> {
        if (!options?.skipErrorHandling) {
            this.myCoreLoggerService.logError({ msg: err });
        }

        return throwError(err);
    }

    private handleResponse<T>(response: HttpEvent<T>): T {
        if (response instanceof HttpResponse) {
            return response.body;
        }
        return response as T;
    }

    private getHeaders(headers: HttpHeaders, options: IApiOptions): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }

        if (!options.skipContentType) {
            if (!headers.get('Content-Type')) {
                headers = headers.set('Content-Type', 'application/json');
            }
        }

        if (!options?.skipAuth) {
            if (this.getToken()) {
                const tokenSettings: ITokenSettings = this.getToken();
                headers = headers.set('Authorization', `${ tokenSettings.tokenType } ${ tokenSettings.accessToken }`);
            } else {
                // Deprecated.
                headers = headers.set('Authorization', `Bearer ${ this.getAccessToken() }`);
            }
        }
        return headers;
    }

    private static serializeOptions(options: IApiOptions): IApiOptions {
        if (!options) {
            options = {};
        }

        if (!options.httpOptions) {
            options.httpOptions = {};
        }

        return options;
    }
}
