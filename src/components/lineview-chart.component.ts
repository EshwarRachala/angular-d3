import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';
import { ChartConfig } from '../chart-config';

@Component({
    selector: 'lineview-chart',
    template: '<div id="lnvchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class LineViewChartComponent implements OnInit, OnChanges {
    chart: nv.LineWithFocusChart;
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
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
