import { Meta, StoryFn } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
  argTypes: {
    clickEvent: { action: 'clicked' },
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    cssClass: { control: 'text' },
    icon: { control: 'text' },
  },
} as Meta<ButtonComponent>;

const Template: StoryFn = args => ({
  component: ButtonComponent,
  props: args,
});

export const Back = Template.bind({});
Back.args = {
  label: 'Back to List',
  cssClass: 'button--back',
  disabled: false,
  type: 'button',
};

export const Pagination = Template.bind({});
Pagination.args = {
  label: '◄ Prev',
  cssClass: 'button--pagination',
  disabled: false,
  type: 'button',
};

export const Remove = Template.bind({});
Remove.args = {
  icon: 'delete_forever',
  cssClass: 'modal--remove',
  disabled: false,
  type: 'button',
};

export const CloseModal = Template.bind({});
CloseModal.args = {
  label: 'Close',
  cssClass: 'modal--cancel',
  disabled: false,
  type: 'button',
};

export const AddModal = Template.bind({});
AddModal.args = {
  label: 'Add',
  cssClass: 'modal--add',
  disabled: false,
  type: 'button',
};

export const CancelModal = Template.bind({});
CancelModal.args = {
  label: 'Cancel',
  cssClass: 'modal--cancel',
  disabled: false,
  type: 'button',
};
