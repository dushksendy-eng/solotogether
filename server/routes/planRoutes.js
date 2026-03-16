const TravelPlan = require('../models/TravelPlan')
const express = require('express');
const router = express.Router();
const { createPlan, getMyPlans, getPlan, deletePlan } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', createPlan);
router.get('/mine', getMyPlans);
router.get('/:id', getPlan);
router.delete('/:id', deletePlan);

router.put('/:id', async (req, res) => {
  try {
    const plan = await TravelPlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(plan)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router;