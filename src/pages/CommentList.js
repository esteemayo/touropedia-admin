import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchComments, removeComment } from 'features/comment/commentSlice';

const CommentList = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => ({ ...state.comment }));

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(removeComment({ commentId: id, toast }));
    }
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'body', headerName: 'Comment Body', width: 300 },
    {
      field: 'user',
      headerName: 'User',
      width: 230,
      renderCell: (params) => {
        return (
          <CommentListUser>
            <Image
              src={params.row.user.avatar || 'assets/images/user-default.jpg'}
            />
            {params.row.user.name}
          </CommentListUser>
        );
      },
    },
    {
      field: 'tour',
      headerName: 'Tour',
      width: 230,
      renderCell: (params) => {
        return (
          <TourListTitle>
            <Image src={params.row.tour.image} />
            {params.row.tour.title}
          </TourListTitle>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <DeleteOutline
            onClick={() => handleDelete(params.row._id)}
            style={{
              fontSize: '2rem',
              color: '#ff0000',
              cursor: 'pointer',
            }}
          />
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={comments}
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

const CommentListUser = styled.div`
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

export default CommentList;
