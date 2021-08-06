import { Component, OnInit, OnDestroy } from '@angular/core';
import {UtilService} from '../../services/util.service';
import {AppSettingsService} from '../../services/app-settings.service';
import * as btcocurrency from 'btcocurrency';
import {PriceService} from '../../services/price.service';
import { BigNumber } from 'bignumber.js';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.less']
})
export class ConverterComponent implements OnInit, OnDestroy {
  MBtco = '1';
  raw = '';
  invalidMBtco = false;
  invalidRaw = false;
  invalidFiat = false;
  fiatPrice = '0';
  priceSub = null;

  constructor(
    private util: UtilService,
    public settings: AppSettingsService,
    private price: PriceService,
    public notifications: NotificationService,
  ) { }

  ngOnInit(): void {
    BigNumber.config({ DECIMAL_PLACES: 30 });
    this.MBtco = '1';

    this.priceSub = this.price.lastPrice$.subscribe(event => {
      this.fiatPrice = (new BigNumber(this.MBtco)).times(this.price.price.lastPrice).toString();
    });

    this.unitChange('mbtco');
  }

  ngOnDestroy() {
    if (this.priceSub) {
      this.priceSub.unsubscribe();
    }
  }

  unitChange(unit) {
    switch (unit) {
      case 'mbtco':
        if (this.util.account.isValidNanoAmount(this.MBtco)) {
          this.raw = btcocurrency.convert(this.MBtco, {from: btcocurrency.Unit.BTCO, to: btcocurrency.Unit.raw});
          this.fiatPrice = (new BigNumber(this.MBtco)).times(this.price.price.lastPrice).toString(10);
          this.invalidMBtco = false;
          this.invalidRaw = false;
          this.invalidFiat = false;
        } else {
          this.raw = '';
          this.fiatPrice = '';
          this.invalidMBtco = true;
        }
        break;
      case 'raw':
        if (this.util.account.isValidAmount(this.raw)) {
          this.MBtco = btcocurrency.convert(this.raw, {from: btcocurrency.Unit.raw, to: btcocurrency.Unit.BTCO});
          this.fiatPrice = (new BigNumber(this.MBtco)).times(this.price.price.lastPrice).toString(10);
          this.invalidRaw = false;
          this.invalidMBtco = false;
          this.invalidFiat = false;
        } else {
          this.MBtco = '';
          this.fiatPrice = '';
          this.invalidRaw = true;
        }
        break;
      case 'fiat':
        if (this.util.string.isNumeric(this.fiatPrice)) {
          this.MBtco = (new BigNumber(this.fiatPrice)).dividedBy(this.price.price.lastPrice).toString(10);
          this.raw = btcocurrency.convert(this.MBtco, {from: btcocurrency.Unit.BTCO, to: btcocurrency.Unit.raw});
          this.invalidRaw = false;
          this.invalidMBtco = false;
          this.invalidFiat = false;
        } else {
          this.MBtco = '';
          this.raw = '';
          this.invalidFiat = true;
        }
        break;
    }
  }

}
