import React, {useContext, useEffect} from "react";
import {MathContext} from '../providers/MathProvider';
import {Header,} from 'semantic-ui-react';
import WhiteText from '../styles/WhiteText'

const OSMath = (props) => {
  const {webPrice, iOSPrice, androidPrice, renderPrices, handleSetOsPrice} = useContext(MathContext);

  useEffect( () => {
    handleSetOsPrice(props.OS)
  },[renderPrices])

  const renderPriceDisplay = () => {
    switch (props.OS){
      case 'web': return webPrice
      case 'ios': return iOSPrice
      case 'android': return androidPrice
      default :
    }
  };

  return(
    <>
      <Header align="center" as={WhiteText} > Days: {renderPriceDisplay()}</Header>
    </>
  );
};


export default OSMath;