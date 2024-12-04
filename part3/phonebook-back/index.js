const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('dist'))

morgan.token('type', ((req,res) => {
    if (req.method==='POST') {
         console.log(req.body)
    }
}))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "393-6423122"
    }
]

app.use(morgan(':type'))

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date().toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateId = () => {
    if (persons.length > 0) {
        return Math.random() * 10
    } else {
        return 0
    }
}

app.post('/api/persons', (req, res) => {

    const name = req.body.name
    const number = req.body.number
    const newPerson = { id: generateId(), name: name, number: number }

    if (!name || !number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    const filterName = persons.find(p=>p.name===name)
    if (filterName) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})