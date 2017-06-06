import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'vmb-chart',
    template: '<div id="vmb"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class VMBChartComponent implements OnInit, OnChanges {
    chart: nv.MultiBarChart;
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


        this.chart =
            nv.models.multiBarChart()
                .barColor(d3.scale.category20().range())
                .reduceXTicks(true)
                .duration(350)
                .margin(margin)
                .rotateLabels(45)
                .showControls(true)
                .groupSpacing(0.1)
                .staggerLabels(true);

        this.chart.xAxis
            .axisLabel(this.config.xlabel !== undefined ? '' : this.config.xlabel)
            .axisLabelDistance(35)
            .showMaxMin(false)
            .tickFormat(d3.format(',.6f'));
        ;

        this.chart.yAxis
            .axisLabel(this.config.ylabel !== undefined ? '' : this.config.ylabel)
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'));
    }

    updateChart() {

        d3.select('#vmb svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
