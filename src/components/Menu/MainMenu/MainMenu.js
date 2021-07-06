import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  TableOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectErrorMessage,
} from '../../../redux/auth/auth-selectors';

import Menu from '../Menu';
import MenuItem from '../MenuItem';
import SubMenu from '../SubMenu';

import './MainMenu.scss';

class MainMenu extends Component {
  rootSubmenuKeys = ['subUsers'];

  state = {
    openKeys: ['subUsers'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { match, currentUser } = this.props;

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/products']}
        selectedKeys={[match.path]}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        className="MainMenu"
      >
        <MenuItem key="/products" icon={<TableOutlined />}>
          <Link to="/products">
            Products
          </Link>
        </MenuItem>
        <MenuItem key="/product-categories" icon={<BarsOutlined />}>
          <Link to="/product-categories">
            Product Categories
          </Link>
        </MenuItem>
        <MenuItem key="/orders" icon={<ShoppingCartOutlined />}>
          <Link to="/orders">
            Orders
          </Link>
        </MenuItem>
        <SubMenu key="subUsers" icon={<UserOutlined />} title="Users">
          {
            (currentUser.role === 'super admin') ?
              <>
                <MenuItem key="/super-admins">
                  <Link to="/super-admins">
                    Super Admins
                  </Link>
                </MenuItem>
                <MenuItem key="/admins">
                  <Link to="/admins">
                    Admins
                  </Link>
                </MenuItem>
              </> : null
          }
          <MenuItem key="/clients">
            <Link to="/clients">
              Clients
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}

MainMenu.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  errorMessage: selectErrorMessage,
});

export default withRouter(connect(mapStateToProps)(MainMenu));
