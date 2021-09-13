import React, { useState, useRef, useCallback } from 'react';

import Input from '../Input';
import PassCodeItems from './components/PassCodeItems';

import './index.less';

function PassCode({onChange, value}) {
  const [focused, setFocused] = useState();
  const input = useRef();

  const onFocus = useCallback(function () {
    input.current.focus();
    setFocused(true);
  }, []);

  return (
    <div className="PassCode">
      <Input
        ref={input}
        maxLength={6}
        onChange={onChange}
        onBlur={function () {
          setFocused(false);
        }}
        value={value}
      />
      <PassCodeItems value={value} onFocus={onFocus} focused={focused} />
    </div>
  );
}

export default PassCode;
