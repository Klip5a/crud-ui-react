import axios from 'axios';

export class ContactService {
  static serverURL = 'http://178.128.196.163:3000';

  static getAllContacts() {
    let dataURL = `${this.serverURL}/api/records`;
    return axios.get(dataURL);
  }

  static getContact(contactId) {
    let dataURL = `${this.serverURL}/api/records/${contactId}`;
    return axios.get(dataURL);
  }

  static updateContact(contact, contactId) {
    let dataURL = `${this.serverURL}/api/records/${contactId}`;
    return axios.post(dataURL, contact);
  }

  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/api/records/${contactId}`;
    return axios.delete(dataURL);
  }

  static createContact(contact) {
    let dataURL = `${this.serverURL}/api/records`;
    return axios.put(dataURL,{
        data: contact
    });
  }
}
