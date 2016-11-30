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
sequelize.sync({/*force: true*/}).then(function () {
	console.log('Everything is synced.');
	TODO.findById(1).then(function (todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	});
	/*TODO.create({
		description: 'Walk the dog'
	}).then(function (todo) {
		return TODO.create({
			description: 'Clean office'
		});
	}).then(function() {
		//return TODO.findById(1)
		return TODO.findAll({
			where: {
				description: {
					$like: '%dog%'
				}
			}
		});
	}).then(function(todos) {
		if (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		} else {
			console.log('No TODO found');
		}
	}).catch(function(e) {
		console.log(e);
	});*/
});