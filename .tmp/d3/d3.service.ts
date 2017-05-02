import { Injectable } from '@angular/core';
import * as d3 from './d3';

export type D3 = typeof d3;

@Injectable()
export class D3Service {
  private htmlelement: HTMLElement;
  constructor() { }

  public getD3(): D3 {
    return d3;
  }

  public getSvg(element: HTMLElement):
    d3.Selection<Element | d3.EnterElement | Document | Window, {}, null, undefined> {
    this.htmlelement = element;
    const width = this.htmlelement.clientWidth;
    const height = this.htmlelement.clientWidth * 0.5;

    const svg = d3.select(this.htmlelement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(this.responsify);

    return svg;
  }

  private responsify(svg: any) {
    const container = d3.select(svg.node().parentNode);

    // tslint:disable-next-line:radix
    const width = parseInt(svg.style('width'));
    // tslint:disable-next-line:radix
    const height = parseInt(svg.style('height'));

    const aspect = (width / height);

    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

    d3.select(window).on('resize.' + container.attr('id'), resize);

    function resize() {
      // tslint:disable-next-line:radix
      const targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
      //  svg.style('background-color', 'lightgray');
    }
  }
}

