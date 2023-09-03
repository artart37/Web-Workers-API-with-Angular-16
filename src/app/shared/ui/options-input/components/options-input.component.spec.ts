import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionsInputComponent } from './options-input.component';
import { ControlValueAccessorDirective } from '../../../utils';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MockDirective, MockModule } from 'ng-mocks';

describe('OptionsInputComponent', () => {
  let component: OptionsInputComponent<any>;
  let fixture: ComponentFixture<OptionsInputComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(FormsModule), MockModule(ReactiveFormsModule)],
      declarations: [
        OptionsInputComponent,
        MockDirective(ControlValueAccessorDirective),
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: OptionsInputComponent,
          multi: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
