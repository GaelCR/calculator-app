import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class CalculatorHttpService extends HttpService {
	constructor(protected httpClient: HttpClient, @Inject(String) protected baseUrl: string) {
		super(httpClient, `${environment.apiEndpoint}`, baseUrl);
	}
}
