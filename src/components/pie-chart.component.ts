import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'pie-chart',
    template: '<div id="pie"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit, OnChanges {
    chart: any;
    @Input() data: any;
    @Input() height: number;

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

        this.chart = nv.models.pieChart()
            .x(function (d) { return d.label })
            .y(function (d) { return d.value })
            .showLabels(true)
            .labelThreshold(.05);
    }

    updateChart() {
        d3.select('#pie svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
