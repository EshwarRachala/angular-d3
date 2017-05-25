import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartService } from './nv-d3.service';
import { PieChartComponent } from './components/pie-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart.component';

export * from './nv-d3.service';
export * from './components/pie-chart.component';
export * from './components/doughnut-chart.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PieChartComponent,
    DoughnutChartComponent
  ],
  exports: [
    PieChartComponent,
    DoughnutChartComponent
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
