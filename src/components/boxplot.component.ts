import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'boxplot-chart',
    template: '<div id="boxplot"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class BoxplotChartComponent implements OnInit, OnChanges {
    chart: nv.BoxPlotChart;
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

        this.chart = nv.models.boxPlotChart()
            .x(function (d) { return d.label })
            .staggerLabels(true)
            .maxBoxWidth(75) // prevent boxes from being incredibly wide
            .yDomain([0, 500]);

    }

    updateChart() {

        d3.select('#boxplot svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
