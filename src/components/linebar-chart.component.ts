import { ChartConfig } from '../chart-config';
import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'linebar-chart',
    template: '<div id="linebar"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class LineBarChartComponent implements OnInit, OnChanges {
    chart: nv.LinePlusBarChart;
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

        this.chart = nv.models.linePlusBarChart()
            .margin({ top: 30, right: 60, bottom: 50, left: 70 })
            .x(i => i)
            .y(d => d[1])
            .color(d3.scale.category10().range());



        this.chart.y1Axis
            .tickFormat(d3.format(',f'));

        this.chart.y2Axis
            .tickFormat(function (d) { return '$' + d3.format(',f')(d) });

        this.chart.bars.forceY([0]).padData(false);
    }

    updateChart() {

        this.chart.xAxis.tickFormat(function (d) {
            const dx = this.data[0].values[d] && this.data[0].values[d][0] || 0;
            return d3.time.format('%x')(new Date(dx))
        }).showMaxMin(false);

        d3.select('#linebar svg')
            .attr('height', this.config.height !== undefined ?
                this.config.height : 500)
            .datum(this.config.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
