import React from 'react';
export const MathContext = React.createContext();
export const MathConsumer = MathContext.Consumer;

export class MathProvider extends React.Component {
  state = { 
    webDays: [], 
    exclusiveWebDays: [],
    iOSDays: [], 
    exclusiveiOSDays: [],
    androidDays: [], 
    exclusiveAndroidDays: [],
    iOSPrice: 0, 
    webPrice: 0, 
    androidPrice: 0,
    coreDevTime: 0,
    nonDevTotal: 0,
    total: 0, 
    generalBufferValue: 0, 
    renderPrices: true, 
  };  

  resetMath = () => {
    this.setState({webDays: [], iOSDays: [], androidDays: [], iOSPrice: 0, webPrice: 0, androidPrice: 0, exclusiveAndroidDays: [], exclusiveWebDays: [], exclusiveiOSDays: []});
  };

  handleSetOsPrice = (os) => {
    const {webDays, androidDays, iOSDays, exclusiveWebDays, exclusiveiOSDays, exclusiveAndroidDays} = this.state;
    /////////////////////////////////////////////////CHANGE THIS TO  (cur.base_days * cur.multiplier) TO SWAP TO DOLLARS
    const reducerFunction = (os) => os.reduce( (acc, cur, ) => acc + (cur.base_days), 0);
    if (os === 'web'){
      this.setState({webPrice: reducerFunction(webDays) + reducerFunction(exclusiveWebDays)});
    } else if(os === 'android'){
      this.setState({androidPrice: reducerFunction(androidDays) + reducerFunction(exclusiveAndroidDays)});
    } else if(os === 'ios'){
      this.setState({iOSPrice: reducerFunction(iOSDays) + reducerFunction(exclusiveiOSDays)});
    };
  };

  handleSetDays = (os, feature, exclusive) => {
    const {webDays, iOSDays, androidDays, renderPrices } = this.state;
    if (exclusive) this.handleExclusiveDaysByCategory(os, feature)
    else {
      switch(os){
        case 'web':
          if (webDays.map( d => d.id).includes(feature.id) === false) {
            this.setState({webDays: [...webDays, feature]});
          }else 
            this.setState({webDays: webDays.filter( d => d.id !== feature.id)})
          break;
        case 'ios':
          if (iOSDays.map( d => d.id).includes(feature.id) === false) {
            this.setState({iOSDays: [...iOSDays, feature]});
          }else 
            this.setState({iOSDays: iOSDays.filter( d => d.id !== feature.id)})
          break;
        case 'android':
          if (androidDays.map( d => d.id).includes(feature.id) === false) {
            this.setState({androidDays: [...androidDays, feature]});
          }else 
            this.setState({androidDays: androidDays.filter( d => d.id !== feature.id)});
        };
      };
    this.setState({renderPrices: !renderPrices});
  };

  handleExclusiveDaysByCategory = (os, feature) => {
    const {exclusiveWebDays, exclusiveiOSDays, exclusiveAndroidDays, renderPrices} = this.state;
    switch(os){
      case 'web':
        if (exclusiveWebDays.map( wd => wd.category_id).includes(feature.category_id) === false) {
          this.setState({exclusiveWebDays: [...exclusiveWebDays, feature]});
        }else 
          this.setState({exclusiveWebDays: [...exclusiveWebDays.filter( d => d.category_id !== feature.category_id), feature]})
        break;
      case 'ios':
        if (exclusiveiOSDays.map( id => id.category_id).includes(feature.category_id) === false) {
          this.setState({exclusiveiOSDays: [...exclusiveiOSDays, feature]});
        }else 
          this.setState({exclusiveiOSDays: [...exclusiveiOSDays.filter( d => d.category_id !== feature.category_id), feature]})
        break;
      case 'android':
        if (exclusiveAndroidDays.map( ad => ad.category_id).includes(feature.category_id) === false) {
          this.setState({exclusiveAndroidDays: [...exclusiveAndroidDays, feature]});
        }else 
          this.setState({exclusiveAndroidDays: [...exclusiveAndroidDays.filter( d => d.category_id !== feature.category_id), feature]});
      }
    this.setState({renderPrices: !renderPrices});
  };

  handleExclusiveDaysByFeature = (os, feature) => {
    const {exclusiveWebDays, exclusiveiOSDays, exclusiveAndroidDays, renderPrices} = this.state;
    switch(os){
      case 'web':
          this.setState({exclusiveWebDays: [...exclusiveWebDays.filter( wd => wd.id !== feature),]})
        break;
      case 'ios':
          this.setState({exclusiveiOSDays: [...exclusiveiOSDays.filter( id => id.id !== feature),]})
         break;
      case 'android':
          this.setState({exclusiveAndroidDays: [...exclusiveAndroidDays.filter( ad => ad.id !== feature),]});
      };
    this.setState({renderPrices: !renderPrices});
  }

  setNonDevTotal = (nonDevTotal) => {
    this.setState({nonDevTotal: nonDevTotal})
  };

  setTotal = (total) => {
    this.setState({total: total})
  }

  setGeneralBufferValue = (total) => {
    this.setState({generalBufferValue: total})
  }

  
  render() {
    
    return (
      <MathContext.Provider value={{
       ...this.state,
       handleSetOsPrice: this.handleSetOsPrice,
       handleSetDays: this.handleSetDays,
       handleExclusiveDaysByFeature: this.handleExclusiveDaysByFeature,
       resetMath: this.resetMath,
       setNonDevTotal: this.setNonDevTotal,
       setTotal: this.setTotal,
       setGeneralBufferValue: this.setGeneralBufferValue,
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

 