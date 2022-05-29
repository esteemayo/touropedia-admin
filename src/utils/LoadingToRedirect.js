import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, [1000]);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Wrapper>
      <Heading>Redirecting you in {count} seconds</Heading>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 4;
`;

const Heading = styled.h5`
  font-size: 4rem;
  text-align: center;
`;

export default LoadingToRedirect;
