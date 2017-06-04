import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'candlestick-chart',
    template: '<div id="candlestick"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class CandlestickChartComponent implements OnInit, OnChanges {
    chart: nv.CandlestickBarChart;
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

        this.chart = nv.models.candlestickBarChart()
            .x(function (d) { return d['date'] })
            .y(function (d) { return d['close'] })
            .duration(250)
            .margin({ left: 75, bottom: 50 });

        const date: any = new Date();

        this.chart.xAxis
            .axisLabel(this.xlabel)
            .tickFormat(function (d) {
                return d3.time.format('%x')(
                    new Date(date - (20000 * 86400000) + (d * 86400000)));
            });

        this.chart.yAxis
            .axisLabel(this.ylabel)
            .tickFormat(function (d, i) {
                return '$' + d3.format(',.1f')(d);
            });

    }

    updateChart() {

        d3.select('#candlestick svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
