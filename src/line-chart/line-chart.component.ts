import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { D3Service, D3 } from '../d3/d3.service';

@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 60, left: 50, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private line: any;
    private d3service: D3Service;
    private d3: D3;

    constructor(private d3Service: D3Service) {
        this.d3service = d3Service;
        this.d3 = this.d3Service.getD3();
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
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        const svg = this.d3service.getSvg(element);

        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

         // create scales
        this.xScale = this.d3.scaleLinear()
            .domain(this.d3.extent(this.data, d => d.x))
            .range([0, this.width]);

        this.yScale = this.d3.scaleLinear()
            .domain(this.d3.extent(this.data, d => d.y))
            .range([this.height, 0]);

       this.line = this.d3.line()
            .x((d: any) => this.xScale(d.x))
            .y((d: any) => this.yScale(d.y));

        this.chart
            .append('path')
            .data([this.data])
            .attr('class', 'line')
            .attr('d', this.line);

        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(this.d3.axisBottom(this.xScale));

        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(this.d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.d3.extent(this.data, d => d.x));
        this.yScale.domain(this.d3.extent(this.data, d => d.y));

        this.xAxis.transition().call(this.d3.axisBottom(this.xScale));
        this.yAxis.transition().call(this.d3.axisLeft(this.yScale));

        const update = this.chart.select('.line');

        // // remove exiting bars
        update.exit().remove();

         this.chart
            .append('path')
            .data([this.data])
            .attr('class', 'line')
            .attr('d', this.line);
 }
}
