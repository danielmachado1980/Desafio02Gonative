import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default class Card extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      avatarUrl: PropTypes.string,
      title: PropTypes.string,
      organization: PropTypes.string,
    }).isRequired,
  }

  goToUrl = (data) => {
    Linking.openURL(data.linkUrl);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => { this.goToUrl(this.props.repository); }}
      >
        <View style={styles.container}>
          <Image style={styles.avatar} source={{ uri: this.props.repository.avatarUrl }} />
          <View style={styles.infoContent}>
            <Text style={styles.title} numberOfLines={1}>{this.props.repository.title}</Text>
            <Text style={styles.description}>{this.props.repository.organization}</Text>
          </View>
          <Icon name="chevron-right" />
        </View>
      </TouchableOpacity>
    );
  }
}
