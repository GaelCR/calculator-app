import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { take } from 'rxjs/operators';

export interface IResult<T> {
	data?: T;
	status?: number;
}

export interface IRequestOptions {
	headers?: HttpHeaders;
	observe?: 'body';
	params?: HttpParams;
	reportProgress?: boolean;
	responseType?: 'json' | 'arraybuffer' | 'text' | 'blob' | any;
	withCredentials?: boolean;
	body?: any;
}

export class HttpService {
	constructor(protected httpClient: HttpClient, protected apiEndpoint: string, protected baseUrl: string) {}

	/**
	 * Renvoie un Observable pour une liste d'élément.
	 * @param url
	 * @param params
	 * @param headers
	 * @param options
	 */
	list<T>(url: string, params?: any, headers?: any, options: IRequestOptions = this.options(params, headers)): Observable<Array<T>> {
		// return this.httpClient.get<Array<T>>(this.handleUrl(url), options);
		return new Observable<Array<T>>((observer) => {
			this.httpClient
				.get<T>(this.handleUrl(url, false), options)
				.pipe(
					take(1),
					catchError((error) => {
						observer.error(error);
						observer.complete();
						throw error;
					})
				).subscribe((res: IResult<Array<T>>) => {
					if (res) {
						switch (res.status) {
							case 200:
								observer.next(res.data ? res.data : (res as Array<T>));
								break;
							case 500:
							case 501:
							case 401:
								observer.error(res.data ? res.data : (res as Array<T>));
								break;
							default:
								observer.next(res.data ? res.data : (res as Array<T>));
								break;
						}
					}

					observer.complete();
				});
		});
	}

	/**
	 * Renvoie un Observable pour un élément.
	 * @param url
	 * @param params
	 * @param headers
	 * @param options
	 */
	getOne<T>(url: string, params?: any, headers?: any, options: IRequestOptions = this.options(params, headers)): Observable<T> {
		// return this.httpClient.get<T>(this.handleUrl(url), options);
		return new Observable<T>((observer) => {
			this.httpClient
				.get<T>(this.handleUrl(url, false), options)
				.pipe(
					take(1),
					catchError((error) => {
						observer.error(error);
						observer.complete();
						throw error;
					})
				)
				.subscribe((res: IResult<T>) => {
					if (res) {
						switch (res.status) {
							case 200:
								observer.next(res.data ? res.data : (res as T));
								break;
							case 500:
							case 501:
							case 401:
								observer.error(res.data ? res.data : (res as T));
								break;
							default:
								observer.next(res.data ? res.data : (res as T));
								break;
						}
					}

					observer.complete();
				});
		});
	}

	/**
	 * Poste une requête et renvoie l'Observable résultant.
	 * @param url
	 * @param postContent
	 * @param headers
	 * @param options
	 * @param transformResult
	 */
	postOne<T>(
		url: string,
		postContent: any,
		headers?: any,
		options: IRequestOptions = this.options(null, headers),
		transformResult = true
	): Observable<T> {
		return new Observable<T>((observer) => {
			this.httpClient
				.post<T>(this.handleUrl(url, false), postContent, options)
				.pipe(
					take(1),
					catchError((error) => {
						observer.error(error);
						observer.complete();
						throw error;
					})
				).subscribe((res: IResult<T>) => {
					if (transformResult) {
						switch (res.status) {
							case 200:
								observer.next(res.data ? res.data : (res as T));
								break;
							case 500:
							case 501:
							case 401:
								observer.error(res.data ? res.data : (res as T));
								break;
							default:
								observer.next(res.data ? res.data : (res as T));
								break;
						}
					} else {
						observer.next(postContent);
					}

					observer.complete();
				});
		});
	}

	put<T>(url: string, patchContent: any, options: IRequestOptions = this.options()): Observable<T> {
		return new Observable<T>((observer) => {
			this.httpClient
				.put<T>(this.handleUrl(url, false), patchContent, options)
				.pipe(
					take(1),
					catchError((error) => {
						observer.error(error);
						observer.complete();
						throw error;
					})
				).subscribe((res: IResult<T>) => {
					if (res) {
						switch (res.status) {
							case 200:
								observer.next(res.data);
								break;
							case 500:
							case 501:
							case 401:
								observer.error(res.data);
								break;
							default:
								observer.next(res.data);
								break;
						}
					}

					observer.complete();
				});
		});
	}

	patch<T>(url: string, patchContent: any, options: IRequestOptions = this.options()): Observable<T> {
		return new Observable<T>((observer) => {
			this.httpClient
				.patch<T>(this.handleUrl(url), patchContent, options)
				.pipe(
					take(1),
					catchError((error) => {
						observer.error(error);
						observer.complete();
						throw error;
					})
				).subscribe((res: IResult<T>) => {
					if (res) {
						switch (res.status) {
							case 200:
								observer.next(res.data);
								break;
							case 500:
							case 501:
							case 401:
								observer.error(res.data);
								break;
							default:
								observer.next(res.data);
								break;
						}
					}

					observer.complete();
				});
		});
	}

	delete<T>(url: string, body?: any, headers?: any, options: IRequestOptions = this.options(null, headers, body)): Observable<T> {
		return this.httpClient.delete<T>(this.handleUrl(url, false), options);
	}

	validate<T>(url: string, postContent: any, options: IRequestOptions = this.options(), transformResult = true): Observable<T> {
		return this.postOne<T>(this.handleUrl(url), postContent, null, options, transformResult);
	}

	protected options(params?: HttpParams | null, headers?: HttpHeaders, body?: any): IRequestOptions {
		return {
			withCredentials: false,
			headers,
			params: params || undefined,
			body: body || null
		};
	}

	protected getBaseUrl() {
		return `${this.apiEndpoint}${this.baseUrl ? `/${this.baseUrl}` : ''}`;
	}

	protected handleUrl(url: string, withTimestamp = true): string {
		const endpointRest = this.getBaseUrl();
		const urlTemp: string = url.startsWith(endpointRest) ? url : endpointRest + (url.startsWith('/') ? url : `/${url}`);
		if (withTimestamp) {
			const sep = urlTemp.indexOf('?') === -1 ? '?' : '&';
			return `${urlTemp + sep}t=${new Date().getTime()}`;
		}
		return urlTemp;
	}
}
