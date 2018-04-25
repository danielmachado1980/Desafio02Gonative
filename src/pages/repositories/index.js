import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';
import { colors } from 'styles';
import Header from 'components/header';
import Card from 'components/card';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colors.white },
    header: () => (
      <Header />
    ),
  }

  state = {
    repositories: [],
    loading: false,
    refreshing: false,
    error: false,
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
      <Text style={styles.textEmpty}>Nenhum repositório</Text>
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
