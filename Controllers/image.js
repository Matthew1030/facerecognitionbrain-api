const Clarifai = require('clarifai');

//Clarifai
const app = new Clarifai.App({
    apiKey: '4edefa40cb014f2f833a0b4c0e42758b'
   });

const handleApiCall = (req, res) => {
    app.models
   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data => {
       res.json(data)
   })
   .catch(err => {
       res.status(400).json('unable to work with API')
   })
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    console.log(id);
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}