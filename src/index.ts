import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from './d3.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [D3Service]
})
export class D3Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: D3Module,
      providers: [D3Service]
    };
  }
}
