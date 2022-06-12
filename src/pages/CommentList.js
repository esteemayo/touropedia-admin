import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { commentColumns } from 'data';
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

  const actionColumn = [
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
        columns={commentColumns.concat(actionColumn)}
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

export default CommentList;
