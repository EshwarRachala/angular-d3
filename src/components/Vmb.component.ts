import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'vmb-chart',
    template: '<svg id="chart"></svg>',
    encapsulation: ViewEncapsulation.None
})
export class VMBChartComponent implements OnInit, OnChanges {
    chart: any;
    @Input() data: any;
    @Input() height: number;

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

        this.chart = nv.models.multiBarChart()
            .barColor(d3.scale.category20().range())
            .reduceXTicks(true)
            .duration(350)
            .margin({ bottom: 100, left: 70 })
            .rotateLabels(45)
            .showControls(true)
            .groupSpacing(0.1)
            .staggerLabels(true);

        this.chart.xAxis
            .axisLabel('ID of Furry Cat Households')
            .axisLabelDistance(35)
            .showMaxMin(false)
            .tickFormat(d3.format(',.6f'));
        ;

        this.chart.yAxis
            .axisLabel('Change in Furry Cat Population')
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'));
    }

    updateChart() {

        d3.select('#chart')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
