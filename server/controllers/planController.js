const TravelPlan = require('../models/TravelPlan');

exports.createPlan = async (req, res) => {
  try {
    const plan = await TravelPlan.create({ ...req.body, user: req.user._id });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyPlans = async (req, res) => {
  try {
    const plans = await TravelPlan.find({ user: req.user._id }).sort('-createdAt');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const plan = await TravelPlan.findById(req.params.id).populate('user', 'name avatar');
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await TravelPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    if (plan.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await plan.deleteOne();
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};