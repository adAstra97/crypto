import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { SharedModule } from '../shared/shared.module';
import { CoinsRoutingModule } from './coins-routing.module';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { FormsModule } from '@angular/forms';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

@NgModule({
  declarations: [CoinListComponent, CoinDetailComponent, CoinsPageComponent, DetailPageComponent],
  imports: [CommonModule, FormsModule, SharedModule, CoinsRoutingModule],
})
export class CoinsModule {}
