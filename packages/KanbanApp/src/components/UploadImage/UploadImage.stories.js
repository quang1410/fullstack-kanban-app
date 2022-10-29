import UploadImage from './UploadImage'
import { action } from '@storybook/addon-actions';
import image from '../../../public/favicon192.png'

export default {
  title: 'UploadImage',
  component: UploadImage,
  decorators: [
    (Story) => (
      <div style={{ margin: '3rem' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <UploadImage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    className: null,
    src: image,
    loading: false,
    onChange: action('onChange'),
};