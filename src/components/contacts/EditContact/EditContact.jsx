import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {
      data: {
        name: '',
        age: '',
        phone: '',
        email: '',
      },
    },
    errorMessage: '',
  });

  useEffect(async () => {
    try {
      setState({ ...state, loading: false });
      const response = await ContactService.getContact(contactId);
      setState({
        ...state,
        loading: false,
        contact: response.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, [contactId]);

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        data: {
          ...state.contact.data,
          [event.target.name]: event.target.value,
        },
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.updateContact(state.contact, contactId);
      if (response) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  const { loading, contact, errorMessage } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Редактировать контакт</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        value={contact.data.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Имя"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="age"
                        value={contact.data.age}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Возраст"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phone"
                        value={contact.data.phone}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Телефон"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.data.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input type="submit" className="btn btn-primary" placeholder="Обновить" />
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
      )}
    </React.Fragment>
  );
};

export default EditContact;
