const Content = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        <p>
          name: <input value={newName} onChange={handleNameChange} />
        </p>
        <p>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </p>
        <p>
          <button type="submit">add</button>
        </p>
      </form>
    )
}

export default Content