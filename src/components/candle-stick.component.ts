import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';
import { ChartConfig } from '../chart-config';

@Component({
    selector: 'candlestick-chart',
    template: '<div id="candlestick"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class CandlestickChartComponent implements OnInit, OnChanges {
    chart: nv.CandlestickBarChart;
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

        this.chart = nv.models.candlestickBarChart()
            .x(function (d) { return d['date'] })
            .y(function (d) { return d['close'] })
            .duration(250)
            .margin(this.config.margin);

        const date: any = new Date();

        this.chart.xAxis
            .axisLabel(this.config.xlabel !== undefined ? '' : this.config.xlabel)
            .tickFormat(function (d) {
                return d3.time.format('%x')(
                    new Date(date - (20000 * 86400000) + (d * 86400000)));
            });

        this.chart.yAxis
            .axisLabel(this.config.ylabel !== undefined ? '' : this.config.ylabel)
            .tickFormat(function (d, i) {
                return '$' + d3.format(',.1f')(d);
            });

    }

    updateChart() {

        d3.select('#candlestick svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
