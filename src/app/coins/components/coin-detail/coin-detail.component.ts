import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICoin,
  IHistoryItem,
} from '../../../shared/models/coin-response.model';
import { CoinService } from '../../services/coin.service';
import { Chart, registerables } from 'chart.js';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
})
export class CoinDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  public coin!: ICoin;
  public chart!: Chart<'line', string[], string>;
  public isLoading = true;
  public errorMessage: string | null = null;

  public isAddCoinModalOpen = false;
  public isAdding = true;
  public selectedCoin?: ICoin;

  private subscriptions: Subscription[] = [];

  @ViewChild('coinChartCanvas', { static: false })
  coinChartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.subscriptions.push(this.loadCoinDetails(id));
    } else {
      this.errorMessage = 'Invalid coin ID';
    }

    this.subscriptions.push(this.coinService.getPopularCoins().subscribe());
  }

  ngAfterViewInit(): void {
    this.loadChart('24h');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onTimeRangeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const interval = target.value;
    this.loadChart(interval);
  }

  public openAddCoinModal(event: MouseEvent, coin: ICoin): void {
    event.stopPropagation();
    this.selectedCoin = coin;
    this.isAddCoinModalOpen = true;
  }

  public closeAddCoinModal(): void {
    this.isAddCoinModalOpen = false;
    this.selectedCoin = undefined;
  }

  public addToPortfolio(quantity: number): void {
    if (this.selectedCoin) {
      this.portfolioService.addCoin(this.selectedCoin, quantity);
      this.closeAddCoinModal();
    }
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public getIconUrl(symbol: string): string {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  }

  private loadCoinDetails(id: string): Subscription {
    return this.coinService.getCoinDetail(id).subscribe({
      next: coin => {
        this.coin = coin;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load coin details';
        this.isLoading = false;
      },
    });
  }

  private loadChart(interval: string): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('Coin ID is not available');
      return;
    }

    const requestInterval = this.getRequestInterval(interval);
    this.subscriptions.push(
      this.coinService.getCoinHistory(id, requestInterval).subscribe({
        next: data => this.handleChartData(data, interval),
        error: () => console.error('Failed to load coin history'),
      })
    );
  }

  private getRequestInterval(interval: string): string {
    return interval === '24h' || interval === '12h' ? 'h1' : 'm1';
  }

  private handleChartData(data: IHistoryItem[], interval: string): void {
    const filteredData = this.filterDataByTime(data, interval);
    const prices = filteredData.map(item => item.priceUsd);
    const labels = filteredData.map(item =>
      new Date(item.time).toLocaleTimeString()
    );

    this.updateChart(prices, labels);
  }

  private filterDataByTime(
    data: IHistoryItem[],
    interval: string
  ): IHistoryItem[] {
    const currentTime = new Date().getTime();
    const timeThreshold = this.getTimeThreshold(currentTime, interval);

    return data.filter(item => item.time >= timeThreshold);
  }

  private getTimeThreshold(currentTime: number, interval: string): number {
    switch (interval) {
      case '24h':
        return currentTime - 24 * 60 * 60 * 1000;
      case '12h':
        return currentTime - 12 * 60 * 60 * 1000;
      case '1h':
        return currentTime - 1 * 60 * 60 * 1000;
      default:
        console.error('Invalid interval specified');
        return currentTime;
    }
  }

  private updateChart(prices: string[], labels: string[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.coinChartCanvas) {
      this.chart = new Chart(this.coinChartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: true,
            },
          ],
        },
      });
    }
  }
}
