import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageDataPageComponent } from './manage-data-page.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DataOptions } from '../../models';
import { PseudoSocketService } from './../../services/pseudo-socket.service';
import { FrequentDataWorkerService } from '../../services';
import { OptionsInputComponent } from '../../../shared/ui/options-input/components/options-input.component';
import { DataTableComponent } from '../../../shared/ui/data-table/components/data-table-component/data-table.component';
import { MockComponents, MockModule } from 'ng-mocks';

describe('ManageDataPageComponent', () => {
  let component: ManageDataPageComponent;
  let fixture: ComponentFixture<ManageDataPageComponent>;
  let pseudoSocketServiceMock: PseudoSocketService;
  let frequentDataWorkerServiceMock: FrequentDataWorkerService;

  beforeEach(async () => {
    pseudoSocketServiceMock = {
      processData: jest.fn(),
      stopSocket: jest.fn(),
    } as unknown as PseudoSocketService;

    frequentDataWorkerServiceMock = {
      getMessage: jest.fn(),
      data$: of({ data: [], length: 0 }),
    } as unknown as FrequentDataWorkerService;

    await TestBed.configureTestingModule({
      declarations: [
        ManageDataPageComponent,
        MockComponents(OptionsInputComponent, DataTableComponent),
      ],
      imports: [MockModule(ReactiveFormsModule)],
      providers: [
        { provide: PseudoSocketService, useValue: pseudoSocketServiceMock },
        {
          provide: FrequentDataWorkerService,
          useValue: frequentDataWorkerServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize optionsFormGroup correctly', () => {
    expect(component.optionsFormGroup).toBeInstanceOf(FormGroup);
    expect(component.optionsFormGroup.controls.timer).toBeInstanceOf(
      FormControl
    );
    expect(component.optionsFormGroup.controls.size).toBeInstanceOf(
      FormControl
    );
    expect(component.optionsFormGroup.controls.totalItems).toBeInstanceOf(
      FormControl
    );
    expect(component.optionsFormGroup.controls.additionalId).toBeInstanceOf(
      FormControl
    );
  });

  it('should call pseudoSocketService.processData() with correct options', () => {
    const options: DataOptions = {
      timer: 300,
      size: 10,
      totalItems: 0,
      additionalId: '',
    };
    component.options = options;
    fixture.detectChanges();

    expect(pseudoSocketServiceMock.processData).toHaveBeenCalledWith(options);
  });

  it('should call frequentDataWorkerService.getMessage()', () => {
    expect(frequentDataWorkerServiceMock.getMessage).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
