import { endTimeRange } from '@angular/core/src/profile/wtf_impl';
import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { D3Service, D3 } from '../../services/d3.service';

@Component({
    selector: 's-g-bar',
    templateUrl: './s-g-bar.component.html',
    styleUrls: ['./s-g-bar.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SGBarComponent implements OnInit, OnChanges {
    value: string;
    @ViewChild('chart') private chartContainer: ElementRef;
    // @Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 60, left: 50, right: 20 };
    private width: number;
    private height: number;
    private n = 4;
    private m = 58;
    private xScale: any;
    private yScale: any;
    private xz: any;
    private yz: any;
    private yMax: any;
    private y01z: any;
    private y1Max: any;
    private color: any;
    private xAxis: any;
    private yAxis: any;
    private rect: any;
    private timeout: any;
    private d3service: D3Service;
    private d3: D3;
    private chart: any;

    constructor(private d3Service: D3Service) {
        this.d3service = d3Service;
        this.d3 = d3Service.getD3();
    }

    ngOnInit() {
        this.createChart();
        this.updateChart();
    }

    ngOnChanges() {
        if (this.chart) {
            //  this.updateChart();
        }
    }

    createChart() {
        const d3 = this.d3;
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;


        const svg = this.d3service.getSvg(element);

        this.chart = svg.append('g').attr('transform',
            'translate(' + this.margin.left + ',' + this.margin.top + ')');


        // chart plot area
    }

    updateChart() {
        const d3 = this.d3;

        const n = 4, // The number of series.
            m = 58; // The number of values per series.
        const xz: any = d3.range(m),
            yz = d3.range(n).map(function () { return bumps(m); }),
            range: any = d3.range(n),
            transpose: any = d3.transpose(yz),
            y01z: any = d3.stack().keys(range)(transpose),
            yMax: any = d3.max(yz, function (y) { return d3.max(y); }),
            y1Max: any = d3.max(y01z, function (y: any) {
                return d3.max(y, function (d) { return d[1]; });
            });

        const x = d3.scaleBand()
            .domain(xz)
            .rangeRound([0, this.width])
            .padding(0.08);

        const y = d3.scaleLinear()
            .domain([0, y1Max])
            .range([this.height, 0]);

        const color = d3.scaleOrdinal()
            .domain(range)
            .range(d3.schemeCategory20c);

        const series = this.chart.selectAll('.series')
            .data(y01z)
            .enter().append('g')
            .attr('fill', function (d, i) { return color(i); });

        const rect = series.selectAll('rect')
            .data((d: any) => d)
            .enter().append('rect')
            .attr('x', (d, i: any) => x(i))
            .attr('y', this.height)
            .attr('width', x.bandwidth())
            .attr('height', 0);


        rect.transition()
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d) { return y(d[1]); })
            .attr('height', function (d) { return y(d[0]) - y(d[1]); });

        this.chart.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x)
                .tickSize(0)
                .tickPadding(6));

        d3.selectAll('input')
            .on('change', changed);

        const timeout = d3.timeout(function () {
            d3.select('input[value="grouped"]')
                .property('checked', true)
                .dispatch('change');
        }, 1000);

        function changed() {
            // timeout.stop();
            // tslint:disable-next-line:curly
            if (this.value === 'grouped') transitionGrouped(); else transitionStacked();
        }

        // .attr('x', (d, i: any) => x(i) + x.bandwidth() / n * this.parentNode.__data__.key)

        function transitionGrouped() {
            y.domain([0, yMax]);
            rect.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr('x', function (d, i) {
                    return x(i) + x.bandwidth() / n * this.parentNode.__data__.key;
                })
                .attr('width', x.bandwidth() / n)
                .transition()
                .attr('y', function (d) { return y(d[1] - d[0]); })
                .attr('height', function (d) { return y(0) - y(d[1] - d[0]); });
        }

        function transitionStacked() {
            y.domain([0, y1Max]);

            rect.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr('y', function (d) { return y(d[1]); })
                .attr('height', function (d) { return y(d[0]) - y(d[1]); })
                .transition()
                .attr('x', (d, i: any) => x(i))
                .attr('width', x.bandwidth());
        }

        // tslint:disable-next-line:no-shadowed-variable
        function bumps(m) {
            // tslint:disable-next-line:prefer-const
            let values = [];
            // tslint:disable-next-line:no-shadowed-variable
            let i, j, w, x, y, z;

            // Initialize with uniform random values in [0.1, 0.2).
            for (i = 0; i < m; ++i) {
                values[i] = 0.3 + 0.1 * Math.random();
            }

            // Add five random bumps.
            for (j = 0; j < 5; ++j) {
                x = 1 / (0.1 + Math.random());
                y = 2 * Math.random() - 0.5;
                z = 10 / (0.1 + Math.random());
                for (i = 0; i < m; i++) {
                    w = (i / m - y) * z;
                    values[i] += x * Math.exp(-w * w);
                }
            }

            // Ensure all values are positive.
            for (i = 0; i < m; ++i) {
                values[i] = Math.max(0, values[i]);
            }

            return values;
        }


    }

}
