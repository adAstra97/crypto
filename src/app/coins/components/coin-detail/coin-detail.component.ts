import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoin } from '../../../shared/models/coin-response.model';
import { CoinService } from '../../services/coin.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  public coin!: ICoin;
  public chart!: Chart<'line', string[], string>;
  public isLoading = true;
  public errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coinService: CoinService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadCoinDetails(id);
    } else {
      this.errorMessage = 'Invalid coin ID';
    }

    this.loadChart('d1');
  }

  public onTimeRangeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const interval = target.value;
    this.loadChart(interval);
  }

  public addToPortfolio(coin: ICoin): void {
    console.log('Added to portfolio:', coin);
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public getIconUrl(symbol: string): string {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  }

  private loadCoinDetails(id: string): void {
    this.coinService.getCoinDetail(id).subscribe({
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

    if (id) {
      this.coinService.getCoinHistory(id, interval).subscribe({
        next: data => {
          const prices = data.map(item => item.priceUsd);
          const labels = data.map(item =>
            new Date(item.time).toLocaleTimeString()
          );

          if (this.chart) {
            this.chart.destroy();
          }

          this.chart = new Chart('coinChart', {
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
        },
      });
    }
  }
}
