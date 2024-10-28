import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SharedModule } from '../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, PortfolioComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
  providers: [provideHttpClient()],
})
export class CoreModule {}
