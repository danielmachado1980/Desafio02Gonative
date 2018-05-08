import React, { Component } from 'react';
import { Alert, View, AsyncStorage, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';
import { colors } from 'styles';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Card from 'components/card';
import styles from './styles';

import api from 'services/api';

export default class Repositories extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerStyle: { backgroundColor: colors.white },
      header: <Header addRepository={params.addRepository} />,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func,
      addRepository: PropTypes.func,
    }).isRequired,
  }

  state = {
    repositories: [],
    loading: false,
    refreshing: false,
    error: false,
    tst: 'Nenhum repositório',
  }

  componentWillMount() {
    this.props.navigation.setParams({ addRepository: this.addRepository });
  }

  addRepository = (name) => {
    if (name.length === 0) {
      Alert.alert('Ops!', 'Preencha o campo.');
      return;
    }
    this.setState({ loading: true });
    this.findRepoAndSave(name);
  };

  findRepoAndSave = async (repoName) => {
    const response = await api.get(`/repos/${repoName}`);
    if (!response.ok) {
      this.setState({ loading: false });
      Alert.alert('Ops!', 'Não foi encontrado!');
      return;
    }
    if (this.state.repositories.find(e => e.id === response.data.id)) {
      Alert.alert('Ei!', 'Esse Repositório já foi adicionado.');
      this.setState({ loading: false });
      return;
    }
    const {
      id,
      name,
      full_name: fullName,
      organization: { login: organization },
      owner: { avatar_url: avatarUrl },
    } = response.data;

    const newRepo = {
      id,
      name,
      fullName,
      organization,
      avatarUrl,
    };

    await AsyncStorage.setItem('@Desafio02:repositories', JSON.stringify([newRepo, ...this.state.repositories]));
    this.loadRepositories();
    this.setState({ loading: false });
  }

  loadRepositories = async () => {
    const repositories = await AsyncStorage.getItem('@Desafio02Go:repositories')
      .then(response => (response ? JSON.parse(response) : []));
    this.setState({
      repositories,
      refreshing: false,
      error: false,
    });
  }

  verifyRepo = () => (
    this.state.repositories.length
      ? this.renderRepositories()
      : this.renderError()
  )

  renderError = () => (
    <View style={styles.containerEmpty}>
      <Text style={styles.textEmpty}>{this.state.tst}</Text>
    </View>
  )

  renderRepositories = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadRepositories}
        />
      }
      data={this.state.repositories}
      keyExtractor={repositories => repositories.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <Card repository={item} />}
    />
  )

  render() {
    return (
      <View style={styles.container} >
        { this.state.loading
          ? <ActivityIndicator size="small" color={colors.black} style={styles.loading} />
          : this.verifyRepo()}
      </View>
    );
  }
}
