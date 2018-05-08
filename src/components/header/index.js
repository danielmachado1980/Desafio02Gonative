import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Header extends Component {
  static propTypes = {
    addRepository: PropTypes.shape().isRequired,
  }

  state = {
    name: '',
  }

  handleNameChanged = () => {
    this.props.addRepository(this.state.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar repositório"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity onPress={this.handleNameChanged}>
            <Icon style={styles.button} name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
