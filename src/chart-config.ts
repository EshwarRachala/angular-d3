import * as nv from 'nvd3';

export interface ChartConfig {
    data: any;
    margin: any;
    height: number;
    width?: number;
    xlabel: string;
    ylabel: string;
}
