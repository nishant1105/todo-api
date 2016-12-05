var Sequelize = require('sequelize');
var sequelize = new Sequelize(
	undefined, 
	undefined, 
	undefined, 
	{
		'dialect': 'sqlite',
		'storage': __dirname + '/basic-sqlite-database.sqlite'
	});

var TODO = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var user = sequelize.define('user', {
	email: {
		type: Sequelize.STRING
	}
});

TODO.belongsTo(user);
user.hasMany(TODO);

sequelize.sync({
//force: true
}).then(function () {
	console.log('Everything is synced.');
	user.findById(1).then(function (user) {
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		});
	});
});