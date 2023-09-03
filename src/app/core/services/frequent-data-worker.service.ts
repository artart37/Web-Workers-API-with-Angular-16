import { Injectable } from '@angular/core';
import { DataMessage } from '../models/data-message';
import { Observable, Subject } from 'rxjs';
import { ProcessedFrequentData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FrequentDataWorkerService {
  private dataSubject = new Subject<ProcessedFrequentData>();
  public data$: Observable<ProcessedFrequentData> =
    this.dataSubject.asObservable();
  private worker!: Worker;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('./../workers/frequent-data.worker.ts', import.meta.url)
      );
    } else {
      console.error('Web workers are not supported in this environment.');
    }
  }

  sendMessage(message: DataMessage): void {
    this.worker.postMessage(message);
  }

  getMessage(): void {
    this.worker.onmessage = ({ data }: MessageEvent<ProcessedFrequentData>) => {
      this.dataSubject.next(data);
    };
  }
}
