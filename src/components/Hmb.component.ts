import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'hmb-chart',
    template: '<div id="hmb"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class HMBChartComponent implements OnInit, OnChanges {
    chart: nv.MultiBarHorizontalChart;
    @Input() config: ChartConfig

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
        this.chart = nv.models.multiBarHorizontalChart()
            .x(d => d.label)
            .y(d => d.value)
            .showValues(true)
            .barColor(d3.scale.category20().range())
            .margin(this.config.margin)
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

        d3.select('#hmb svg')
            .attr('height', this.config.height)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
