const express = require('express');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname  }/../data/films.json`;
const router = express.Router();

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

router.get('/', (req, res) => {
    const minimum = req.query['minimum-duration'];
    console.log(`GET /films/minimum-duration = ${minimum}`);

    const f = parse(jsonDbPath, films);

    if(minimum <= 0)return res.sendStatus(400);

    if(minimum === undefined){
        return res.json(f);
    }

    const filmsTrie = [];

    for(const film of f){
        if(film.duration >= minimum){
            filmsTrie.push(film);
        }
    }
    return res.json(filmsTrie);
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    console.log(`GET /films/{id} = ${id}`)

    const f = parse(jsonDbPath, films);

    const filmT = films.findIndex((film) => film.id === id);

    if (filmT < 0)return res.sendStatus(404);

    return res.json(f[filmT]);
});


router.post('/', (req, res) => {
    const title = req?.body?.title?.length !==0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');
     
    if(!title || !duration || !budget || !link) return res.sendStatus(400);

    const f = parse(jsonDbPath, films);
    const lastItemIndex = f?.length !== 0 ? f.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? f[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
    

    for(const film0 of films){
        if(film0.title === title)return res.sendStatus(409);
    };

    const film = {
        id: nextId,
        title,
        duration,
        budget,
        link,
    };

    f.push(film);

    serialize(jsonDbPath, f);

    return res.json(film);

  });

router.delete('/:id', (req, res) => {
    const {id} = req.params
    console.log(`DELETE /films/${id}`);

    const f = parse(jsonDbPath, films);

    let foundId; 
  
    for(let i = 0; i < f.length; i+= 1){
        if(f[i]?.id === id)foundId = i;
    }

    if(foundId === undefined)return res.sendStatus(404);
  
    const itemsRemovedFromMenu = f.splice(foundId, 1);
    const itemRemoved = itemsRemovedFromMenu[0];

    serialize(jsonDbPath, f);
  
    res.json(itemRemoved);
  });

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    console.log(`PATCH /films/${id}`);

    const title = req?.body?.title?.length !==0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if(!title && !duration && !budget && !link)return res.sendStatus(400);

    const f = parse(jsonDbPath, films);

    let foundId; 
  
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < f.length; i++){
        if(f[i]?.id === id)foundId = i;
    }
    if(foundId === undefined)return res.sendStatus(404);

    const modifiedFilm = {...f[foundId], ...req.body};

    f[foundId] = modifiedFilm;

    serialize(jsonDbPath, f);

    res.json(modifiedFilm);

});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(`PUT /films/${id}`);

    const title = req?.body?.title?.length !==0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link)return res.sendStatus(400);

    const f = parse(jsonDbPath, films);

    const film = {
        id,
        title,
        duration,
        budget,
        link,
    };

    let foundId = -1; 
  
    for(let i = 0; i < f.length; i += 1){
        if(f[i]?.id === id)foundId = i;
    }

    if(foundId === -1){  
        f.push(film);
        serialize(jsonDbPath, f);
        return res.json(film);
    }

    f[foundId] = film;
    serialize(jsonDbPath, f);
    return res.json(film);

})
  
  
module.exports = router;

