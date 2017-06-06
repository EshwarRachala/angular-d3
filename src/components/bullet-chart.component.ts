import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';
import { ChartConfig } from '../chart-config';

@Component({
    selector: 'bullet-chart',
    template: '<div id="bulletchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class BulletChartComponent implements OnInit, OnChanges {
    chart: nv.BulletChart;
    @Input() config: ChartConfig;


    constructor() { }

    ngOnInit() {
        this.createChart();
        if (this.config.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
        this.chart = nv.models.bulletChart();
    }

    updateChart() {

        d3.select('#bulletchart svg')
            .data(this.config.data)
            .transition()
            .duration(1000)
            .call(this.chart)

        nv.utils.windowResize(this.chart.update);

    }

}
