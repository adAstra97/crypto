import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoin } from '../../../shared/models/coin-response.model';
import { CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
})
export class CoinDetailComponent implements OnInit {
  public coin!: ICoin;
  public isLoading = true;
  public errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coinService: CoinService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadCoinDetails(id);
    } else {
      this.errorMessage = 'Invalid coin ID';
    }
  }

  public addToPortfolio(coin: ICoin): void {
    console.log('Added to portfolio:', coin);
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  private loadCoinDetails(id: string): void {
    this.coinService.getCoinDetail(id).subscribe({
      next: coin => {
        this.coin = coin;
        this.isLoading = false;
        console.log(this.coin);
      },
      error: error => {
        this.errorMessage = 'Failed to load coin details';
        this.isLoading = false;
      },
    });
  }
}
