import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';
import { IchartConfig } from 'components/chart-config.component';

@Component({
    selector: 'doughnut-chart',
    template: '<div id="doughnutchart"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class DoughnutChartComponent implements OnInit, OnChanges, IchartConfig {
    @Input() data: any;
    @Input() height: number;
    chart: any;

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
