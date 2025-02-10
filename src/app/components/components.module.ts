import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

const stuff: (any[] | Type<any>)[] = [
  CommonModule,
];

@NgModule({
  declarations: [],
  imports: stuff,
  exports: stuff,
})
export class ComponentsModule { }
