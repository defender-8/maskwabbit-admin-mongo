import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../Button/Button';
import Input from '../../Form/Input/Input';

import './ActionsTopPanel.scss';

function ActionsTopPanel({ create, createPath, createText = 'Create', search, searchPlaceholder, onSearchChange, history }) {
  if (create || search) {
    return (
      <div className="ActionsTopPanel">
        <div className="ActionsTopPanel-search">
          {
            search ?
              <Input
                placeholder={searchPlaceholder}
                allowClear={true}
                onChange={onSearchChange}
              /> : null
          }
        </div>
        <div className="ActionsTopPanel-create">
          {
            create ?
              <Button
                type="primary"
                onClick={() => history.push(`/${createPath}/new`)}
              >
                {createText}
              </Button> : null
          }
        </div>
      </div>
    );
  }

  return null;
}

export default withRouter(ActionsTopPanel);
