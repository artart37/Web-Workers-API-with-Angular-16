import { PseudoSocketService } from './../../services/pseudo-socket.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FrequentDataColumns } from '../../models/frequent-data-columns';
import {
  FREQUENT_DATA_COLUMNS,
  FREQUENT_DATA_CHILD_COLUMNS,
} from '../../constants';
import {
  DataOptions,
  OptionsFormGroup,
  ProcessedFrequentData,
} from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FrequentDataWorkerService } from '../../services';
import { FrequentDataChildColumns } from '../../models/frequent-data-child-columns';
import { additionalIdValidation } from '../../../shared/utils/validations/functions';

@Component({
  selector: 'ft-manage-data-page',
  templateUrl: './manage-data-page.component.html',
  styleUrls: ['./manage-data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageDataPageComponent implements OnDestroy, OnInit {
  tableData$!: Observable<ProcessedFrequentData>;
  optionsFormGroup!: FormGroup<OptionsFormGroup>;
  unsubscribe$$ = new Subject<void>();

  readonly tableColumns: FrequentDataColumns[] = FREQUENT_DATA_COLUMNS;
  readonly tableChildColumns: FrequentDataChildColumns[] =
    FREQUENT_DATA_CHILD_COLUMNS;
  private _options!: DataOptions;

  constructor(
    private frequentDataWorkerService: FrequentDataWorkerService,
    private pseudoSocketService: PseudoSocketService
  ) {}

  ngOnInit(): void {
    this.optionsFormGroup = this.initOptionsFormGroup();
    this._options = this.optionsFormGroup.getRawValue();

    this.pseudoSocketService.processData(this.options);
    this.frequentDataWorkerService.getMessage();
    this.tableData$ = this.frequentDataWorkerService.data$;
  }

  get options(): DataOptions {
    return this._options;
  }

  set options(value: DataOptions) {
    this._options = value;
  }
  onAdditionalIdChange(additionalId: string | undefined): void {
    this.options = {
      ...this.options,
      additionalId,
    };
    this.updateOptions();
  }

  onSizeChange(size: string | undefined): void {
    this.options = {
      ...this.options,
      size: Number(size),
    };
    this.updateOptions();
  }

  onTimerChange(timer: string | undefined): void {
    this.options = {
      ...this.options,
      timer: Number(timer),
    };
    this.updateOptions();
  }

  private initOptionsFormGroup(): FormGroup<OptionsFormGroup> {
    return new FormGroup<OptionsFormGroup>({
      timer: new FormControl<number>(300, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      size: new FormControl<number>(10, {
        nonNullable: true,
        validators: Validators.required,
      }),
      totalItems: new FormControl<number>(
        { value: 0, disabled: true },
        { nonNullable: true }
      ),
      additionalId: new FormControl<string | undefined>('', {
        nonNullable: true,
        validators: additionalIdValidation(),
      }),
    });
  }

  private updateOptions() {
    if (this.optionsFormGroup.valid) {
      this.pseudoSocketService.stopSocket();
      this.pseudoSocketService.processData(this.options);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
