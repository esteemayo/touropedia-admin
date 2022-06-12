import styled from 'styled-components';

const userData = [
  {
    name: 'Jan',
    'Active User': 4000,
  },
  {
    name: 'Feb',
    'Active User': 3000,
  },
  {
    name: 'Mar',
    'Active User': 5000,
  },
  {
    name: 'Apr',
    'Active User': 4000,
  },
  {
    name: 'May',
    'Active User': 3000,
  },
  {
    name: 'Jun',
    'Active User': 2000,
  },
  {
    name: 'Jul',
    'Active User': 4000,
  },
  {
    name: 'Aug',
    'Active User': 3000,
  },
  {
    name: 'Sep',
    'Active User': 4000,
  },
  {
    name: 'Oct',
    'Active User': 1000,
  },
  {
    name: 'Nov',
    'Active User': 4000,
  },
  {
    name: 'Dec',
    'Active User': 3000,
  },
];

const productData = [
  {
    name: 'Jan',
    Sales: 4000,
  },
  {
    name: 'Feb',
    Sales: 3000,
  },
  {
    name: 'Mar',
    Sales: 5000,
  },
];

const userRows = [
  {
    id: 1,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 2,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 3,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 4,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 5,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 6,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 7,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 8,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 9,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
  {
    id: 10,
    username: 'Jon Snow',
    avatar:
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'jon@gmail.com',
    status: 'active',
    transaction: '$120.00',
  },
];

const userColumns = [
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
];

const productRows = [
  {
    id: 1,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 2,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 3,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 4,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 5,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 6,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 7,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 8,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 9,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
  {
    id: 10,
    name: 'Apple airpods',
    img: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    stock: 123,
    status: 'active',
    price: '$120.00',
  },
];

const productColumns = [
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
            src={params.row.creator.avatar || 'assets/images/user-default.jpg'}
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
];

const commentColumns = [
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
];

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

const Wrapper = styled.div``;

const TourListTitle = styled.div`
  display: flex;
  align-items: center;
`;

const TourListUser = styled.div`
  display: flex;
  align-items: center;
`;

const CommentListUser = styled.div`
  display: flex;
  align-items: center;
`;

export {
  commentColumns,
  userColumns,
  userData,
  productData,
  userRows,
  productRows,
  productColumns,
};
