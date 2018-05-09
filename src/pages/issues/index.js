import React, { Component } from 'react';
import { Alert, ActivityIndicator, AsyncStorage, FlatList, View, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';
import { colors } from 'styles';
import Header from 'components/header';
import Card from 'components/card';
import Menu from 'components/menu';
import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: colors.white },
    title: `${navigation.state.params.title}`,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          repository: PropTypes.string,
        }).isRequired,
      }).isRequired,
      goBack: PropTypes.shape().isRequired,
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
    this.setState({ repositoryName: this.props.navigation.state.params.repository });
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
    if (!response.ok) {
      this.setState({ loading: false });
      Alert.alert('Ops!', 'Algo deu errado.');
      return;
    }
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
    } catch (error) {
      this.setState({ error: true, loading: false });
      // alert('Não foi possível completar o carregamento.');
    }
  }

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
      keyExtractor={issues => issues.id}
      renderItem={({ item }) => <Card issue={item} />}
    />
  );

  render() {
    return (
      <View sytle={styles.container}>
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
