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
    @Input() data: any;
    @Input() height: number;
    @Input() xlabel: string;
    @Input() ylabel: string;


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

        this.chart =
            nv.models.multiBarChart()
                .barColor(d3.scale.category20().range())
                .reduceXTicks(true)
                .duration(350)
                .margin({ bottom: 100, left: 70 })
                .rotateLabels(45)
                .showControls(true)
                .groupSpacing(0.1)
                .staggerLabels(true);

        this.chart.xAxis
            .axisLabel(this.xlabel)
            .axisLabelDistance(35)
            .showMaxMin(false)
            .tickFormat(d3.format(',.6f'));
        ;

        this.chart.yAxis
            .axisLabel(this.ylabel)
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'));
    }

    updateChart() {

        d3.select('#vmb svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
