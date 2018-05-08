import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default class Card extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }).isRequired,
    repository: PropTypes.shape({
      avatarUrl: PropTypes.string,
      fullName: PropTypes.string,
      organization: PropTypes.string,
    }).isRequired,
  }

  goToIssue= (data) => {
    this.props.navigation.navigate('Issues', { title: data.name, repository: data.fullName });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.goToIssue(this.props.repository)}
      >
        <Image style={styles.avatar} source={{ url: this.props.repository.avatarUrl }} />
        <View style={styles.containerText}>
          <Text style={styles.title}>Este é o FullName!</Text>
          <Text style={styles.description}>{this.props.repository.organization}</Text>
        </View>
        <Icon name="chevron-right" style={styles.iconRight} />
      </TouchableOpacity>
    );
  }
}
