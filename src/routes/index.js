const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
	const tasks = await Task.find();
	console.log(tasks);
	res.render('index', {
		tasks
	});
});


//Para insertar una tarea
router.post('/add', async (req, res) => {
	//console.log(new Task(req.body));
	const task = new Task(req.body);
	await task.save();
	res.redirect('/');
});

//Para indicar si la tarea ya esta terminado
router.get('/turn/:id', async (req, res) => {
	const {
		id
	} = req.params;
	const task = await Task.findById(id);
	//console.log(task);
	task.status = !task.status;
	await task.save();
	res.redirect('/');
});

//Para editar una tarea
router.get('/edit/:id', async (req, res) => {
	const {
		id
	} = req.params;
	const task = await Task.findById(id);
	res.render('edit', {
		task
	});
});

router.post('/edit/:id', async (req, res) => {
	const {
		id
	} = req.params;
	await Task.update({
		_id: id
	}, req.body);
	res.redirect('/');
});

//Para eliminiar una tarea
router.get('/delete/:id', async (req, res) => {
	const {
		id
	} = req.params;
	await Task.remove({
		_id: id
	});
	res.redirect('/');
});

module.exports = router;