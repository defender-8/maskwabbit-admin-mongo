import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Layout as AntLayout } from 'antd';

import Header from './Header';
import Sider from './Sider';

import './Layout.scss';

class Layout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { title, children, containerPdTop } = this.props;

    return (
      <AntLayout className={classNames({ 'container-pt': containerPdTop })}>
        <Sider collapsed={this.state.collapsed} />
        <Header
          collapsed={this.state.collapsed}
          toggle={this.toggle}
          title={title}
          children={children}
          className="site-layout"
        />
      </AntLayout>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
