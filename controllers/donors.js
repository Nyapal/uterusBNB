const Donor = require('../models/donor')

module.exports = app => {

    // ALL DONORS - Nurses view only
    app.get('/donors', (req, res) => {
        Donor.find()
        .then(donors => {
            res.render('donors', {donors: donors});
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    // NEW DONOR APPLICATION
    app.get('/donors/new', (req, res) => {
        res.render('new-donor', {})
    })

    // CREATE DONOR
    app.post('/donors', (req, res) => {
        Donor.create(req.body).then((donor) => {
            console.log(donor);
            res.redirect('/thank-you')
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // INDIVIDUAL DONOR PROFILES
    app.get('/donors/:id', (req, res) => {
        Donor.findById(req.params.id).then((donor) => {
            console.log(donor)
            res.render('donor-profile', {donor: donor})
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // EDIT DONOR PROFILE
    app.put('/donors/:id', (req, res) => {
        Donor.findByIdAndUpdate(req.params.id, req.body)
        .then(donor => {
            res.redirect(`/donors/${donor._id}`)
    
        }).catch(err => {
            console.log(err.message)
        })
    })

    // for nurses: APPROVE DONOR PROFILES
    app.get('/donors/:id/edit', (req, res) => {
        Donor.findById(req.params.id, function(err, donor) {
            res.render('edit-donor', {donor: donor})
        })
    })
    
    // DELETE DONOR PROFILES
    app.delete('/donors/:id', (req, res) => {
        Donor.findByIdAndRemove(req.params.id).then((donor) => {
            res.redirect('/donors')
        }).catch((err) => {
            console.log(err.message)
        })
    })
    
    // PUBLIC DONORS
    app.get('/public-donors', (req, res) => {
        Donor.find()
        .then(donors => {
            res.render('public-donors', {donors: donors});
        })
        .catch(err => {
            console.log(err)
        })
    })

}



