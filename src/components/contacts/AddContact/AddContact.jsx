import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import axios from 'axios';

const AddContact = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      age: '',
      phone: '',
      email: '',
    },
    errorMessage: '',
  });

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
          ...state.contact,
          [event.target.name]: event.target.value,
      },
    });
  };

  const createContact = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.createContact(state.contact);
      if (response) {
        navigate(`/contacts/list`, { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
      navigate(`/contacts/add`, { replace: false });
    }
  };

  const { loading, contact, errorMessage } = state;

  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-succes fw-bold">Добавить контакт</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={createContact}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Имя"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="age"
                    value={contact.age}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Возраст"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="phone"
                    value={contact.phone}
                    onChange={updateInput}
                    type="number"
                    className="form-control"
                    placeholder="Телефон"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input type="submit" className="btn btn-success" placeholder="Создать" />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                    Назад
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddContact;
