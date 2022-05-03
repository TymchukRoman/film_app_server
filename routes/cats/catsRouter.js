const express = require('express');
const router = express.Router();
const Actor = require('../../models/actorModel');
const Countrie = require('../../models/countrieModel');
const Director = require('../../models/directorModel');
const Genre = require('../../models/genreModel');
const Language = require('../../models/languageModel');
const Rate = require('../../models/rateModel');
const Writer = require('../../models/writerModel');

router.get('/:cat/:search?', async (req, res) => {
    try {

        let { cat, search } = req.params;

        const params = search ? { name: { $regex: new RegExp(search, "i") } } : {}

        switch (cat) {
            case 'actors': {
                try {
                    const actors = await Actor.find(params)
                        .sort('name')
                        .limit(20)
                        .exec();

                    return res.json({ actors });
                } catch (err) {
                    return console.log(err);
                }
            }
            case 'countries': {
                try {
                    const countries = await Countrie.find(params)
                        .sort('name')
                        .limit(20)
                        .exec();

                    return res.json({ countries });
                } catch (err) {
                    return console.log(err);
                }

            }
            case 'directors': {
                try {
                    const directors = await Director.find(params)
                        .sort('name')
                        .limit(20)
                        .exec();

                    return res.json({ directors });
                } catch (err) {
                    return console.log(err);
                }

            }
            case 'genres': {
                try {
                    const genres = await Genre.find(params)
                        .sort('name')
                        .exec();

                    return res.json({ genres });
                } catch (err) {
                    return console.log(err);
                }

            }
            case 'languages': {
                try {
                    const languages = await Language.find(params)
                        .sort('name')
                        .limit(20)
                        .exec();

                    return res.json({ languages });
                } catch (err) {
                    return console.log(err);
                }

            }
            case 'rates': {
                try {
                    const rates = await Rate.find(params)
                        .sort('name')
                        .exec();

                    return res.json({ rates });
                } catch (err) {
                    return console.log(err);
                }

            }
            case 'writers': {
                try {
                    const writers = await Writer.find(params)
                        .sort('name')
                        .limit(20)
                        .exec();

                    return res.json({ writers });
                } catch (err) {
                    return console.log(err);
                }

            }
            default: {
                return res.json({ err: "Provide a cat pls :)" });
            }
        }
    } catch (err) {
        return res.json({ err });
    }
})


module.exports = router;