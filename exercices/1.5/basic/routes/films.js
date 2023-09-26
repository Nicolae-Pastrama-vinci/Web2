var express = require('express');
var router = express.Router();

const films = [
    {
        id : 1,
        title : 'titre1',
        duration : 110,
        budget : 150000,
        link : 'link1',
    },
    {
        id : 2,
        title : 'titre2',
        duration : 90,
        budget : 564231,
        link : 'link2',
    },
    {
        id : 3,
        title : 'titre3',
        duration : 20,
        budget : 15000,
        link : 'link3',
    },
];

router.get('/', (req, res, next) => {
    const minimum = req.query['minimum-duration'];
    console.log(`GET /films/minimum-duration = ${minimum}`);

    if(minimum <= 0)return res.sendStatus(400);

    if(minimum === undefined){
        return res.json(films);
    }

    let filmsTrie = [];

    /*filmsTrie = films.map((film) =>{ 
        if(film.duration >= minimum){
            filmsTrie.push(film)
        }});
        */
    for(let film of films){
        if(film.duration >= minimum){
            filmsTrie.push(film);
        }
    }
    return res.json(filmsTrie);
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(`GET /films/{id} = ${id}`)

    const filmT = films.findIndex((film) => film.id == id);

    if (filmT < 0)return res.sendStatus(404);

    return res.json(films[filmT]);
});


router.post('/', (req, res) => {
    const title = req?.body?.title?.length !==0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');
     
    if(!title || !duration || !budget || !link) return res.sendStatus(400);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;

    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;

    const nextId = lastId + 1;

    for(let film0 of films){
        if(film0.title === title)return res.sendStatus(409);
    };

    const film = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };

    films.push(film);

    res.json(film);

  });
  
module.exports = router;

