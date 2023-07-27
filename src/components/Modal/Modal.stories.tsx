import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './';
import Button from '../Button';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div className="flex w-full min-h-screen justify-center items-center">
      <Modal>
        <Modal.Trigger>
          <Button>Click Here</Button>
        </Modal.Trigger>
        <Modal.Content>
          Congratulations, you just won 300000 robux
        </Modal.Content>
      </Modal>
    </div>
  ),
};
