import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CoinItemComponent } from './components/coin-item/coin-item.component';
import { SharedModule } from '../shared/shared.module';
import { CoinsRoutingModule } from './coins-routing.module';

@NgModule({
  declarations: [CoinListComponent, CoinItemComponent],
  imports: [CommonModule, SharedModule, CoinsRoutingModule],
})
export class CoinsModule {}
