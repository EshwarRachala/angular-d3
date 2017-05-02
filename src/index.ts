import { BarchartComponent } from './components/bar-chart/bar-chart.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from './services/d3.service';
import { LinechartComponent } from './components/line-chart/line-chart.component';
import {SGBarComponent} from './components/stackedGrouped/s-g-bar.component'
export * from './services/d3.service';
export * from './services/d3types';
export * from './components/bar-chart/bar-chart.component';
export * from './components/line-chart/line-chart.component';
export * from './components/grouped/bar-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarchartComponent,
    SGBarComponent,
   // LinechartComponent
  ],
  exports: [
    BarchartComponent,
    SGBarComponent,
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
