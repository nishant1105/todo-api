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
	/*user.create({
		email: 'nishant@examlpe.com'
	}).then(function () {
		return TODO.create({
			description: 'Clean Yard'
		});
	}).then(function (todo) {
		user.findById(1).then(function (user) {
			user.addTodo(todo);
		});
	});
	/*TODO.findById(1).then(function (todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	});*/
});