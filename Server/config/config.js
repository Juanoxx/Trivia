//ROOT
//process.env.ROOT = 'http://159.65.100.191:3030';
//process.env.ROOT = 'https://trivia.neurone.info';
//process.env.ROOT = 'http://159.89.132.126:3030';
process.env.ROOT = 'http://localhost:3030';

//PORT
process.env.PORT = process.env.PORT || 3030;

//PUBLIC PORT
process.env.PUBLIC_PORT = 3030;

//token secret
process.env.TOKEN_SECRET = 'ady7asdy78'

//DB
process.env.DB_USER = 'neuroneAdmin';

process.env.DB_PWD = 'DK,V-Dk6-*Pd-PM'
//process.env.URI = `mongodb://root:example@localhost:27017`;
process.env.URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:27017/neuronegame`;
process.env.USERURI = `mongodb://localhost:27017/neuronegameuser`;

//NEURONE GM
//process.env.NEURONEGM = 'http://159.65.100.191:3080';
//process.env.NEURONEGM = 'https://trivia.neurone.info:3002';
process.env.NEURONEGM = 'http://167.172.192.177:3002';

//NEURONE GAME CLIENT
//process.env.GAME_CLIENT = 'http://159.65.100.191:3030';
//process.env.GAME_CLIENT = 'https://trivia.neurone.info';
process.env.GAME_CLIENT = 'http://167.172.192.177:3001';

//NEURONE URL
process.env.NEURONE_URL = 'http://167.172.192.177/';


// NEURONE DOCS path
process.env.NEURONE_DOCS = '/home/neurone/neuroneAssets'

//TIMEZONE
process.env.TZ = 'America/Santiago';