import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, AsyncStorage, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';
import { colors } from 'styles';
import Header from 'components/header';

import styles from './styles';

export default class Repositorys extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colors.white },
    header: () => (
      <Header />
    ),
  }

  render() {
    return (
      <View />
    );
  }
}
