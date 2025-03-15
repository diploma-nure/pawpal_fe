import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
      description: 'Visual style of the button',
    },
    color: {
      control: 'select',
      options: ['primary'],
      description: 'Color theme of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    leftIcon: {
      control: { disable: true },
      description: 'Icon displayed on the left side of the button',
    },
    rightIcon: {
      control: { disable: true },
      description: 'Icon displayed on the right side of the button',
    },
    children: {
      control: 'text',
      description: 'Content of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A customizable button component that supports different variants, colors, and sizes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base story with default props
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'primary',
    size: 'md',
  },
};

// Variant examples
export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    children: 'Filled Button',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    children: 'Outline Button',
  },
};

// Size examples
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    ...Default.args,
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: 'Large Button',
  },
};

// State examples
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    children: 'Disabled Button',
  },
};

// Icon examples
export const WithLeftIcon: Story = {
  args: {
    ...Default.args,
    leftIcon: () => <Icon name="log-in" />,
    children: 'Log in',
  },
};

export const WithRightIcon: Story = {
  args: {
    ...Default.args,
    rightIcon: () => <Icon name="log-in" />,
    children: 'Log in',
  },
};

export const WithBothIcons: Story = {
  args: {
    ...Default.args,
    leftIcon: () => <Icon name="log-in" />,
    rightIcon: () => <Icon name="log-in" />,
    children: 'Log in',
  },
};
