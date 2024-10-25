import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoin } from '../../../shared/models/coin-response.model';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
})
export class CoinDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

  public addToPortfolio(coin: ICoin): void {
    console.log('Added to portfolio:', coin);
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
