import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'bullet-chart',
    template: '<div id="bulletchart"></div>',
    encapsulation: ViewEncapsulation.None
})
export class BulletChartComponent implements OnInit, OnChanges {
    chart: any;
    @Input() data: any;
    @Input() height: number;
    @Input() width: number;
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

        this.chart = nv.models.bulletChart();

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

        d3.select('#bulletchart')
            .selectAll('svg')
            .data(this.data)
            .enter()
            .append('svg')
            .attr('class', 'bullet nvd3')
            .attr('width', this.width)
            .attr('height', this.height);

        nv.utils.windowResize(this.chart.update);

    }

}
