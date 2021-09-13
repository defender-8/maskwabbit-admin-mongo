import React from 'react';
import classNames from 'classnames';

function PassCodeItems({ value, onFocus, focused }) {
  const items = [];

  for (let i = 0, l = 6; i < l; i++) {
    items.push({
      v: value && value.length >= i + 1 ? value[i] : '',
      focused: focused ? value ? value.length === i : i === 0 : false,
    });
  }

  return (
    <div
      className="PassCodeItems"
      onClick={onFocus}
    >
      {items.map(({ v, focused }) => (
        <div className={classNames('PassCode-item', { focused })}>
          <div className="pos-center">
            {v}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PassCodeItems;
