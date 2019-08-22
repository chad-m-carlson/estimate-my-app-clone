import styled from 'styled-components';


const fontSize = (size) => {
    switch(size) {
      case 'large':
        return '45px';
      case 'medium':
        return '30px';
      case 'small':
        return '25px';
      case 'tiny':
        return '17px';
      case 'micro':
        return '1em';
      default:
        return '20px';
    }
  };

const colorChoice = (color) => {
  switch(color) {
    case 'light-grey':
      return 'rgb(141, 138, 145)';
    case 'dark-grey':
      return 'rgb(72, 70, 74)';
    default:
      return 'rgb(72, 70, 74)';
  }
};

const paddedChoice = (padding) => {
  switch(padding) {
    case 'tiny':
      return '5px';
    case 'small':
      return '10px';
    case 'medium':
      return '15px';
    case 'large':
      return '20px';
    default:
      return '0px';
  }
};

export default styled.h1`
    color: ${props => colorChoice(props.colored)} !important;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: ${props => fontSize(props.fSize)} !important;
    padding: ${props => paddedChoice(props.padding)} !important;
    
    /* Ternary - great for two options */
    /* font-size: ${props => props.large ? '4rem' : '2rem'} !important; */
  `;