import {Component, Input, OnChanges, HostBinding} from '@angular/core';

@Component({
  selector: 'app-btco-account-id',
  templateUrl: './btco-account-id.component.html',
  styleUrls: ['./btco-account-id.component.css'],
})
export class NanoAccountIdComponent implements OnChanges {

  @HostBinding('class') classes: string;
  @Input() accountID: string;
  @Input() middle: 'on'|'off'|'auto'|'break' = 'auto';

  firstCharacters = '';
  middleCharacters = '';
  lastCharacters = '';

  constructor() { }

  ngOnChanges() {
    if (this.middle === 'auto') this.classes = 'uk-flex';
    if (this.middle === 'break') this.classes = 'btco-address-breakable';
    const accountID = this.accountID;
    const openingChars = 10;
    const closingChars = 5;
    this.firstCharacters = accountID.split('').slice(0, openingChars).join('');
    this.lastCharacters = accountID.split('').slice(-closingChars).join('');
    if (this.middle !== 'off') {
      this.middleCharacters = accountID.split('').slice(openingChars, -closingChars).join('');
    }
  }

}
