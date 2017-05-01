import { BarchartGroupedComponent } from './grouped/bar-group.component';
import { BarchartComponent } from './bar-chart/bar-chart.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from './d3/d3.service';

export * from './d3/d3.service';
export * from './d3/d3types';
export * from './bar-chart/bar-chart.component';
// export * from './line-chart/line-chart.component';
export * from './grouped/bar-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarchartComponent,
    BarchartGroupedComponent
  ],
  exports: [
    BarchartComponent,
    BarchartGroupedComponent
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
