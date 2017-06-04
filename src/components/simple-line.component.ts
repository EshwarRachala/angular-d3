import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'line-chart',
    template: '<div id="simpleline"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class SimpleLineChartComponent implements OnInit, OnChanges {
    chart: any;
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

        this.chart = nv.models.lineChart()
            .margin({ left: 100 })
            .useInteractiveGuideline(true)
            .showLegend(true)
            .showYAxis(true)
            .showXAxis(true);


        this.chart.xAxis
            .axisLabel('Time (s)')
            .tickFormat(d3.format(',.1f'))
            .staggerLabels(true);

        this.chart.yAxis
            .axisLabel('Voltage (v)')
            .tickFormat(function (d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            })
            ;


    }

    updateChart() {

        d3.select('#simpleline svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
