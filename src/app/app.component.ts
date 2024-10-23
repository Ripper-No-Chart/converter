import { Component, OnInit } from '@angular/core';
import { ConverterComponent } from './converter/converter.component';
import { CurrenciesService } from './services/currencies.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <app-converter></app-converter> `,
  imports: [ConverterComponent],
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrenciesService) {}

  ngOnInit() {
    this.currencyService.fetchDolarBlue().subscribe();
    this.currencyService.fetchMxnPesos().subscribe();
  }
}
