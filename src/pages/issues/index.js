import React, { Component } from 'react';
import { Alert, ActivityIndicator, AsyncStorage, FlatList, View, RefreshControl, YellowBox } from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';
import { colors } from 'styles';
import Menu from 'components/menu';
import Card from './components/card';
import styles from './styles';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: colors.white },
    title: `${navigation.state.params.title}`,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          subtitle: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    issues: [],
    repositoryName: '',
    status: 'all',
    loading: false,
    error: false,
  }

  componentWillMount() {
    this.setState({ repositoryName: this.props.navigation.state.params.subtitle });
  }

  componentDidMount() {
    this.loadFilter();
    this.findIssues(this.state.repositoryName, this.state.status);
  }

  setStatusState = (status) => {
    this.setState({ status });
  }

  findIssues = async (repository, status) => {
    this.setState({ loading: true });
    const response = await api.get(`repos/${repository}/issues?state=${status}`);

    console.tron.log(response);

    this.setState({ issues: response.data, loading: false });
  }

  loadFilter = async () => {
    const status = await AsyncStorage.getItem('@Desafio02Go:status');
    if (status) { this.setState({ status }); }
  }

  loadIssues = async () => {
    this.setState({ loading: true });
    try {
      this.loadFilter();
      this.findIssues(this.state.repositoryName, this.state.status);
      console.tron.log(`Verificando status... ${this.state.status}`);
    } catch (error) {
      this.setState({ error: true, loading: false });
      Alert.alert('Ops!', 'Algo deu errado.');
    }
  }

  renderItem = ({ item }) => {
    const {
      id,
      title,
      user: { login: organization, avatar_url: avatarUrl },
      html_url: linkUrl,
    } = item;

    const issue = {
      id,
      title,
      organization,
      avatarUrl,
      linkUrl,
    };
    return <Card repository={issue} navigation={this.props.navigation} />;
  };

  renderIssues = () => (
    <FlatList
      style={styles.flatContainer}
      refreshControl={
        <RefreshControl
          refreshing={this.state.loading}
          onRefresh={this.loadIssues}
        />
      }
      showsVerticalScrollIndicator={false}
      data={this.state.issues}
      keyExtractor={issue => String(issue.id)}
      renderItem={this.renderItem}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Menu
          status={this.state.status}
          setStatusState={this.setStatusState}
          loadIssues={this.loadIssues}
        />
        {
          this.state.loading
          ? <ActivityIndicator size="small" color={colors.black} style={styles.loading} />
          : this.renderIssues()}
      </View>
    );
  }
}
