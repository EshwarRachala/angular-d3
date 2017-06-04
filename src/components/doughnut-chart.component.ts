import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'doughnut-chart',
    template: '<div id="doughnutchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class DoughnutChartComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() height: number;
    chart: nv.PieChart;

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
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
