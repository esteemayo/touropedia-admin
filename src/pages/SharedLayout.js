import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';

import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <>
      <Topbar />
      <ToastContainer style={{ fontSize: '1.4rem' }} />
      <Container>
        {user && <Sidebar />}
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export default SharedLayout;
