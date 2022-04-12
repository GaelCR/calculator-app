import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';

const MaterialModules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: [ MaterialModules ],
  exports: [ MaterialModules ],
})

export class MaterialModule {}
