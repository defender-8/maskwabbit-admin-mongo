import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Button, Input } from '../../../base/components';

import './index.less';

function ArrayHeader({ create = true, searchPlaceholder, onSearchChange, searchName }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <div className="ArrHeader">
      <div className="ArrHeader-search">
          <Input
            placeholder={searchPlaceholder}
            allowClear={true}
            onChange={onSearchChange}
            name={searchName}
          />
      </div>
      <div className="ArrHeader-create">
        {
          create ?
            <Button
              type="primary"
              onClick={() => history.push(url + '/new')}
            >
              Create
            </Button> : null
        }
      </div>
    </div>
  );
}

export default ArrayHeader;
