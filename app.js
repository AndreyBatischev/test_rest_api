const express = require('express')
const path = require('path')
const { v4 } = require('uuid')
const app = express()

const CONTACTS = [
    { id: v4(), name: 'Andrey', value: '+9800987686', marked: false }
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    const contact = { ...req.body, id: v4(), marked: false }
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS.splice(CONTACTS.indexOf(req.id), 1)
    res.status(200).json({ message: 'Contact has been delete' })
})

app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})



app.listen(3000, () => console.log('Server work'))