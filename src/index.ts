import { CandlestickChartComponent } from './components/candle-stick.component';
import { BulletChartComponent } from './components/bullet-chart.component';
import { SunburstChartComponent } from './components/sunburst.componet';
import { OhlcChartComponent } from './components/ohlc.component';
import { LineBarChartComponent } from './components/linebar-chart.component';
import { LineViewChartComponent } from './components/lineview-chart.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartService } from './nv-d3.service';
import { PieChartComponent } from './components/pie-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart.component';
import { HMBChartComponent } from './components/Hmb.component';
import { VMBChartComponent } from './components/Vmb.component';
import { VBarComponent } from './components/VerticalBar.component';
import { SimpleLineChartComponent } from './components/simple-line.component';
import { BoxplotChartComponent } from './components/boxplot.component';

export * from './nv-d3.service';
export * from './components/candle-stick.component';
export * from './components/bullet-chart.component';
export * from './components/boxplot.component';
export * from './components/sunburst.componet';
export * from './components/pie-chart.component';
export * from './components/doughnut-chart.component';
export * from './components/Hmb.component';
export * from './components/Vmb.component';
export * from './components/VerticalBar.component';
export * from './components/simple-line.component';
export * from  './components/simple-line.component';
export * from './components/linebar-chart.component';
export * from './components/ohlc.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PieChartComponent,
    DoughnutChartComponent,
    HMBChartComponent,
    VMBChartComponent,
    VBarComponent,
    SimpleLineChartComponent,
    LineViewChartComponent,
    LineBarChartComponent,
    OhlcChartComponent,
    SunburstChartComponent,
    BoxplotChartComponent,
    BulletChartComponent,
    CandlestickChartComponent
  ],
  exports: [
    PieChartComponent,
    DoughnutChartComponent,
    HMBChartComponent,
    VMBChartComponent,
    VBarComponent,
    SimpleLineChartComponent,
    LineViewChartComponent,
    LineBarChartComponent,
    OhlcChartComponent,
    SunburstChartComponent,
    BoxplotChartComponent,
    BulletChartComponent,
    CandlestickChartComponent
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
