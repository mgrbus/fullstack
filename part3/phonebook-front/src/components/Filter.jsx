const Filter = ({ handleSearchName, searchName, filterPersons,filteredPersons }) => {


    return (
        <div>
            filter shown with <input value={searchName} onChange={handleSearchName} />
            <button onClick={filterPersons}>search</button>
            <ul>
                {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default Filter