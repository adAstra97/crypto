import { provideMockStore } from '@ngrx/store/testing';
import { Meta, StoryFn } from '@storybook/angular';
import { CoinListComponent } from './coin-list.component';
import { moduleMetadata } from '@storybook/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { exampleCoins } from '../../../shared/mocks/coins';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CoinService } from '../../services/coin.service';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { ICoin } from '../../../shared/models/coin-response.model';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';

const initialState = {
  coins: {
    allCoins: exampleCoins,
  },
};

export default {
  title: 'Components/CoinList',
  component: CoinListComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, ModalComponent, InputSearchComponent],
      imports: [MatProgressSpinnerModule],
      providers: [
        {
          provide: CoinService,
          useValue: {
            getTotalCoins: () => of([]),
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
        provideMockStore({ initialState }),
      ],
    }),
  ],
  argTypes: {
    onSearch: { action: 'searchChange' },
    onSort: { action: 'sort' },
    openAddCoinModal: { action: 'openModal' },
    closeAddCoinModal: { action: 'closeModal' },
  },
} as Meta<CoinListComponent>;

const Template: StoryFn<CoinListComponent> = args => ({
  component: CoinListComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  isAddCoinModalOpen: false,
  coins$: of(exampleCoins),
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  coins$: of([]),
};

export const EmptyResult = Template.bind({});
EmptyResult.args = {
  isLoading: false,
  coins$: of([]),
};

export const SortedByPriceAsc = Template.bind({});
SortedByPriceAsc.args = {
  isLoading: false,
  sortBy: 'priceUsd',
  sortDirection: 'asc',
  coins$: of(exampleCoins),
};

export const AddCoinModalOpen = Template.bind({});
AddCoinModalOpen.args = {
  isLoading: false,
  isAddCoinModalOpen: true,
  selectedCoin: exampleCoins[0],
  coins$: of(exampleCoins),
};
