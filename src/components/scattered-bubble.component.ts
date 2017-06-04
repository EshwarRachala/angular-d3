import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'scatteredbubble-chart',
    template: '<div id="scatteredbubble"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class ScatteredBubbleChartComponent implements OnInit, OnChanges {
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

        this.chart = nv.models.scatterChart()
            .showDistX(true)
            .showDistY(true)
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300);


        // Axis settings
        this.chart.xAxis.tickFormat(d3.format('.02f'));
        this.chart.yAxis.tickFormat(d3.format('.02f'));

    }

    updateChart() {

        d3.select('#scatteredbubble svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
