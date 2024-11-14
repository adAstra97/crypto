import { Meta, StoryFn } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { exampleCoins } from '../../mocks/coins';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [FormsModule, MatIconModule],
    }),
  ],
  argTypes: {
    close: { action: 'close' },
    removeCoin: { action: 'removeCoin emitted' },
    addCoin: { action: 'addCoin emitted' },
  },
} as Meta<ModalComponent>;

const Template: StoryFn<ModalComponent> = args => ({
  component: ModalComponent,
  props: args,
});

export const PortfolioMode = Template.bind({});
PortfolioMode.args = {
  mode: 'portfolio',
  coins: exampleCoins,
};
PortfolioMode.storyName = 'Portfolio Mode';

export const AddMode = Template.bind({});
AddMode.args = {
  mode: 'add',
  coin: exampleCoins[0],
};
AddMode.storyName = 'Add Mode';
