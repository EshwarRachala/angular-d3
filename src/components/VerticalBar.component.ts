import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'discretebar-chart',
    template: '<div id="vbar"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class VBarComponent implements OnInit, OnChanges {
    chart: nv.DiscreteBarChart;
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

        this.chart =
            nv.models.discreteBarChart()
                .x(d => d.label)
                .y(d => d.value)
                .staggerLabels(true)
                .showValues(true)
                .showXAxis(true)
                .showYAxis(true)
                .duration(250);
    }

    updateChart() {

        d3.select('#vbar svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
