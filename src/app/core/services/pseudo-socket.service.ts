import { DataOptions, FrequentDataChild } from './../models';
import { Injectable } from '@angular/core';
import { FrequentDataClass } from '../classes';
import { DataMessage } from '../models/data-message';
import { FrequentDataWorkerService } from './frequent-data-worker.service';

@Injectable({
  providedIn: 'root',
})
export class PseudoSocketService {
  data: FrequentDataClass[] = [];
  private timerId: any;

  constructor(private frequentDataWorkerService: FrequentDataWorkerService) {}

  processData(dataOptions: DataOptions): void {
    this.timerId = setInterval(() => {
      const data = this.generateData();
      this.data.push(data);

      const message: DataMessage = {
        frequentData: { data: this.data, length: this.data?.length },
        options: dataOptions,
      };

      this.frequentDataWorkerService.sendMessage(message);
    }, Number(dataOptions.timer));
  }

  stopSocket(): void {
    clearInterval(this.timerId);
  }

  private generateData(): FrequentDataClass {
    const id = this.generateRandomString();
    const int = Math.floor(Math.random() * 100);
    const float = Math.random() * 100;
    const color = this.generateRandomColor();
    const child: FrequentDataChild = {
      id: this.generateRandomString(),
      color: this.generateRandomColor(),
    };

    return new FrequentDataClass(id, int, float, color, child);
  }

  private generateRandomString(): string {
    return `a${Math.floor(Math.random() * 100)}`;
  }

  private generateRandomColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
  }
}
