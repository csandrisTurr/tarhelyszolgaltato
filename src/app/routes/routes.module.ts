import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

const stuff: (any[] | Type<any>)[] = [
  CommonModule,
  LoginComponent,
];

@NgModule({
  declarations: [],
  imports: stuff,
  exports: stuff,
})
export class RoutesModule { }
