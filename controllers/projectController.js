const Project = require('../models/project');

exports.createProject = async (req, res, next) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      status: req.body.status,
      type: req.body.type,
      createdBy: req.user._id,
      teamId: req.body.teamId,
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    next(err);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.createdBy !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    project.name = req.body.name;
    project.assignedTo = req.body.assignedTo;
    project.status = req.body.status;
    project.type = req.body.type;
    project.teamId = req.body.teamId;
    const savedProject = await project.save();
    res.status(200).json(savedProject);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.createdBy !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await project.delete();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};