import styled from 'styled-components';

const fontSize = (size) => {
    switch(size) {
      case 'large':
        return '40px';
      case 'medium':
        return '30px';
      case 'small':
        return '17px';
      case 'tiny':
        return '14px';
      default:
        return '20px';
    }
  };
   
export default styled.h1`
    color:white !important;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: ${props => fontSize(props.fSize)} !important;
    /* Ternary - great for two options */
    /* font-size: ${props => props.large ? '4rem' : '2rem'} !important; */
  `;