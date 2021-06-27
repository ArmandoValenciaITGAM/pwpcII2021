const index = (req, res) => {
  res.render('home/index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Campeón de la Fullstack Web',
  });
};

const about = (req, res) => {
  res.render('home/about', { title: 'Acerca de projnotes' });
};

export default {
  index,
  greeting,
  about,
};
