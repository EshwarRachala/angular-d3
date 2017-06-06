import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'cumulativeline-chart',
    template: '<div id="cumulativeline"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class CumulativelineChartComponent implements OnInit, OnChanges {
    chart: nv.CumulativeLineChart;
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

        this.chart = nv.models.cumulativeLineChart()
            .x(function (d) { return d[0] })
            .y(function (d) { return d[1] / 100 })
            .color(d3.scale.category10().range())
            .useInteractiveGuideline(true);

        this.chart.xAxis
            .tickFormat(function (d) {
                return d3.time.format('%x')(new Date(d))
            });

        this.chart.yAxis
            .tickFormat(d3.format(',.1%'));

    }

    updateChart() {

        d3.select('#cumulativeline svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
