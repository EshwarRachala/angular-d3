import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { D3Service } from './d3/d3.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './d3/d3.service';

export * from './d3/d3types';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    SamplePipe
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
