import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'line-view-chart',
    template: '<div id="lnvchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class LineViewChartComponent implements OnInit, OnChanges {
    chart: nv.LineWithFocusChart;
    @Input() data: any;
    @Input() height: number;
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

        this.chart = nv.models.lineWithFocusChart();
        this.chart.xAxis
            .tickFormat(d3.format(',f'));

        this.chart.yAxis
            .tickFormat(d3.format(',.2f'));

        this.chart.y2Axis
            .tickFormat(d3.format(',.2f'));
    }

    updateChart() {

        d3.select('#lnvchart svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
