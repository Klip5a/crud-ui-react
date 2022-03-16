import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {

  const [query, setQuery] = useState({
    text: ''
  })

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: '',
  });

  useEffect(async () => {
    try {
      setState({
        ...state,
        loading: false,
      });
      const response = await ContactService.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data.filter(
          (x) => x.data && x.data.name && x.data.email && x.data.phone && x.data.age
        ),
        filteredContacts: response.data.filter(
          (x) => x.data && x.data.name && x.data.email && x.data.phone && x.data.age
        ),
      });
      console.log(response)
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContact(contactId);
      if(response){
        setState({
          ...state,
          loading: true
        })
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data.filter(
            (x) => x.data && x.data.name && x.data.email && x.data.phone && x.data.age
          ),
          filteredContacts: response.data.filter(
            (x) => x.data && x.data.name && x.data.email && x.data.phone && x.data.age
          ),
        })
      }
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }

  const searchContacts = (event) => {
    setQuery({...query, text: event.target.value})
    const theContacts = state.contacts.filter(contact => {
      return contact.data.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts: theContacts
    })
  }

  const { loading, contacts, filteredContacts, errorMessage } = state;

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Контакы
                  <Link to={'/contacts/add'} className="btn btn-primary ms-5">
                    <i className="fa fa-plus-circle me-2">Добавить</i>
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input name="text" value={query.text} onChange={searchContacts} type="text" className="form-control" placeholder="Поиск по имени" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className="form-control" placeholder="Search Names" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-5 p-2" key={contact._id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Имя: <span className="fw-bold">{contact.data.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Возраст: <span className="fw-bold">{contact.data.age}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Телефон: <span className="fw-bold">{contact.data.phone}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email: <span className="fw-bold">{contact.data.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/edit/${contact._id}`} className="btn btn-primary m-1">
                                  <i className="fa fa-pen" />
                                </Link>
                                <button className="btn btn-danger m-1" onClick={()=> clickDelete(contact._id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
