import * as React from 'react';
// @ts-ignore
import Button from '../src/components/Button/index';

export default { title: 'Button' };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
    </Button>
);