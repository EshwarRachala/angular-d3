export interface IChart {
    margin: any;
    chart: any;
    width: number;
    height: number;
    xScale: any;
    yScale: any;
    colors: any;
    xAxis: any;
    yAxis: any;

    createChart();
    updateChart();
}
