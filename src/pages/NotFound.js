import styled from 'styled-components';

const NotFound = () => {
  return (
    <Wrapper>
      <Image src='assets/images/404.jpg' alt='Not Found' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

const Image = styled.img``;

export default NotFound;
