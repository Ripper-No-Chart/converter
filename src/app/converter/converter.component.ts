import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrenciesService } from '../services/currencies.service';

interface conversion {
  USD: number;
  ARS: number;
  MXN: number;
}

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  imports: [FormsModule, CommonModule],
})
export class ConverterComponent {
  selectedCurrency: keyof conversion = 'USD';
  conversionResults: { USD: number; ARS: number; MXN: number } = {
    USD: 1,
    ARS: 1,
    MXN: 1,
  };
  input: number = 1;
  currencies: Array<keyof conversion> = ['USD', 'ARS', 'MXN'];
  @ViewChild('amount') amount!: ElementRef<HTMLInputElement>;

  constructor(private currencyService: CurrenciesService) {}

  convertCurrency(event: KeyboardEvent): void {
    if (this.input > 0 && event.key === 'Enter') {
      this.conversionResults = this.currencyService.convertCurrency(
        this.input,
        this.selectedCurrency
      );
      this.setInputFocus();
    } else {
      this.resetValues();
    }
  }

  resetValues(): void {
    this.conversionResults = { USD: 0, ARS: 0, MXN: 0 };
  }

  setInputFocus(): void {
    this.amount.nativeElement.focus();
    this.amount.nativeElement.select();
  }
}
