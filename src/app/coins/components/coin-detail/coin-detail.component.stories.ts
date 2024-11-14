import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { CoinDetailComponent } from './coin-detail.component';
import { CoinService } from '../../services/coin.service';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ICoin } from '../../../shared/models/coin-response.model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { exampleCoins, exampleHistory } from '../../../shared/mocks/coins';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export default {
  title: 'Components/CoinDetail',
  component: CoinDetailComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, ModalComponent],
      imports: [MatProgressSpinnerModule, MatIconModule, FormsModule],
      providers: [
        {
          provide: CoinService,
          useValue: {
            getCoinDetail: () => of(exampleCoins[0]),
            getCoinHistory: () => of(exampleHistory),
            getPopularCoins: () => of([]),
          },
        },
        {
          provide: PortfolioService,
          useValue: {
            addCoin: (coin: ICoin, quantity: number) =>
              console.log('Added', coin, quantity),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'bitcoin' } },
          },
        },
      ],
    }),
  ],
  argTypes: {
    goBack: { action: 'goBack' },
    openAddCoinModal: { action: 'openAddCoinModal' },
    closeAddCoinModal: { action: 'closeAddCoinModal' },
    addToPortfolio: { action: 'addToPortfolio' },
  },
} as Meta<CoinDetailComponent>;

const Template: StoryFn<CoinDetailComponent> = args => ({
  component: CoinDetailComponent,
  props: args,
});

export const LoadingState = Template.bind({});
LoadingState.args = {
  isLoading: true,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  isLoading: false,
  errorMessage: 'Failed to load coin details',
};

export const LoadedState = Template.bind({});
LoadedState.args = {
  isLoading: false,
  coin: exampleCoins[0],
};
