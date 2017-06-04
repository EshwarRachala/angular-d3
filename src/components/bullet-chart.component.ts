import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'bullet-chart',
    template: '<div id="bulletchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class BulletChartComponent implements OnInit, OnChanges {
    chart: nv.BulletChart;
    @Input() data: any;
    @Input() height: number;
    @Input() width: number;
    @Input() xlabel: string;
    @Input() ylabel: string;


    constructor() { }

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
        this.chart = nv.models.bulletChart();
    }

    updateChart() {

        d3.select('#bulletchart svg')
            .data(this.data)
            .transition()
            .duration(1000)
            .call(this.chart)

        nv.utils.windowResize(this.chart.update);

    }

}
