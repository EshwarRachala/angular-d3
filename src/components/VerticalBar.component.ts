import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'vbar-chart',
    template: '<div id="vbar"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class VBarComponent implements OnInit, OnChanges {
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

        this.chart =
            nv.models.discreteBarChart()
                .x(d => d.label)
                .y(d => d.value)
                .staggerLabels(true)
                .showValues(true)
                .showXAxis(true)
                .showYAxis(true)
                .duration(250);

        this.chart.options = nv.utils.optionsFunc.bind(this.chart);


    }

    updateChart() {

        d3.select('#vbar svg')
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
