import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { SharedModule } from '../shared/shared.module';
import { CoinsRoutingModule } from './coins-routing.module';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoinListComponent, CoinDetailComponent],
  imports: [CommonModule, FormsModule, SharedModule, CoinsRoutingModule],
})
export class CoinsModule {}
