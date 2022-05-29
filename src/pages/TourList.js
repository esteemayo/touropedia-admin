import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTours, removeTour } from 'features/tour/tourSlice';

const TourList = () => {
  const dispatch = useDispatch();
  const { tours, error } = useSelector((state) => ({ ...state.tour }));

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      dispatch(removeTour({ tourId: id, toast }));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => {
        return (
          <TourListTitle>
            <Image src={params.row.image} />
            {params.row.title}
          </TourListTitle>
        );
      },
    },
    {
      field: 'creator',
      headerName: 'Creator',
      width: 230,
      renderCell: (params) => {
        return (
          <TourListUser>
            <Image
              src={
                params.row.creator.avatar || 'assets/images/user-default.jpg'
              }
            />
            {params.row.name}
          </TourListUser>
        );
      },
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 230,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/tours/${params.row.id}`} className='tour__link'>
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
        rows={tours}
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
  padding: 2rem;
`;

const TourListTitle = styled.div`
  display: flex;
  align-items: center;
`;

const TourListUser = styled.div`
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
    transform: translateX(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default TourList;
