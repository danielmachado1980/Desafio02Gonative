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
    this.props.navigation.navigate('Issues', { title: data.name, subtitle: data.fullName });
  }

  render() {
    console.tron.log(this.props.repository.avatarUrl);
    return (
      <TouchableOpacity
        onPress={() => this.goToIssue(this.props.repository)}
      >
        <View style={styles.containerText}>
          <Image style={styles.avatar} source={{ uri: this.props.repository.avatarUrl }} />
          <Text style={styles.title}>{this.props.repository.fullName}</Text>
          <Text style={styles.description}>{this.props.repository.organization}</Text>
          <Icon name="chevron-right" />
        </View>
      </TouchableOpacity>
    );
  }
}
