# ngnvd3

## Installation

To install this library, run:

```bash
$ npm install ngnvd3 --save
```

## nvd3 examples 
http://ngnvd3.surge.sh/

## Examples Repo
Reference `https://github.com/EshwarRachala/angular-d3-demo` for examples.

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngnvd3
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { ChartModule } from 'ngnvd3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify your library as an import
    ChartModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }


## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [eshwar rachala](mailto:eshwar.appdev@gmail.com)
