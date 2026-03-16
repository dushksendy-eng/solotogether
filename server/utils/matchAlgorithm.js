function calculateMatchScore(planA, planB) {
  let score = 0;
  const reasons = [];

  if (planA.destination.toLowerCase() === planB.destination.toLowerCase()) {
    score += 40;
    reasons.push(`Both traveling to ${planA.destination}`);
  } else if (planA.country.toLowerCase() === planB.country.toLowerCase()) {
    score += 15;
    reasons.push(`Both visiting ${planA.country}`);
  }

  const overlapDays = getOverlapDays(planA.startDate, planA.endDate, planB.startDate, planB.endDate);
  if (overlapDays > 0) {
    const durationA = getDays(planA.startDate, planA.endDate);
    const overlapRatio = Math.min(overlapDays / durationA, 1);
    const dateScore = Math.round(overlapRatio * 30);
    score += dateScore;
    reasons.push(`${overlapDays} day(s) overlap`);
  }

  const sharedInterests = planA.interests.filter(i => planB.interests.includes(i));
  const interestScore = Math.min(sharedInterests.length * 10, 30);
  score += interestScore;
  if (sharedInterests.length > 0)
    reasons.push(`Shared interests: ${sharedInterests.join(', ')}`);

  return { score, reasons, sharedInterests };
}

function getOverlapDays(startA, endA, startB, endB) {
  const start = Math.max(new Date(startA), new Date(startB));
  const end = Math.min(new Date(endA), new Date(endB));
  const diff = (end - start) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(diff));
}

function getDays(start, end) {
  return Math.max(1, Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)));
}

module.exports = { calculateMatchScore };