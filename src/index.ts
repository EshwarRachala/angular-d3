import { BarchartGroupedComponent } from './components/grouped/bar-group.component';
import { BarchartComponent } from './components/bar-chart/bar-chart.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from './d3/d3.service';
// import { LinechartComponent } from './line-chart/line-chart.component';

export * from './services/d3.service';
export * from './services/d3types';
export * from './components/bar-chart/bar-chart.component';
// export * from './line-chart/line-chart.component';
export * from './components/grouped/bar-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarchartComponent,
    BarchartGroupedComponent,
   // LinechartComponent
  ],
  exports: [
    BarchartComponent,
    BarchartGroupedComponent,
  //  LinechartComponent
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
