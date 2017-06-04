import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'simpleline-chart',
    template: '<div id="simpleline"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class SimpleLineChartComponent implements OnInit, OnChanges {
    chart: nv.LineChart;
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

        this.chart = nv.models.lineChart()
            .margin(this.config.margin)
            .useInteractiveGuideline(true)
            .showLegend(true)
            .showYAxis(true)
            .showXAxis(true)
            .tooltips(true);

        this.chart.xAxis
            .axisLabel(this.config.xlabel)
            .tickFormat(d3.format(',.1f'))
            .staggerLabels(true);

        this.chart.yAxis
            .axisLabel(this.config.ylabel)
            .tickFormat(function (d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            });
    }

    updateChart() {

        d3.select('#simpleline svg')
            .attr('height', this.config.height)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
