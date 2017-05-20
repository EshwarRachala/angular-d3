import { BulletChartComponent } from './components/bullet/bullet.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartService } from './services/nv-d3.service';

export * from './services/nv-d3.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
    BulletChartComponent
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
