import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'ohlc-chart',
    template: '<div id="ohlc"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class OhlcChartComponent implements OnInit, OnChanges {
    chart: nv.OhlcBarChart;
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
        const margin = this.config.margin !== undefined ?
            this.config.margin : { left: 100 };

        this.chart = nv.models.ohlcBarChart()
            .x(function (d) { return d['date'] })
            .y(function (d) { return d['close'] })
            .duration(250)
            .margin(margin);

        const date: any = new Date();

        this.chart.xAxis
            .axisLabel(this.config.xlabel !== undefined ? '' : this.config.xlabel)
            .tickFormat(function (d) {
                return d3.time.format('%x')
                    (new Date(date - (20000 * 86400000) + (d * 86400000)));
            });

        this.chart.yAxis
            .axisLabel(this.config.ylabel !== undefined ? '' : this.config.ylabel)
            .tickFormat(function (d, i) { return '$' + d3.format(',.1f')(d); });
    }

    updateChart() {

        d3.select('#ohlc svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
