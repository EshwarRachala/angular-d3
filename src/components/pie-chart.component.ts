import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'pie-chart',
    template: '<div id="pie"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit, OnChanges {
    chart: nv.PieChart;
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

        this.chart = nv.models.pieChart()
            .x(function (d) { return d.label })
            .y(function (d) { return d.value })
            .showLabels(true)
            .labelThreshold(.05);
    }

    updateChart() {
        d3.select('#pie svg')
            .attr('height', this.config.height)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
