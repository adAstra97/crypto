import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoinsPageComponent,
  },
  { path: 'coin/:id', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinsRoutingModule {}
