import styled from 'styled-components';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import { useEffect, useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { tourInputs } from 'formData';
import { createNewTour } from 'features/tour/tourSlice';

const initialState = {
  title: '',
  description: '',
  tags: [],
};

const NewTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => ({ ...state.tour }));

  const [tour, setTour] = useState(initialState);
  const [tagErrorMsg, setTagErrorMsg] = useState(null);

  const { title, description, tags } = tour;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setTour({ ...tour, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrorMsg(null);
    setTour({ ...tour, tags: [...tour.tags, tag] });
  };

  const handleDeleteTag = (tag) => {
    setTour({ ...tour, tags: tour.tags.filter((item) => item !== tag) });
  };

  const handleClear = () => {
    setTour({ title: '', description: '', tags: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tags.length) {
      return setTagErrorMsg('Please provide some tags');
    }

    if (title && description && tags) {
      dispatch(createNewTour({ tour, navigate, toast }));
    }

    handleClear();
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <Title>New tour</Title>
      <Form onSubmit={handleSubmit}>
        {tourInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <FormGroup key={id}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
              />
            </FormGroup>
          );
        })}
        <FormGroup>
          <Label>Tags</Label>
          <ChipInput
            name='tags'
            variant='outlined'
            placeholder='Tag'
            value={tags}
            onAdd={(tag) => handleAddTag(tag)}
            onDelete={(tag) => handleDeleteTag(tag)}
            style={{ width: '30rem', fontSize: '1.6rem' }}
          />
          {tagErrorMsg && <TagErrorMessage>{tagErrorMsg}</TagErrorMessage>}
        </FormGroup>
        <FormGroup>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setTour({ ...tour, image: base64 })}
          />
        </FormGroup>
        <Button>Create</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  font-size: 1.2rem;
  display: block;
  color: gray;
`;

const Input = styled.input`
  display: block;
  width: 30rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  caret-color: #00008b;
  border: 1px solid gray;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border: 2px solid #00008b;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  border: none;
  display: block;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
  }

  &:focus {
    outline: none;
  }
`;

const TagErrorMessage = styled.div`
  color: #f93154;
  margin-top: 5px;
  text-align: left;
  font-size: 14px;
`;

export default NewTour;
