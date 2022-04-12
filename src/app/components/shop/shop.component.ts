import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CalculatorHttpRepositoryService } from '../../core/http/calculator-http-repository.service';
import { ICombination } from '../../core/models/search.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  combination: ICombination;
  montantFC: FormControl = new FormControl(null, Validators.required);
  shopId = 5;

  constructor(
    private calculatorRepositoryService: CalculatorHttpRepositoryService
  ) {
  }

  chooseCeil(): void {
    this.montantFC.setValue(this.combination.ceil.value);
    this.validate();
  }

  chooseFloor(): void {
    this.montantFC.setValue(this.combination.floor.value);
    this.validate();
  }

  validate(): void {
    this.calculatorRepositoryService.getCombination(this.shopId, this.montantFC.value)
      .pipe(take(1))
      .subscribe((res: ICombination) => {
        this.combination = res;
      })
  }
}
