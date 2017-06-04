import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'scatteredbubble-chart',
    template: '<div id="scatteredbubble"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class ScatteredBubbleChartComponent implements OnInit, OnChanges {
    chart: nv.ScatterChart;
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

        this.chart = nv.models.scatterChart()
            .showDistX(true)
            .showDistY(true)
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300);


        // Axis settings
        this.chart.xAxis.tickFormat(d3.format('.02f'));
        this.chart.yAxis.tickFormat(d3.format('.02f'));
    }

    updateChart() {

        d3.select('#scatteredbubble svg')
            .attr('height', this.config.height)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
