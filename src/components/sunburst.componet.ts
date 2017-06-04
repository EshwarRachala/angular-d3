import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'sunburst-chart',
    template: '<div id="sunburst"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class SunburstChartComponent implements OnInit, OnChanges {
    chart: nv.SunburstChart;
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

        this.chart = nv.models.sunburstChart();

        this.chart.color(d3.scale.category20c());
    }

    updateChart() {

        d3.select('#sunburst svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
