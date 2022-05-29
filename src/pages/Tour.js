import styled from 'styled-components';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import { useEffect, useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { excerpt } from 'utils';
import { phone } from 'responsive';
import { fetchTour, updTour } from 'features/tour/tourSlice';

const initialState = {
  id: null,
  title: '',
  description: '',
  tags: [],
};

const Tour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tour, error } = useSelector((state) => ({ ...state.tour }));

  const [tourData, setTourData] = useState(initialState);

  const { title, description, tags } = tourData;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (tag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((item) => item !== tag),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      dispatch(
        updTour({ tourId: tourData.id, tour: tourData, navigate, toast })
      );
    }
  };

  useEffect(() => {
    id && id !== null && dispatch(fetchTour(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTourData({
      id: tour._id,
      title: tour.title,
      description: tour.description,
      tags: tour.tags,
    });
  }, [tour]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <TitleContainer>
        <Title>Tour</Title>
        <Link to='/tours/new-tour' className='tour__link'>
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Top>
        <TopRight>
          <InfoTop>
            <Image src={tour?.image} alt={tour?.title} />
            <TourTitle>{tour?.title}</TourTitle>
          </InfoTop>
          <InfoBottom>
            <InfoItem>
              <InfoKey>id: </InfoKey>
              <InfoValue>{tour?._id}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoKey>created by: </InfoKey>
              <InfoValue>{tour?.name}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoKey>description: </InfoKey>
              <InfoValue>{excerpt(tour?.description, 40)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoKey>tags: </InfoKey>
              <InfoValue>{tour?.tags?.map((tag) => `#${tag} `)}</InfoValue>
            </InfoItem>
          </InfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <Form onSubmit={handleSubmit}>
          <FormLeft>
            <FormGroup>
              <Input
                type='text'
                name='title'
                placeholder='Title'
                value={title || ''}
                onChange={handleChange}
              />
              <Label>Title</Label>
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='description'
                placeholder='Description'
                value={description || ''}
                onChange={handleChange}
              />
              <Label>Description</Label>
            </FormGroup>
            <FormGroup>
              <ChipInput
                name='tags'
                variant='outlined'
                placeholder='Tag'
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                style={{ width: '50%' }}
              />
            </FormGroup>
            <FormGroup>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, image: base64 })
                }
              />
            </FormGroup>
            <FormGroup>
              <Button>Update</Button>
            </FormGroup>
          </FormLeft>
          <FormRight>
            <Img src={tour.image} />
          </FormRight>
        </Form>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const AddButton = styled.button`
  border: none;
  display: block;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: #008080;
  color: var(--color-white);
  border-radius: 0.5rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(3px);
  }

  &:focus {
    outline: none;
  }
`;

const Top = styled.div`
  display: flex;

  ${phone({ flexDirection: 'column' })}
`;

const TopRight = styled.div`
  flex: 1;
  padding: 2rem;
  margin: 2rem;
  font-size: 1.5rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const TourTitle = styled.span`
  text-transform: capitalize;
  fon-weight: 600;
  margin-left: 2rem;
`;

const InfoBottom = styled.div`
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  width: 50rem;
  display: flex;
  // justify-content: space-between;
`;

const InfoKey = styled.span``;

const InfoValue = styled.span`
  font-weight: 300;
`;

const Bottom = styled.div`
  padding: 2rem;
  margin: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const FormLeft = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  color: gray;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

const Input = styled.input`
  border: none;
  display: block;
  padding: 1rem 2rem;
  width: 50%;
  color: #999;
  border-bottom: 3px solid #bbb;
  caret-color: #00008b;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    text-transform: capitalize;
    font-size: 1.2rem;
    color: #bbb;
  }

  &:placeholder-shown + ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const FormRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const Button = styled.button`
  border: none;
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  width: 30rem;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 0.5rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.8;
    transform: translateX(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default Tour;
