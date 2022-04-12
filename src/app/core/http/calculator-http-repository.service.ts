import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICombination } from '../models/search.model';
import { CalculatorHttpService } from './calculator-http.service';

@Injectable()
export class CalculatorHttpRepositoryService extends CalculatorHttpService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'shop');
  }

  getCombination(shopId: number, montant: number): Observable<ICombination> {
    const body = {
      'amount': montant
    };

    return this.getOne<ICombination>(`${shopId}/search-combination`, body);
  }
}
