import Button from './Button';
import { colors } from 'styles/theme';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  loading: false,
  bgColor: colors.electricViolet,
  color: 'rgba(255, 255, 255, 0.98)',
  className: '',
  onClick: action('onClick'),
};

export const WhiteButton = Template.bind({});
WhiteButton.args = {
  loading: false,
  bgColor: colors.gray200,
  color: colors.electricViolet,
  className: '',
  onClick: action('onClick'),
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  loading: true,
  bgColor: colors.electricViolet,
  color: 'rgba(255, 255, 255, 0.98)',
  className: '',
  onClick: action('onClick'),
};
