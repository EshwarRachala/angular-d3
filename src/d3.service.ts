import { Injectable } from '@angular/core';
import nv from 'nvd3';
import * as d3 from 'd3';
export type D3 = typeof d3;

@Injectable()
export class D3Service {
  private htmlelement: HTMLElement;
  private nv: any;
  constructor() { }
  getnv() {
    this.nv = nv;
  }
}

