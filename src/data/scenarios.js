// Local scenario data keeps the first PULSE experience predictable and easy to edit.
export const scenarios = [
	{
		id: 'academic-001', category: 'academics', difficulty: 'normal',
		title: 'The exam that is still two weeks away',
		description: 'You have a difficult exam in two weeks, but a short assignment is due tomorrow. You have one focused evening available.',
		choices: [
			{ id: 'a', text: 'Finish the assignment first', effects: { progress: 3, stress: -1 }, explanation: 'You protect the immediate deadline and create room for exam preparation later.' },
			{ id: 'b', text: 'Study for the exam tonight', effects: { learning: 3, deadlineRisk: 2 }, explanation: 'You make an early start on the larger challenge, but the assignment still needs attention.' },
			{ id: 'c', text: 'Split the evening between both', effects: { progress: 2, energy: -1 }, explanation: 'You move both responsibilities forward, although neither gets your full attention.' },
		],
	},
	{
		id: 'academic-002', category: 'academics', difficulty: 'normal',
		title: 'A confusing lecture topic',
		description: 'You understand most of today\'s lecture, except for one idea that appears in the next problem set.',
		choices: [
			{ id: 'a', text: 'Ask a question before leaving class', effects: { learning: 3, confidence: 2 }, explanation: 'A small question now can prevent confusion from compounding later.' },
			{ id: 'b', text: 'Mark it and revisit it this evening', effects: { independence: 2, deadlineRisk: 1 }, explanation: 'You give yourself a chance to solve it independently, but the gap stays open for now.' },
			{ id: 'c', text: 'Move on and hope the problem set clarifies it', effects: { timeSaved: 1, learningRisk: 2 }, explanation: 'You preserve time today, but an unresolved concept may become harder to repair.' },
		],
	},
	{
		id: 'academic-003', category: 'academics', difficulty: 'normal',
		title: 'The group project draft',
		description: 'Your group has a rough draft due tonight. One section is weak, but revising it yourself would take most of the afternoon.',
		choices: [
			{ id: 'a', text: 'Rewrite the section yourself', effects: { quality: 3, energy: -2 }, explanation: 'The draft improves quickly, but the workload becomes uneven.' },
			{ id: 'b', text: 'Send specific feedback to the teammate', effects: { teamwork: 3, quality: 2 }, explanation: 'You help the section improve while keeping responsibility shared.' },
			{ id: 'c', text: 'Submit the draft as it is', effects: { timeSaved: 2, qualityRisk: 2 }, explanation: 'You protect your time, but the group accepts a weaker submission.' },
		],
	},
	{
		id: 'academic-004', category: 'academics', difficulty: 'normal',
		title: 'A packed study weekend',
		description: 'Three subjects need attention this weekend. You know that trying to cover everything may leave you tired and unfocused.',
		choices: [
			{ id: 'a', text: 'Prioritize the subject with the nearest exam', effects: { priority: 3, stress: -1 }, explanation: 'You direct limited energy toward the most urgent academic need.' },
			{ id: 'b', text: 'Give every subject an equal block', effects: { balance: 3, depthRisk: 1 }, explanation: 'You stay balanced, though no single subject receives a deep session.' },
			{ id: 'c', text: 'Take Saturday off and study Sunday', effects: { recovery: 2, deadlineRisk: 2 }, explanation: 'Rest may restore your focus, but the schedule becomes less forgiving.' },
		],
	},
	{
		id: 'projects-001', category: 'projects', difficulty: 'normal',
		title: 'The project idea is too large',
		description: 'Your team has an exciting project idea, but the first version would require more time and tools than you have.',
		choices: [
			{ id: 'a', text: 'Reduce it to one clear core feature', effects: { clarity: 3, progress: 3 }, explanation: 'A smaller first version gives the team a realistic path to a finished result.' },
			{ id: 'b', text: 'Keep the full idea and work longer', effects: { ambition: 3, energy: -2 }, explanation: 'You preserve the vision, but the team takes on more delivery risk.' },
			{ id: 'c', text: 'Ask the instructor to expand the deadline', effects: { support: 2, uncertainty: 1 }, explanation: 'You seek more room, though the deadline may not change.' },
		],
	},
	{
		id: 'projects-002', category: 'projects', difficulty: 'normal',
		title: 'A teammate goes quiet',
		description: 'A teammate has not replied for two days, and their part of the project is needed for your next milestone.',
		choices: [
			{ id: 'a', text: 'Check in privately and ask what is blocking them', effects: { teamwork: 3, clarity: 2 }, explanation: 'A direct, kind conversation may reveal a problem before it affects the whole team.' },
			{ id: 'b', text: 'Reassign the work immediately', effects: { progress: 3, trustRisk: 2 }, explanation: 'The milestone is protected, but the teammate may feel excluded.' },
			{ id: 'c', text: 'Wait one more day', effects: { patience: 2, deadlineRisk: 2 }, explanation: 'You give them more time, while accepting less time to recover.' },
		],
	},
	{
		id: 'projects-003', category: 'projects', difficulty: 'normal',
		title: 'Feedback changes the direction',
		description: 'A review suggests your project needs a different approach. Your team has already built a small prototype.',
		choices: [
			{ id: 'a', text: 'Adopt the feedback and revise the plan', effects: { quality: 3, flexibility: 2 }, explanation: 'You use feedback while there is still time to improve the outcome.' },
			{ id: 'b', text: 'Defend the original direction', effects: { conviction: 2, qualityRisk: 1 }, explanation: 'You protect the original idea, but need strong evidence that it is still right.' },
			{ id: 'c', text: 'Test both directions briefly', effects: { learning: 3, timeRisk: 2 }, explanation: 'A quick comparison can make the decision clearer, if the test stays focused.' },
		],
	},
	{
		id: 'time-001', category: 'time management', difficulty: 'normal',
		title: 'The empty hour between classes',
		description: 'You have one free hour on campus before your next class and several unfinished tasks competing for it.',
		choices: [
			{ id: 'a', text: 'Complete the smallest useful task', effects: { progress: 2, momentum: 2 }, explanation: 'A quick win reduces mental clutter without requiring a long setup.' },
			{ id: 'b', text: 'Start the most important task', effects: { priority: 3, focusRisk: 1 }, explanation: 'You use the hour for meaningful progress, even if you cannot finish.' },
			{ id: 'c', text: 'Use the hour to rest', effects: { recovery: 3, progressRisk: 1 }, explanation: 'Rest can protect the quality of your next focused block.' },
		],
	},
	{
		id: 'time-002', category: 'time management', difficulty: 'normal',
		title: 'Too many plans tonight',
		description: 'You agreed to dinner, a club meeting, and a study session on the same evening. You cannot do all three well.',
		choices: [
			{ id: 'a', text: 'Keep the study session and cancel dinner', effects: { progress: 3, connectionRisk: 1 }, explanation: 'You protect academic progress but give up personal time with someone important.' },
			{ id: 'b', text: 'Attend dinner and skip the club meeting', effects: { connection: 3, opportunityRisk: 1 }, explanation: 'You invest in a personal relationship and accept missing one group activity.' },
			{ id: 'c', text: 'Tell everyone early and negotiate shorter plans', effects: { balance: 3, energy: -1 }, explanation: 'Clear communication may preserve parts of each plan without creating a rushed evening.' },
		],
	},
	{
		id: 'time-003', category: 'time management', difficulty: 'normal',
		title: 'The late-night catch-up',
		description: 'You are behind on work at 11 p.m. and could finish it by staying up, but you have an early class tomorrow.',
		choices: [
			{ id: 'a', text: 'Finish only the most urgent part', effects: { deadlineRisk: -1, sleep: 1 }, explanation: 'You reduce tomorrow\'s pressure without spending the whole night working.' },
			{ id: 'b', text: 'Work until everything is done', effects: { completion: 3, energy: -3 }, explanation: 'The list is cleared, but tomorrow starts with less energy and attention.' },
			{ id: 'c', text: 'Sleep now and start early', effects: { recovery: 3, deadlineRisk: 1 }, explanation: 'You protect rest and trust your morning self with the remaining work.' },
		],
	},
	{
		id: 'clubs-001', category: 'clubs', difficulty: 'normal',
		title: 'A club leadership request',
		description: 'Your club asks you to lead an event. It would be valuable experience, but your semester already feels full.',
		choices: [
			{ id: 'a', text: 'Accept and define a smaller role', effects: { leadership: 3, balance: 2 }, explanation: 'You gain experience while setting boundaries around the commitment.' },
			{ id: 'b', text: 'Accept the full responsibility', effects: { leadership: 3, energy: -2 }, explanation: 'You take on a meaningful opportunity with a larger weekly cost.' },
			{ id: 'c', text: 'Decline and stay a regular member', effects: { balance: 3, opportunityRisk: 1 }, explanation: 'You protect your capacity and remain involved without leading this event.' },
		],
	},
	{
		id: 'clubs-002', category: 'clubs', difficulty: 'normal',
		title: 'A new member feels left out',
		description: 'You notice a new club member standing alone while everyone else is preparing for the meeting.',
		choices: [
			{ id: 'a', text: 'Invite them into your group', effects: { belonging: 3, connection: 2 }, explanation: 'A small invitation can make the club feel more welcoming immediately.' },
			{ id: 'b', text: 'Ask an officer to check in', effects: { support: 2, responsibility: 1 }, explanation: 'You connect them with someone who can offer longer-term support.' },
			{ id: 'c', text: 'Focus on preparing for the meeting', effects: { preparation: 2, belongingRisk: 1 }, explanation: 'You stay on task, but the moment to welcome them may pass.' },
		],
	},
	{
		id: 'clubs-003', category: 'clubs', difficulty: 'normal',
		title: 'The club meeting overlaps',
		description: 'Two clubs you care about schedule important meetings at the same time for the first time this semester.',
		choices: [
			{ id: 'a', text: 'Attend the meeting with the rare decision', effects: { priority: 3, opportunity: 2 }, explanation: 'You choose the event where your presence has the greatest immediate value.' },
			{ id: 'b', text: 'Split your time between both', effects: { balance: 2, focusRisk: 1 }, explanation: 'You stay connected to both groups, but neither gets your full attention.' },
			{ id: 'c', text: 'Ask for notes and attend neither', effects: { flexibility: 2, connectionRisk: 1 }, explanation: 'You preserve the evening and rely on others to help you catch up.' },
		],
	},
	{
		id: 'career-001', category: 'career', difficulty: 'normal',
		title: 'The application needs one more hour',
		description: 'An internship application closes tomorrow. Your materials are good, but one project example needs a clearer explanation.',
		choices: [
			{ id: 'a', text: 'Improve the strongest project example', effects: { quality: 3, confidence: 2 }, explanation: 'You spend limited time where it can make the application more convincing.' },
			{ id: 'b', text: 'Submit now and stop revising', effects: { completion: 2, energy: 1 }, explanation: 'You secure the application and avoid letting polishing become procrastination.' },
			{ id: 'c', text: 'Ask someone to review it tonight', effects: { feedback: 3, uncertainty: 1 }, explanation: 'A second perspective may reveal a useful improvement before submission.' },
		],
	},
	{
		id: 'career-002', category: 'career', difficulty: 'normal',
		title: 'A networking message',
		description: 'An alumnus in a field you are curious about accepts your connection request. You want to start a genuine conversation.',
		choices: [
			{ id: 'a', text: 'Send a short, specific question', effects: { connection: 3, confidence: 2 }, explanation: 'A thoughtful question gives the person an easy way to respond.' },
			{ id: 'b', text: 'Ask directly for a referral', effects: { directness: 2, trustRisk: 2 }, explanation: 'You make your goal clear, but the relationship has not had time to develop.' },
			{ id: 'c', text: 'Wait until you have more experience', effects: { preparation: 2, opportunityRisk: 1 }, explanation: 'You prepare further, although waiting may delay a useful conversation.' },
		],
	},
	{
		id: 'career-003', category: 'career', difficulty: 'normal',
		title: 'A role outside your plan',
		description: 'A part-time role opens in an area adjacent to your major. It is not your original plan, but the work could teach you useful skills.',
		choices: [
			{ id: 'a', text: 'Apply and learn more before deciding', effects: { exploration: 3, opportunity: 2 }, explanation: 'An application is a low-commitment way to test whether the role fits.' },
			{ id: 'b', text: 'Stay focused only on your original path', effects: { clarity: 2, explorationRisk: 1 }, explanation: 'You preserve focus, but may miss a useful adjacent opportunity.' },
			{ id: 'c', text: 'Ask a professor for perspective', effects: { guidance: 3, timeRisk: 1 }, explanation: 'A trusted perspective can help you compare the role with your longer-term goals.' },
		],
	},
]

export const initialScenarios = scenarios
