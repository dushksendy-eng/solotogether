const TravelPlan = require('../models/TravelPlan');
const { calculateMatchScore } = require('../utils/matchAlgorithm');

exports.getMatches = async (req, res) => {
  try {
    const myPlans = await TravelPlan.find({ user: req.user._id });
    if (!myPlans.length)
      return res.json({ message: 'Create a travel plan first!', matches: [] });

    const otherPlans = await TravelPlan.find({ user: { $ne: req.user._id } })
      .populate('user', 'name avatar bio nationality languages email');

    const results = [];
    for (const myPlan of myPlans) {
      for (const otherPlan of otherPlans) {
        const { score, reasons, sharedInterests } = calculateMatchScore(myPlan, otherPlan);
        if (score >= 30) {
          results.push({
            score, reasons, sharedInterests,
            myPlan: { id: myPlan._id, destination: myPlan.destination, startDate: myPlan.startDate, endDate: myPlan.endDate },
            matchedPlan: { id: otherPlan._id, destination: otherPlan.destination, startDate: otherPlan.startDate, endDate: otherPlan.endDate, interests: otherPlan.interests },
            matchedUser: otherPlan.user,
          });
        }
      }
    }

    const seen = new Set();
    const deduplicated = results
      .sort((a, b) => b.score - a.score)
      .filter(r => {
        const uid = r.matchedUser._id.toString();
        if (seen.has(uid)) return false;
        seen.add(uid);
        return true;
      });

    res.json({ matches: deduplicated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};