const { sequelize, Movie, Showtime, Seat } = require('./models');

const moviesSeed = [
  {
    title: 'Sunny Sanskari Ki Tulsi Kumari',
    description: 'Comedy / Romantic — a light-hearted family entertainer.',
    durationMin: 130,
    posterUrl: '/posters/s.avif'
  },
  {
    title: 'Avatar: The Way of Water',
    description: 'Action/Adventure/Fantasy/Sci-Fi — the epic sea-bound chapter of the Avatar saga.',
    durationMin: 192,
    posterUrl: '/posters/a.avif'
  },
  {
    title: 'Kantara: A Legend Chapter-1',
    description: 'Adventure/Drama/Thriller — a mythic tale rooted in folklore.',
    durationMin: 148,
    posterUrl: '/posters/k.avif'
  },
  {
    title: 'Idli Kadai',
    description: 'Action/Drama/Family — an emotional, grounded drama.',
    durationMin: 115,
    posterUrl: '/posters/i.avif'
  },
  {
    title: 'They Call Him OG',
    description: 'Action/Crime/Drama/Thriller — a gritty crime-thriller.',
    durationMin: 120,
    posterUrl: '/posters/t.avif'
  }
];

function alignToHalfHour(date) {
  const d = new Date(date);
  d.setSeconds(0,0);
  const mins = d.getMinutes();
  if (mins < 15) d.setMinutes(0);
  else if (mins < 45) d.setMinutes(30);
  else { d.setMinutes(0); d.setHours(d.getHours()+1); }
  return d;
}

function futureHours(hours) {
  return alignToHalfHour(new Date(Date.now() + hours * 1000 * 60 * 60));
}

async function seed() {
  await sequelize.sync({ force: true });
  console.log('DB synced');

  for (const m of moviesSeed) {
    // add fake rating & votes
    const movie = await Movie.create(Object.assign({}, m, { rating: +(6 + Math.random()*4).toFixed(1), votes: Math.floor(500 + Math.random()*200000) }));
    // create 2-3 showtimes per movie
    const times = [2, 3.5, 5, 6.5, 8].slice(0, Math.floor(Math.random() * 3) + 1);
    for (const t of times) {
      const show = await Showtime.create({ time: futureHours(t), MovieId: movie.id });
      // seats: rows A-F, 10 seats each
      const rows = ['A','B','C','D','E','F'];
      const seats = [];
      for (const row of rows) {
        for (let num = 1; num <= 10; num++) seats.push({ row, number: num, ShowtimeId: show.id });
      }
      await Seat.bulkCreate(seats);
    }
  }

  console.log('Seed done');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
