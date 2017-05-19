import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartService } from './nvd3.service';

export * from './nvd3.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [ChartService]
})
export class ChartModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChartModule,
      providers: [ChartService]
    };
  }
}
