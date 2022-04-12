export interface ICalculatorComponentValue {
  value: number;
  cards: number[];
}

export interface ICombination {
  equal: ICalculatorComponentValue;
  floor: ICalculatorComponentValue;
  ceil: ICalculatorComponentValue;
}
