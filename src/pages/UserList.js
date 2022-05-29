import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, removeUser } from 'features/user/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(removeUser({ userId: id, toast }));
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
      field: 'user',
      headerName: 'User',
      width: 230,
      renderCell: (params) => {
        return (
          <UserListUser>
            <Image src={params.row.avatar || 'assets/images/user-default.jpg'} />
            {params.row.name}
          </UserListUser>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'active',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        return <Wrapper>{params.row.active === true && 'Active'}</Wrapper>;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/users/${params.row._id}`}
              state={params.row}
              className='user__link'
            >
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row._id)}
              style={{
                fontSize: '2rem',
                color: '#ff0000',
                cursor: 'pointer',
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        style={{ fontSize: '1.5rem' }}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const EditButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: #3bb077;
  color: var(--color-white);
  border-radius: 10rem;
  cursor: pointer;
  margin-right: 1rem;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(-3px);
  }

  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div``;

export default UserList;
