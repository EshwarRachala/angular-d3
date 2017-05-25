import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'hmb-chart',
    template: '<svg id="chart"></svg>',
    encapsulation: ViewEncapsulation.None
})
export class HMBChartComponent implements OnInit, OnChanges {
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

        this.chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
            .y(function (d) { return d.value })
            .showValues(true)
            .barColor(d3.scale.category20().range())
            .margin({ top: 30, right: 20, bottom: 50, left: 130 })
            .duration(250)
            .showControls(true)
            .showLegend(true);

        this.chart.yAxis
            .tickFormat(d3.format(',.2f'));

        this.chart.yAxis.axisLabel('Y Axis');
        this.chart.xAxis.axisLabel('X Axis')
            .axisLabelDistance(20);
    }

    updateChart() {

        d3.select('#chart')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
