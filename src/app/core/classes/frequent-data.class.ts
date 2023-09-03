import { FrequentData, FrequentDataChild } from '../models';

export class FrequentDataClass implements FrequentData {
  id: string;
  int: number;
  float: number;
  color: string;
  child!: FrequentDataChild;

  constructor(
    id: string,
    int: number,
    float: number,
    color: string,
    child: FrequentDataChild
  ) {
    this.id = id;
    this.int = int;
    this.float = float;
    this.color = color;
    this.child = child;
  }
}
