import { Injectable } from '@angular/core';
import * as nv from 'nvd3';
import * as d3 from 'd3';

export type D3 = typeof d3;
export type NV = typeof nv;


@Injectable()
export class ChartService {

  constructor() { }

  getnvD3(): NV {
    return nv;
  }

  getD3() {
    return d3;
  }

}

