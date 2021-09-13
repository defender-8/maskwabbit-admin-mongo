import React from 'react';

import { Layout } from '../../base/components';

function Content({ children }) {
  return (
    <Layout.Content>
      <div className="container">
        {children}
      </div>
    </Layout.Content>
  );
}

export default Content;
