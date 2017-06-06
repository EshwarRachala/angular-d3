import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';
import { ChartConfig } from '../chart-config';

@Component({
    selector: 'doughnut-chart',
    template: '<div id="doughnutchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class DoughnutChartComponent implements OnInit, OnChanges {
    @Input() config: ChartConfig;
    chart: nv.PieChart;

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

        this.chart = nv.models.pieChart()
            .x(function (d) { return d.label })
            .y(function (d) { return d.value })
            .showLabels(true)
            .labelThreshold(.05)
            .labelType('percent')
            .donut(true)
            .donutRatio(0.35);
    }

    updateChart() {

        d3.select('#doughnutchart svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
