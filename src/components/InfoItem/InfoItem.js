import React from 'react';
import classNames from 'classnames';

function InfoItem({ title, content, inline }) {
  return (
    <div className="mb-1">
      <div className={classNames('fw-700 mr-05', { 'd-inline-block': inline })}>
        {title}
      </div>
      <div className={classNames({ 'd-inline-block': inline })}>
        {content}
      </div>
    </div>
  );
}

export default InfoItem;
