import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Notification = ({message, type}) => (message === null) ? null : <div className={type}>{message}</div>;

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName);

    if(person){
      if(window.confirm(`${person.name} is already added to phonebook, replace the old phone number with a new one?`)) {
        const changedPerson = {...person, number: newNumber};

        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson)))
        setNewName('');
        setNewNumber('');
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setSuccessMessage(
        `Added '${returnedPerson.name}'`
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    })
  }

  const deletePersonID = (id) => {
    const person = persons.find(person => person.id === id).name;
    if(window.confirm(`Delete ${person}?`)) {
      personService
      .deleteItem(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch( error => {
        setErrorMessage(
          `Information of ${person} has already been removed from server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setPersons(persons.filter(person => person.id !== id));
      })
      
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);
  
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success'/>
      <Notification message={errorMessage} type='error'/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={() => deletePersonID(person.id)}/>)}
      </ul>
    </div>
  )
}

export default App