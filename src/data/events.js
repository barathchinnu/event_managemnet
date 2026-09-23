// CIVISTA 2026 Event Data Specifications

export const EVENTS_DATA = [
  {
    id: "presentation",
    title: "Presentation",
    category: "Technical Event",
    type: "technical",
    shortDescription: "Showcase your ideas, research and innovative solutions through an engaging presentation.",
    fullDescription: "Step onto the stage to pitch your visionary research, groundbreaking engineering concepts, and technological advancements to an esteemed panel of industry experts and academicians. This is your platform to articulate cutting-edge solutions for real-world challenges.",
    date: "September 30, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Kalingarayan Seminar Hall",
    teamSize: "1 to 3 Members",
    minTeamSize: 1,
    maxTeamSize: 3,
    supportsIndividual: true,
    supportsTeam: true,
    accentColor: "indigo",
    badge: "Flagship Technical",
    prize: "Winner Certificate + Participation Certificate",
    coordinator: {
      name: "Dr. K. Vishnuvardhan",
      designation: "Assistant Professor (SLG)",
      phone: "+91 93425 29462",
      email: "civista@college.edu"
    },
    rules: [
      "Each presentation will be allotted 8 minutes for presentation followed by 2 minutes of Q&A with the jury.",
      "Presentations must be submitted in .PPTX or .PDF format at the registration desk at least 30 minutes prior to event commencement.",
      "Topics can span Artificial Intelligence, Sustainable Technologies, IoT, Cloud Computing, Cyber Security, or Emerging Innovations.",
      "Plagiarism strictly prohibited. Original concept and methodology will carry higher evaluation weightage.",
      "Maximum of 15 slides per presentation (excluding title and thank you slides).",
      "Decision of the judges is final and binding."
    ],
    evaluationCriteria: [
      "Innovation & Originality (30%)",
      "Technical Depth & Feasibility (30%)",
      "Presentation Delivery & Visual Quality (20%)",
      "Response to Q&A Session (20%)"
    ]
  },
  {
    id: "technical-quiz",
    title: "Technical Quiz",
    category: "Technical Event",
    type: "technical",
    shortDescription: "Test your technical knowledge, logical thinking and problem-solving skills in an exciting technical quiz.",
    fullDescription: "Gear up your neurons and battle against the sharpest minds across colleges. Technical Quiz challenges your grasp of core computer science, algorithmics, engineering aptitude, tech trivia, and fast-paced buzzer round showdowns.",
    date: "September 30, 2026",
    time: "01:30 PM - 03:30 PM",
    venue: "Kalingarayan Seminar Hall",
    teamSize: "2 Members per Team",
    minTeamSize: 2,
    maxTeamSize: 2,
    supportsIndividual: false,
    supportsTeam: true,
    accentColor: "cyan",
    badge: "Brain Battle",
    prize: "Winner Certificate + Participation Certificate",
    coordinator: {
      name: "Dr. K. Vishnuvardhan",
      designation: "Assistant Professor (SLG)",
      phone: "+91 93425 29462",
      email: "civista@college.edu"
    },
    rules: [
      "Strictly 2 participants per team. Individual participation is not permitted for this event.",
      "Round 1: Rapid Elimination Written/Digital Prelims (30 Questions in 25 Minutes).",
      "Top 6 teams from Prelims advance to the Stage Finals.",
      "Finals include Visual Round, Rapid Fire, Code Snip debugging, and Negative-marking Buzzer Round.",
      "Any use of electronic devices or mobile phones will lead to immediate disqualification.",
      "In case of a tie, sudden-death tiebreaker questions will be posed."
    ],
    evaluationCriteria: [
      "Speed & Accuracy in Prelims",
      "Conceptual Clarity across CS/IT/Tech Disciplines",
      "Strategic Risk Management in Buzzer Rounds"
    ]
  },
  {
    id: "ipl-auction",
    title: "IPL Auction",
    category: "Non-Technical Event",
    type: "non-technical",
    shortDescription: "Experience the excitement of an IPL-style auction. Build your dream team, manage your budget and compete strategically.",
    fullDescription: "Step into the shoes of a franchise owner and chief strategist! Equipped with a virtual purse of ₹100 Crores, navigate dynamic bidding wars, balance player skill ratings, obey overseas caps, and construct the most formidable cricket lineup to conquer the trophy.",
    date: "September 30, 2026",
    time: "10:30 AM - 02:30 PM",
    venue: "Kalingarayan Seminar Hall",
    teamSize: "3 to 4 Members per Team",
    minTeamSize: 3,
    maxTeamSize: 4,
    supportsIndividual: false,
    supportsTeam: true,
    accentColor: "amber",
    badge: "Grand Strategy",
    isIplSpecial: true,
    budgetSystem: "₹100 Crore Virtual Purse | 15 Squad Slots",
    prize: "Winner Certificate + Participation Certificate",
    coordinator: {
      name: "Dr. K. Vishnuvardhan",
      designation: "Assistant Professor (SLG)",
      phone: "+91 93425 29462",
      email: "civista@college.edu"
    },
    rules: [
      "Each team consists of 3 to 4 members representing a franchise.",
      "Round 1: Cricket Aptitude & Strategy Qualifier (20 questions testing cricket analytics and IPL history).",
      "Top 8 qualifying teams participate in the Grand Live Bidding Room.",
      "Each franchise receives a virtual budget of ₹100 Crores to build a squad of 11 to 15 players.",
      "Squad must fulfill minimum squad balance rules: At least 3 Batsmen, 3 Bowlers, 2 All-Rounders, 1 Wicketkeeper, and max 4 Overseas players.",
      "Exceeding the purse or failing composition criteria attracts severe penalty points.",
      "Franchise with highest combined player rating points within valid budget wins."
    ],
    evaluationCriteria: [
      "Squad Balance & Composition Feasibility (40%)",
      "Overall Aggregated Player Rating (40%)",
      "Budget Efficiency & Remaining Purse Reserve (20%)"
    ]
  },
  {
    id: "build-the-bond",
    title: "Build the Bond",
    category: "Non-Technical Event",
    type: "non-technical",
    shortDescription: "An exciting team-building event designed to test communication, teamwork, coordination and trust.",
    fullDescription: "Ditch the screens and test pure team synergy! Build the Bond puts your squad through high-energy obstacle simulations, non-verbal blindfold navigation, puzzle-solving relay races, and structural engineering tasks where trust and communication make the ultimate difference.",
    date: "September 30, 2026",
    time: "02:30 PM - 04:45 PM",
    venue: "Kalingarayan Seminar Hall",
    teamSize: "2 to 4 Members per Team",
    minTeamSize: 2,
    maxTeamSize: 4,
    supportsIndividual: false,
    supportsTeam: true,
    accentColor: "emerald",
    badge: "Synergy & Fun",
    prize: "Winner Certificate + Participation Certificate",
    coordinator: {
      name: "Dr. K. Vishnuvardhan",
      designation: "Assistant Professor (SLG)",
      phone: "+91 93425 29462",
      email: "civista@college.edu"
    },
    rules: [
      "Team size must be between 2 and 4 members.",
      "Stage 1 - The Trust Walk: Blindfolded team navigation directed purely through single-word audible cues.",
      "Stage 2 - Spaghetti & Marshmallow Tower: Build the highest freestanding structural tower under 10 minutes.",
      "Stage 3 - Human Knot & Riddle Relay: Physical problem-solving under tight time countdowns.",
      "Teams must adhere to all safety guidelines and sportsmanship principles.",
      "Total cumulative time and challenge points decide the winning crew."
    ],
    evaluationCriteria: [
      "Coordination & Clear Communication (40%)",
      "Speed of Execution (30%)",
      "Creative Problem Solving (30%)"
    ]
  }
];

