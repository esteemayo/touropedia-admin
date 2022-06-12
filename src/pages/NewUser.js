import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Publish } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { phone } from 'responsive';
import { userInputs } from 'formData';
import { registerUser } from 'features/user/userSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => ({ ...state.user }));

  const [file, setFile] = useState(null);
  const [user, setUser] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const { firstName, lastName, email, password, passwordConfirm } =
            user;

          const credentials = {
            ...user,
            avatar: downloadURL,
          };

          if (password !== passwordConfirm) {
            toast.error('Passwords do not match');
            return;
          }

          if (firstName && lastName && email && password && passwordConfirm) {
            dispatch(registerUser({ credentials, navigate, toast }));
          }
        });
      }
    );
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <Title>New user</Title>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          {userInputs.map((input) => {
            const { id, type, name, label, placeholder } = input;
            return (
              <FormWrapper key={id}>
                <FormGroup>
                  <FormInput
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required
                  />
                  <FormLabel>{label}</FormLabel>
                </FormGroup>
              </FormWrapper>
            );
          })}

          <FormFileGroup>
            <FormFileLabel htmlFor='file'>
              Avatar: <Publish style={{ fontSize: '2rem' }} />
            </FormFileLabel>
            <FormInput
              id='file'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </FormFileGroup>
        </FormContainer>
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

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FormWrapper = styled.div``;

const FormGroup = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;

    ${phone({ marginBottom: '0.5rem' })}
  }
`;

const FormFileGroup = styled.div`
  width: 40rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 1rem;
  margin-right: 2rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;

    ${phone({ marginBottom: '0.5rem' })}
  }
`;

const FormLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: rgb(151, 150, 150);
`;

const FormFileLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: rgb(151, 150, 150);
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  border: none;
  width: 100%;
  padding: 1.25rem 1.75rem;
  border-top: 3px solid transparent;
  border-bottom: 3px solid #bbb;
  font-family: inherit;
  font-size: 1.4rem;
  color: #999;
  border-radius: 4px;
  caret-color: #00008b;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const Button = styled.button`
  border: none;
  display: block;
  width: 20rem;
  text-transform: capitalize;
  text-align: center;
  padding: 0.7rem 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 1rem;
  margin-top: 3rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.03);

    @media only screen and (max-width: 37.5em), only screen and (hover: none) {
      transform: none;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default NewUser;
