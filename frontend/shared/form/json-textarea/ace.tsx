import React, { ReactElement, memo, FC } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';

interface AceProps {
  onChange?: (value: string) => void;
  value: string;
}

export const Ace: FC<AceProps> = memo(
  ({ onChange, value }): ReactElement => {
    return (
      <AceEditor
        value={value}
        mode="json"
        theme="monokai"
        onChange={onChange}
        name="unique-id-ace"
        editorProps={{ $blockScrolling: true }}
        height="150px"
        width="321px"
      />
    );
  },
);