export const FEST_DETAILS = {
  name: "CIVISTA",
  year: "2026",
  tagline: "Where Ideas Meet Innovation, Competition Meets Fun",
  heroDescription: "Join CIVISTA, a vibrant college event bringing together technical knowledge, creativity, strategy and teamwork.",
  date: "September 30, 2026",
  dateISO: "2026-09-30T09:00:00",
  venue: "Kalingarayan Seminar Hall",
  stats: [
    { label: "Featured Events", value: "4 Events", sub: "Curated Excellence" },
    { label: "Categories", value: "Tech & Non-Tech", sub: "Balanced Spectrum" },
    { label: "Team Challenges", value: "High Energy", sub: "Synergy & Strategy" },
    { label: "Overall Experience", value: "One Exciting Day", sub: "Memories for Life" },
  ],
  whyParticipate: [
    {
      id: "learn",
      title: "Learn",
      tagline: "Gain knowledge and discover new ideas.",
      description: "Expand your technical repertoire, explore emerging industry standards, and gain constructive feedback from domain experts.",
      icon: "Lightbulb",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      id: "compete",
      title: "Compete",
      tagline: "Challenge yourself and demonstrate your skills.",
      description: "Go head-to-head with top talent from multiple colleges. Test your grit under real pressure and earn your winner certificate.",
      icon: "Trophy",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    },
    {
      id: "connect",
      title: "Connect",
      tagline: "Meet students from different departments and colleges.",
      description: "Build enduring professional networks, cross-discipline friendships, and connect with visionary student innovators and mentors.",
      icon: "Users2",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      id: "have-fun",
      title: "Have Fun",
      tagline: "Enjoy exciting technical and non-technical events.",
      description: "Immerse in high-octane auction battles, thrilling team obstacle games, vibrant campus atmosphere, and unforgettable moments.",
      icon: "PartyPopper",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    }
  ],
  contact: {
    staffCoordinator: {
      name: "Dr. K. Vishnuvardhan",
      designation: "Assistant Professor (SLG) & Faculty Coordinator, CIVISTA 2026",
      phone: "+91 93425 29462",
      email: "civista@college.edu"
    },
    studentPresident: {
      name: "Maheshkumar S",
      designation: "Student Coordinator, CEA",
      phone: "+91 93425 29462",
      email: "cea_official_kec@civista.org"
    },
    venueAddress: "Kalingarayan Seminar Hall, Kongu Engineering College, Perundurai, Erode - 638060",
    email: "civista@college.edu",
    phone: "+91 93425 29462 / +91 63690 74765"
  }
};
