import { analyzeNgModules } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

@Component({
    selector: 'line-bar-chart',
    template: '<div id="linebar"><svg></svg></div>',
    encapsulation: ViewEncapsulation.None
})
export class LineBarChartComponent implements OnInit, OnChanges {
    chart: nv.LinePlusBarChart;
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
            .attr('height', this.height)
            .datum(this.data)
            .transition()
            .duration(350)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }

}
