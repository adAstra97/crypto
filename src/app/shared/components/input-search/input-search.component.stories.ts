import { Meta, StoryFn } from '@storybook/angular';
import { InputSearchComponent } from './input-search.component';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Components/InputSearch',
  component: InputSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  argTypes: {
    searchChange: { action: 'searchChange emitted' },
  },
} as Meta<InputSearchComponent>;

const Template: StoryFn<InputSearchComponent> = args => ({
  component: InputSearchComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'Default Search Input';
