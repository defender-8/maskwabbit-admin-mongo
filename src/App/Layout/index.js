import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import { Layout as AntLayout } from '../../base/components';
import Header from './Header';
import Sider from './Sider';
import Content from './Content';

import './index.less';

function Layout({ title, children, containerPdTop }) {
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = useCallback(() => {
    setSiderCollapsed(prevState => !prevState);
  }, [setSiderCollapsed]);

  return (
    <AntLayout className={classNames({ 'container-pt': containerPdTop })}>
      <Sider collapsed={siderCollapsed} />
      <AntLayout>
        <Header
          siderCollapsed={siderCollapsed}
          toggleSider={toggleSider}
          title={title}
        />
        <Content children={children} />
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;
