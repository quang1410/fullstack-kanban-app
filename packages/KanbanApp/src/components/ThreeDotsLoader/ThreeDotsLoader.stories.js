import ThreeDotsLoader from './ThreeDotsLoader';
import { colors } from 'styles/theme';

export default {
  title: 'ThreeDotsLoader',
  component: ThreeDotsLoader,
};

const Template = (args) => <ThreeDotsLoader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: colors.electricViolet,
};
