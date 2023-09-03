import { DataOptions } from './data-options';
import { ProcessedFrequentData } from './processed-frequent-data';

export interface DataMessage {
  frequentData: ProcessedFrequentData;
  options: DataOptions;
}
