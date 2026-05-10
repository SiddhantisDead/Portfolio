const validateProject = (req, res, next) => {
  const { title, description, category } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required');
  }
  if (category && !['dev', 'vfx', 'cybersec', 'other'].includes(category)) {
    errors.push('Invalid category');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

const validateMessage = (req, res, next) => {
  const { name, email, body } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required');
  }
  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('A valid email is required');
  }
  if (!body || typeof body !== 'string' || body.trim().length === 0) {
    errors.push('Message body is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

module.exports = { validateProject, validateMessage };