import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { productColumns } from 'data';
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

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/tours/${params.row._id}`} className='tour__link'>
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
        columns={productColumns.concat(actionColumn)}
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
