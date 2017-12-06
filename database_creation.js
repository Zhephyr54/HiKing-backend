conn = new Mongo();
db = conn.getDB('hiking');

db.createCollection('users');
db.createCollection('hikings');
db.getCollection('users').insertMany([
    {
      photo: 'https://randomuser.me/api/portraits/women/86.jpg',
      email: 'stephanie.gerard@osef.mail',
      firstname: 'Stéphanie',
      lastname: 'Gérard',
      address: 'Nancy',
    },
    {
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'sophie.marechal@osef.mail',
      firstname: 'Sophie',
      lastname: 'Maréchal',
      address: 'Metz',
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/51.jpg',
      email: 'jeremy.laurent@osef.mail',
      firstname: 'Jérémy',
      lastname: 'Laurent',
      address: 'Thann',
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/78.jpg',
      email: 'claude.claude@osef.mail',
      firstname: 'Claude',
      lastname: 'Claude',
      address: 'CLaudeville',
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
      email: 'paul.henri@osef.mail',
      firstname: 'Paul',
      lastname: 'Henri',
      address: 'Nancy',
    }
]);

var paulId = db.getCollection('users').findOne({firstname: 'Paul'})._id.str;
var stephanieId = db.getCollection('users').findOne({firstname: 'Stéphanie'})._id.str;
var sophieId = db.getCollection('users').findOne({firstname: 'Sophie'})._id.str;
var jeremyId = db.getCollection('users').findOne({firstname: 'Jérémy'})._id.str;

db.getCollection('hikings').insertMany([
	{
	  title: 'Rando en forêt de Haye',
	  photo: 'http://media.routard.com/image/52/2/rando-foret-fb.1459522.jpg',
	  date: '10/12/17',
	  guide_id: paulId,
	  startLocalization: 'Velaine-en-Haye',
	  endLocalization: 'Velaine-en-Haye',
	  duration: '2 heures',
	  distance: NumberInt('8'),
	  complexity: 'Débutant',
	  description: 'Petite randonnée sympa dans le cadre superbe de la forêt de Haye ! Prévoir des bouteilles d’eau.',
	  personMinNumber: NumberInt('5'),
	  personMaxNumber: NumberInt('10'),
	  hikers_id: [stephanieId, sophieId],
	},
	{
	  title: 'Rando montagne dans les Vosges',
	  photo: 'http://marchpalow.free.fr/public/Vosges_-_Longemer/Le_Hohneck.jpg',
	  date: '15/12/17',
	  guide_id: jeremyId,
	  startLocalization: 'Thann',
	  endLocalization: 'Thann',
	  duration: 'Demi-journée',
	  distance: NumberInt('13'),
	  complexity: 'Confirmé',
	  description: 'Au départ de Thann, belle randonnée d’une demi-journée en direction de la Waldkapelle, en passant par le Hirnelestein et la Croix du Rangen.',
	  personMinNumber: NumberInt('10'),
	  personMaxNumber: NumberInt('20'),
	  hikers_id: [],
	  price: NumberDecimal('5')
	},
	{
	  title: 'Rando Nancy-Metz !',
	  photo: 'https://i2.wp.com/tout-metz.com/wp-content/uploads/2007/05/marche-nancy-metz-1.jpg',
	  date: '18/12/17',
	  guide_id: sophieId,
	  startLocalization: 'Nancy',
	  endLocalization: 'Metz',
	  duration: '1 journée',
	  distance: NumberInt('69'),
	  complexity: 'Confirmé',
	  description: 'Le chemin qui va de Metz à Nancy ne remonte pas au Moyen-Age. Nul pèlerin à coquille ne l’a jamais parcouru. C’est en 1981 qu’une poignée de randonneurs se sont mis en tête le défi de relier les deux villes d’une seule traite. Blabla...',
	  personMinNumber: NumberInt('20'),
	  personMaxNumber: NumberInt('50'),
	  hikers_id: [paulId, stephanieId],
	  price: NumberDecimal('20')
	}
]);

