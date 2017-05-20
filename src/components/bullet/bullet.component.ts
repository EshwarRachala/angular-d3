import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../services/nv-d3.service';

@Component({
    selector: 'bullet-chart',
    templateUrl: 'bullet.component.html'
})

export class BulletChartComponent implements OnInit {
    private nv: any;
    private d3: any;
    @ViewChild('chart') private chartContainer: ElementRef;
    private height: number;
    private width: number;
    private margin = { top: 5, right: 40, bottom: 20, left: 120 };

    private data = [
        {
            'title': 'Revenue', 'subtitle': 'US$, in thousands',
            'ranges': [150, 225, 300], 'measures': [220], 'markers': [250],
            'markerLines': [270]
        },
        {
            'title': 'Order Size', 'subtitle': 'US$, average',
            'ranges': [350, 500, 600], 'measures': [100], 'markers': [550],
            'markerLines': [530]
        },
        {
            'title': 'Satisfaction', 'subtitle': 'out of 5',
            'ranges': [3.5, 4.25, 5], 'measures': [3.2, 4.7],
            'markers': [4.4], 'markerLines': [3.8]
        }
    ];

    constructor(private service: ChartService) {
        this.nv = service.getnvD3();
        this.d3 = service.getD3();
    }

    ngOnInit() {
        // tslint:disable-next-line:no-debugger
        //  debugger;
        const element = this.chartContainer.nativeElement;
        this.width = element.clientWidth;
        this.height = 80;

        const chart = this.nv.models.bulletChart()
            .width(this.width - this.margin.right - this.margin.left)
            .height(this.height - this.margin.top - this.margin.bottom);

        const vis = this.d3.select(element)
            .selectAll('svg')
            .data(this.data)
            .enter()
            .append('svg')
            .attr('class', 'bullet nvd3')
            .attr('width', this.width)
            .attr('height', this.height);


        vis.transition().duration(1000).call(chart);
    }
}
