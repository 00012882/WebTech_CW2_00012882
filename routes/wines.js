let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('wines', { wines: getAll('wines')})
})


router.route('/create')
    .get((req, res) => {
        res.render('create-wine', { countries: getAll('countries')})
    })
    .post((req, res) => {
        let wines = getAll('wines')
        
        wines.push({
            id: uniqid(),
            name: req.body.name,
            age: req.body.age,
            module: req.body.module,
            telephone: req.body.telephone
        })

        saveAll('wines', wines)
        
        res.redirect('/wines')
    })


router.delete('/delete', (req, res) => {
    
    let wines = getAll('wines')

    let filteredWines = wines.filter(wine => wine.id != req.body.id)

    saveAll('wines', filteredWines)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let wine = getAll('wines').find(wine => wine.id == id)
        res.render('create-wine', { wine: wine, countries: getAll('countries') })
    })
    .put((req, res) => {
        let id = req.params.id

        let wines = getAll('wines')

        let wine = wines.find(wine => wine.id == id)

        let idx = wines.indexOf(wine)

        wines[idx].name = req.body.data.name
        wines[idx].age = req.body.data.age
        wines[idx].module = req.body.data.module
        wines[idx].telephone = req.body.data.telephone

        saveAll('wines', wines)

        res.json({ updated: true })
    })



module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}