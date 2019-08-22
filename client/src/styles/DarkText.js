import styled from 'styled-components';


const fontSize = (size) => {
    switch(size) {
      case 'large':
        return '40px';
      case 'medium':
        return '30px';
      case 'small':
        return '25px';
      case 'tiny':
        return '14px';
      case 'ndv':
        return '1em';
      default:
        return '20px';
    }
  };
   
export default styled.h1`
    color: rgb(72, 70, 74) !important;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: ${props => fontSize(props.fSize)} !important;
    
    /* Ternary - great for two options */
    /* font-size: ${props => props.large ? '4rem' : '2rem'} !important; */
  `;