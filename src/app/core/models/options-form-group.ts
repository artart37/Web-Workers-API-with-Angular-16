import { FormControl } from '@angular/forms';

export interface OptionsFormGroup {
  timer: FormControl<number>;
  totalItems: FormControl<number>;
  size: FormControl<number>;
  additionalId: FormControl<string | undefined>;
}
