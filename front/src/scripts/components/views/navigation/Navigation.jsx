import React, { Component } from 'react';

import NavigationLinks from '../../../constants/NavigationLinks';

import {
  List, ListItem
} from 'ui';

import style from './navigation.scss';

export default class Navigation extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  _routeHandler(where) {
    this.context.router.push(where);
  }

  _renderLinks() {
    return NavigationLinks.map((link, index) => {
      return (
        <ListItem
          className={ style['item'] }
          key={ index }
          caption={ link.label }
          onClick={ this._routeHandler.bind(this, link.path) }
        />
      );
    });
  }

  render() {
    return (
      <div>
        <List className={ style['navigation'] }>
          { this._renderLinks() }
        </List>
      </div>
    );
  }
}

Navigation.contextTypes = {
  router: React.PropTypes.object
};
