import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'stackedarea-chart',
    template: '<div id="stackedarea"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class StackedAreaChartComponent implements OnInit, OnChanges {
    chart: nv.StackedAreaChart;
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

        const margin = this.config.margin !== undefined ?
            this.config.margin : { left: 100 };

        this.chart = nv.models.stackedAreaChart()
            .margin(margin)
            .x(function (d) { return d[0] })
            .y(function (d) { return d[1] })
            .useInteractiveGuideline(true)
            .rightAlignYAxis(true)
            .showControls(true)
            .controlLabels({ stacked: 'Stacked' })
            .clipEdge(true);

        this.chart.xAxis
            .tickFormat(function (d) {
                return d3.time.format('%x')(new Date(d))
            });

        this.chart.yAxis
            .tickFormat(d3.format(',.2f'));


    }

    updateChart() {

        d3.select('#stackedarea svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
