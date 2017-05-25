import { Injectable } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';

@Injectable()
export class ChartService {

  constructor() { }

  getnvD3() {
    return nv;
  }

  getD3() {
    return d3;
  }

}

