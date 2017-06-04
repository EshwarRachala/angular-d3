import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'cumulativeline-chart',
    template: '<div id="cumulativeline"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class CumulativelineChartComponent implements OnInit, OnChanges {
    chart: nv.CumulativeLineChart;
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

        this.chart = nv.models.cumulativeLineChart()
            .x(function (d) { return d[0] })
            .y(function (d) { return d[1] / 100 })
            .color(d3.scale.category10().range())
            .useInteractiveGuideline(true);

        this.chart.xAxis
            .tickValues([1078030800000, 1122782400000,
                1167541200000, 1251691200000])
            .tickFormat(function (d) {
                return d3.time.format('%x')(new Date(d))
            });

        this.chart.yAxis
            .tickFormat(d3.format(',.1%'));

    }

    updateChart() {

        d3.select('#cumulativeline svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}