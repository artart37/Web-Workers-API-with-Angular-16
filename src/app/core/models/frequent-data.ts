import { FrequentDataChild } from './frequent-data-child';

export interface FrequentData {
  id: string;
  int: number;
  float: number;
  color: string;
  child: FrequentDataChild;
}
