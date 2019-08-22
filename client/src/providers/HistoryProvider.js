import React from 'react';
import axios from 'axios';
export const HistoryContext = React.createContext();
export const HistoryConsumer = HistoryContext.Consumer;

export class HistoryProvider extends React.Component {
  state = { 
    featuresFromHistory: [],
    categoriesFromHistory: [],
    featureIDsFromHistory: [],
    featuresLoaded: false,
    categoriesLoaded: false,
  }


  featuresLoaded = () => {
    this.setState({featuresLoaded: true})
  }

  categoriesLoaded = () => {
    this.setState({categoriesLoaded: true})
  }

  ///// this takes the estimate ID and gets the list of Feature IDs
  handleEstimate = (ID) => {
    // this.resetFeatureIDsFromHistory()
    const {featureIDsFromHistory} = this.state;
    axios.get(`/api/featureIDs_from_estimate/${ID}`)
      .then( res  => this.setState({featureIDsFromHistory: [...res.data]}))
  }


  /// this takes the list of Feature Ids and pulls out the features and the categories
  handleHistoryIDs = () => {
    const {featureIDsFromHistory, featuresFromHistory, categoriesFromHistory} = this.state;
    axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
      .then(res => this.setState({featuresFromHistory: [...res.data]}))

    axios.get(`/api/categories_by_feature_id/${featureIDsFromHistory}`)
      .then(res => this.setState({categoriesFromHistory: [...res.data]}))
  }

  dumpHistory = () => {
    this.setState({
      featuresFromHistory: [],
      categoriesFromHistory: [],
      featuresWArchive: [],
      catagoriesWArchive: [],
      featureIDsFromHistory: [],
      // featuresLoaded: false,
      // categoriesLoaded: false,
    })
  }

  resetFeaturesFromHistory = () => {
    this.setState({featuresFromHistory: []})
  }

  resetCategoriesFromHistory = () => {
    this.setState({categoriesFromHistory: []})
  }

  resetFeatureIDsFromHistory = () => {
    this.setState({featureIDsFromHistory: []})
  }

  render() {
      
    return (
      <HistoryContext.Provider value={{
      ...this.state,
      dumpHistory: this.dumpHistory,
      handleEstimate: this.handleEstimate,
      handleHistoryIDs: this.handleHistoryIDs,
      featuresLoaded: this.featuresLoaded,
      categoriesLoaded: this.categoriesLoaded,
      handleHistoryCategories: this.handleHistoryCategories,
      resetFeaturesFromHistory: this.resetFeaturesFromHistory,
      resetCategoriesFromHistory: this.resetCategoriesFromHistory,
      resetFeatureIDsFromHistory: this.resetFeatureIDsFromHistory,
      }}>
      {this.props.children}
    </HistoryContext.Provider>
    );
  };
};