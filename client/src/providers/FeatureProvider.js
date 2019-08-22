import React from 'react';
import axios from 'axios';
export const FeatureContext = React.createContext();
export const FeatureConsumer = FeatureContext.Consumer;


export class FeatureProvider extends React.Component {
  state = { 
    // allFeatures: [],
    // allCategories: [],
    featureIDsFromEstimate: [],
    featuresFromEstimate: [],
    categoriesFromEstimate: [],
    iosCategories: [],
    webCategories: [],
    androidCategories: [],
    iosFeatures: [],
    webFeatures: [],
    androidFeatures: [],
    selectedEstimate: [],
    // platformFeatures: [],
    // platformCategories: [],
    androidLoaded: false,
    iosLoaded: false,
    webLoaded: false,
    estimateLoaded: false,
    tempCategoryId: [],
    };


  setAndroidLoaded = () => {
    this.setState({androidLoaded: true})
  }

  setIosLoaded = () => {
    this.setState({iosLoaded: true})
  }

  setWebLoaded = () => {
    this.setState({webLoaded: true})
  }

  setEstimateLoaded = () => {
    this.setState({estimateLoaded: true})
  }

  handleAndroidCategories = (categories) => {
    this.setState({androidCategories: [...categories]})
    this.setAndroidLoaded()
  }

  handleAndroidFeatures = (features) => {
    this.setState({androidFeatures: [...features]})
  }

  handleIosCategories = (categories) => {
    this.setState({iosCategories: [...categories]})
    this.setIosLoaded()
  }

  handleIosFeatures = (features) => {
    this.setState({iosFeatures: [...features]})
  }

  handleWebCategories = (categories) => {
    this.setState({webCategories: [...categories]})
    this.setWebLoaded()
  }

  handleWebFeatures = (features) => {
    this.setState({webFeatures: [...features]})
  }


  handleResetIDs = () => {
    this.setState({featureIDsFromEstimate: [], featuresFromEstimate: [], categoriesFromEstimate: []})
  }

  
  ResetEstimate = () => {
    this.setState({fullEstimates: []})
  }

  handleSelectedIDs = () => {
    const {featureIDsFromEstimate, featuresFromEstimate, categoriesFromEstimate} = this.state;
    axios.get(`/api/features_by_id/${featureIDsFromEstimate}`)
      .then(res => this.setState({featuresFromEstimate: [...res.data]}))

    axios.get(`/api/categories_by_feature_id/${featureIDsFromEstimate}`)
      .then(res => this.setState({categoriesFromEstimate: [...res.data]}))
  }

  render() {
  
    return (
      <FeatureContext.Provider value={{
      ...this.state,
      // handleFeatures: this.handleFeatures,
      // handleCategories: this.handleCategories,
      handleSelectedIDs: this.handleSelectedIDs,
      // toPlatformItems: this.toPlatformItems,
      // handleCatIDs: this.handleCatIDs,
      //  handleEstimate: this.handleEstimate,
      handleResetIDs: this.handleResetIDs,
      // handleHistoryClick: this.handleHistoryClick,
      // handleEstimates: this.handleEstimates,
      ResetEstimate: this.ResetEstimate,
      // setFeaturesLoaded: this.setFeaturesLoaded,
      setEstimateLoaded: this.setEstimateLoaded,
      setWebLoaded: this.setWebLoaded,
      setIosLoaded: this.setIosLoaded,
      setAndroidLoaded: this.setAndroidLoaded,
      handleAndroidFeatures: this.handleAndroidFeatures,
      handleAndroidCategories: this.handleAndroidCategories,
      handleIosFeatures: this.handleIosFeatures,
      handleIosCategories: this.handleIosCategories,
      handleWebFeatures: this.handleWebFeatures,
      handleWebCategories: this.handleWebCategories,
      // buildCategories: this.buildCategories,
      }}>
        {this.props.children}
      </FeatureContext.Provider>
    );
  };
};