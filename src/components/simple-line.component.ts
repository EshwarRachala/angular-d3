import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'line-chart',
    template: '<div id="simpleline"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class SimpleLineChartComponent implements OnInit, OnChanges {
    chart: nv.LineChart;
    @Input() data: any;
    @Input() margin: any;
    @Input() height: number;
    @Input() xlabel: string;
    @Input() ylabel: string;

    constructor() {
        this.margin = { left: 100 };
    }

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
            .margin(this.margin)
            .useInteractiveGuideline(true)
            .showLegend(true)
            .showYAxis(true)
            .showXAxis(true)
            .tooltips(true);

        this.chart.xAxis
            .axisLabel(this.xlabel)
            .tickFormat(d3.format(',.1f'))
            .staggerLabels(true);

        this.chart.yAxis
            .axisLabel(this.ylabel)
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
