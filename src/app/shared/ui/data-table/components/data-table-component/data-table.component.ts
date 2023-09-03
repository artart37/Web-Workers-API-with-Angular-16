import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FrequentData, FrequentDataChild } from '../../../../../core/models';

@Component({
  selector: 'ft-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input() tableColumns!: string[];
  @Input() tableChildColumns!: string[];
  @Input() tableData?: Array<FrequentData>;

  trackById(index: number, item: FrequentData | FrequentDataChild) {
    return item.id || index;
  }
}
