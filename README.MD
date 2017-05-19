# angular-nvd3

## Installation

To install this library, run:

```bash
$ npm install @angular/nvd3 --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install @angular/nvd3
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { ChartModule } from '@angular/nvd3';

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
