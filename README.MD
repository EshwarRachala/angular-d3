# ngnvd3

## Installation

To install this library, run:

```bash
$ npm install ngnvd3 --save
```

## nvd3 examples 
http://ngnvd3.surge.sh/

## Examples Repo
Reference `https://github.com/EshwarRachala/angular-d3-demo` for examples.

## Consuming the library

Import the library in any Angular application by running:

```bash
$ npm install ngnvd3
```
and then from your Angular `AppModule` inject Chartservice and import chartmodule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartModule,ChartService } from 'ngnvd3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


## To use angular ChartsService 

```typescript
import { ChartService, NV, D3 } from 'ngnvd3';

@Component({
  selector: 'app-chart',
  template: `<div class="gallery with-transitions" id="chart1">
                <svg height="500"></svg>
             </div>`
})

export class ChartComponent implements OnInit, OnChanges {
    private nv: NV;
    private d3: D3;
    private data: any; // provide data for the chart 
    chart: nv.BoxPlotChart; 

    constructor(private service: ChartService) {
         this.nv = service.getnvD3();
        this.d3 = service.getD3();
     }

    ngOnInit() {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
    this.chart = nv.models.boxPlotChart()
            .x(function (d) { return d.label })
            .staggerLabels(true)
            .maxBoxWidth(75)
            .yDomain([0, 500]);
    }

    updateChart() {
      d3.select('#boxplot svg')
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);
            
      nv.utils.windowResize(this.chart.update);
  }
}

```

## To use Chart components directly

```typescript

export class ChartConfig {
    data: any;
    margin: any;
    height: number;
    width?: number;
    xlabel?: string;
    ylabel?: string;
}


const config = new ChartConfig();
this.config.height = height;
this.config.data = data;
...etc

<boxplot-chart [config]="config"></boxplot-chart>
<candlestick-chart [config]="config"></candlestick-chart>
<cumulativeline-chart [config]="config"></cumulativeline-chart>
<doughnut-chart [config]="config"></doughnut-chart>
<hmb-chart [config]="config"></hmb-chart>
<linebar-chart [config]="config"></linebar-chart>
<lineview-chart [config]="config"></lineview-chart>
<ohlc-chart [config]="config"></ohlc-chart>
<pie-chart [config]="config"></pie-chart>
<scatteredbubble-chart [config]="config"></scatteredbubble-chart>
<simpleline-chart [config]="config"></simpleline-chart>
<stackedarea-chart [config]="config"></stackedarea-chart>
<sunburst-chart [config]="config"></sunburst-chart>
<discretebar-chart [config]="config"></discretebar-chart>
<vmb-chart [config]="config"></vmb-chart>

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## Further help

http://nvd3.org/index.html

## License

MIT © [eshwar rachala](mailto:eshwar.appdev@gmail.com)
