// Mock data for the Digital Guidance Platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  currentClass: string;
  state: string;
  district: string;
  interests: string[];
  createdAt: Date;
  assessmentResults?: AssessmentResult;
}

export interface AssessmentResult {
  personalityType: string;
  aptitudeScores: Record<string, number>;
  recommendedStreams: string[];
  careerMatches: string[];
  completedAt: Date;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale';
  category: 'personality' | 'aptitude' | 'interests';
  options?: string[];
}

export interface Career {
  id: string;
  title: string;
  description: string;
  industry: string;
  requiredEducation: string[];
  skills: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  growthProspects: string;
  entrepreneurshipPotential: string;
  governmentOpportunities: string[];
  privateOpportunities: string[];
}

export interface Course {
  id: string;
  name: string;
  degreeType: string;
  duration: number;
  eligibility: string;
  skills: string[];
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  jobProspects: string[];
}

export interface College {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Aided';
  city: string;
  state: string;
  courses: string[];
  feeStructure: {
    tuitionFee: number;
    hostelFee?: number;
  };
  facilities: string[];
  accreditation: string;
  ranking?: number;
  placementRate: number;
  admissionCriteria: {
    minimumPercentage: number;
    entranceExam?: string;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  category: 'admission' | 'scholarship' | 'exam' | 'counseling';
  startDate: Date;
  endDate: Date;
  targetAudience: string[];
  state?: string;
  sourceUrl?: string;
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    firstName: 'Rahul',
    lastName: 'Kumar',
    currentClass: 'Class 12',
    state: 'Tamil Nadu',
    district: 'Chennai',
    interests: ['Technology', 'Mathematics', 'Science'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'priya@example.com',
    firstName: 'Priya',
    lastName: 'Sharma',
    currentClass: 'Class 11',
    state: 'Karnataka',
    district: 'Bangalore',
    interests: ['Arts', 'Literature', 'History'],
    createdAt: new Date('2024-02-10')
  }
];

// Assessment Questions
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    text: 'I enjoy solving complex mathematical problems',
    type: 'scale',
    category: 'interests'
  },
  {
    id: 'q2',
    text: 'What is 15% of 240?',
    type: 'multiple-choice',
    category: 'aptitude',
    options: ['36', '40', '32', '38']
  },
  {
    id: 'q3',
    text: 'I prefer working in teams rather than alone',
    type: 'scale',
    category: 'personality'
  },
  {
    id: 'q4',
    text: 'If a train travels 120 km in 2 hours, what is its speed?',
    type: 'multiple-choice',
    category: 'aptitude',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h']
  },
  {
    id: 'q5',
    text: 'I enjoy creative activities like drawing or writing',
    type: 'scale',
    category: 'interests'
  },
  {
    id: 'q6',
    text: 'I am comfortable taking leadership roles',
    type: 'scale',
    category: 'personality'
  },
  {
    id: 'q7',
    text: 'Which of the following is a renewable source of energy?',
    type: 'multiple-choice',
    category: 'aptitude',
    options: ['Coal', 'Solar', 'Natural Gas', 'Petroleum']
  },
  {
    id: 'q8',
    text: 'I enjoy helping others solve their problems',
    type: 'scale',
    category: 'personality'
  },
  {
    id: 'q9',
    text: 'I am interested in understanding how things work',
    type: 'scale',
    category: 'interests'
  },
  {
    id: 'q10',
    text: 'What is the capital of Australia?',
    type: 'multiple-choice',
    category: 'aptitude',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth']
  }
];

// Careers Data
export const careers: Career[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems',
    industry: 'Technology',
    requiredEducation: ['B.Tech Computer Science', 'B.Sc Computer Science', 'BCA'],
    skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Mathematics'],
    salaryRange: { min: 400000, max: 1500000 },
    growthProspects: 'Excellent',
    entrepreneurshipPotential: 'High',
    governmentOpportunities: ['ISRO', 'DRDO', 'NIC', 'C-DAC'],
    privateOpportunities: ['TCS', 'Infosys', 'Google', 'Microsoft', 'Amazon']
  },
  {
    id: '2',
    title: 'Doctor (MBBS)',
    description: 'Diagnose and treat patients, promote health and prevent diseases',
    industry: 'Healthcare',
    requiredEducation: ['MBBS', 'MD', 'MS'],
    skills: ['Medical Knowledge', 'Communication', 'Empathy', 'Critical Thinking'],
    salaryRange: { min: 600000, max: 2000000 },
    growthProspects: 'Excellent',
    entrepreneurshipPotential: 'High',
    governmentOpportunities: ['AIIMS', 'Government Hospitals', 'Health Ministry'],
    privateOpportunities: ['Private Hospitals', 'Clinics', 'Healthcare Startups']
  },
  {
    id: '3',
    title: 'Civil Engineer',
    description: 'Design and oversee construction of infrastructure projects',
    industry: 'Engineering',
    requiredEducation: ['B.Tech Civil Engineering', 'B.E Civil Engineering'],
    skills: ['Technical Drawing', 'Project Management', 'Mathematics', 'Problem Solving'],
    salaryRange: { min: 350000, max: 1200000 },
    growthProspects: 'Good',
    entrepreneurshipPotential: 'Medium',
    governmentOpportunities: ['PWD', 'Railways', 'CPWD', 'State Engineering Services'],
    privateOpportunities: ['L&T', 'Tata Projects', 'Construction Companies']
  },
  {
    id: '4',
    title: 'Teacher',
    description: 'Educate students and help them develop knowledge and skills',
    industry: 'Education',
    requiredEducation: ['B.Ed', 'M.Ed', 'Subject Graduation'],
    skills: ['Communication', 'Patience', 'Subject Knowledge', 'Leadership'],
    salaryRange: { min: 250000, max: 800000 },
    growthProspects: 'Stable',
    entrepreneurshipPotential: 'Medium',
    governmentOpportunities: ['Government Schools', 'Universities', 'Education Department'],
    privateOpportunities: ['Private Schools', 'Coaching Centers', 'EdTech Companies']
  },
  {
    id: '5',
    title: 'Chartered Accountant',
    description: 'Manage financial records, auditing, and taxation for businesses',
    industry: 'Finance',
    requiredEducation: ['CA', 'B.Com', 'CPA'],
    skills: ['Accounting', 'Financial Analysis', 'Attention to Detail', 'Mathematics'],
    salaryRange: { min: 500000, max: 1800000 },
    growthProspects: 'Excellent',
    entrepreneurshipPotential: 'High',
    governmentOpportunities: ['Income Tax Department', 'CAG', 'Finance Ministry'],
    privateOpportunities: ['Big 4 Firms', 'Banks', 'Corporate Finance', 'Consulting']
  }
];

// Courses Data
export const courses: Course[] = [
  {
    id: '1',
    name: 'B.Tech Computer Science Engineering',
    degreeType: 'Undergraduate',
    duration: 4,
    eligibility: '12th with PCM, minimum 75% marks',
    skills: ['Programming', 'Data Structures', 'Algorithms', 'Software Development'],
    averageSalary: { entry: 500000, mid: 1200000, senior: 2500000 },
    jobProspects: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Tech Lead']
  },
  {
    id: '2',
    name: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    degreeType: 'Undergraduate',
    duration: 5.5,
    eligibility: '12th with PCB, NEET qualification',
    skills: ['Medical Knowledge', 'Patient Care', 'Diagnosis', 'Surgery'],
    averageSalary: { entry: 600000, mid: 1500000, senior: 3000000 },
    jobProspects: ['Doctor', 'Surgeon', 'Medical Officer', 'Specialist']
  },
  {
    id: '3',
    name: 'B.Com (Bachelor of Commerce)',
    degreeType: 'Undergraduate',
    duration: 3,
    eligibility: '12th pass, preferably Commerce stream',
    skills: ['Accounting', 'Finance', 'Business Management', 'Economics'],
    averageSalary: { entry: 300000, mid: 800000, senior: 1500000 },
    jobProspects: ['Accountant', 'Financial Analyst', 'Bank Officer', 'Tax Consultant']
  },
  {
    id: '4',
    name: 'B.A English Literature',
    degreeType: 'Undergraduate',
    duration: 3,
    eligibility: '12th pass from any stream',
    skills: ['Writing', 'Communication', 'Critical Analysis', 'Research'],
    averageSalary: { entry: 250000, mid: 600000, senior: 1200000 },
    jobProspects: ['Content Writer', 'Journalist', 'Teacher', 'Editor']
  },
  {
    id: '5',
    name: 'B.Sc Physics',
    degreeType: 'Undergraduate',
    duration: 3,
    eligibility: '12th with PCM, minimum 60% marks',
    skills: ['Scientific Research', 'Mathematical Analysis', 'Laboratory Skills', 'Problem Solving'],
    averageSalary: { entry: 350000, mid: 800000, senior: 1600000 },
    jobProspects: ['Research Scientist', 'Lab Technician', 'Physics Teacher', 'Quality Analyst']
  }
];

// Colleges Data
export const colleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    type: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    courses: ['B.Tech CSE', 'B.Tech EE', 'B.Tech ME', 'M.Tech', 'PhD'],
    feeStructure: { tuitionFee: 200000, hostelFee: 50000 },
    facilities: ['Library', 'Hostels', 'Labs', 'Sports Complex', 'WiFi'],
    accreditation: 'NAAC A++',
    ranking: 1,
    placementRate: 95,
    admissionCriteria: { minimumPercentage: 75, entranceExam: 'JEE Advanced' }
  },
  {
    id: '2',
    name: 'All India Institute of Medical Sciences Delhi',
    type: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    courses: ['MBBS', 'MD', 'MS', 'B.Sc Nursing', 'PhD'],
    feeStructure: { tuitionFee: 5000, hostelFee: 30000 },
    facilities: ['Hospital', 'Library', 'Hostels', 'Research Labs', 'Cafeteria'],
    accreditation: 'NAAC A++',
    ranking: 1,
    placementRate: 100,
    admissionCriteria: { minimumPercentage: 60, entranceExam: 'NEET' }
  },
  {
    id: '3',
    name: 'Lady Shri Ram College for Women',
    type: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    courses: ['B.A Economics', 'B.A English', 'B.Com', 'B.Sc Mathematics'],
    feeStructure: { tuitionFee: 15000 },
    facilities: ['Library', 'Auditorium', 'Computer Lab', 'Sports', 'Canteen'],
    accreditation: 'NAAC A+',
    ranking: 2,
    placementRate: 85,
    admissionCriteria: { minimumPercentage: 85, entranceExam: 'CUET' }
  },
  {
    id: '4',
    name: 'Anna University',
    type: 'Government',
    city: 'Chennai',
    state: 'Tamil Nadu',
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'PhD'],
    feeStructure: { tuitionFee: 50000, hostelFee: 25000 },
    facilities: ['Central Library', 'Hostels', 'Labs', 'Placement Cell', 'Sports'],
    accreditation: 'NAAC A',
    ranking: 15,
    placementRate: 80,
    admissionCriteria: { minimumPercentage: 70, entranceExam: 'TNEA' }
  },
  {
    id: '5',
    name: 'Bangalore University',
    type: 'Government',
    city: 'Bangalore',
    state: 'Karnataka',
    courses: ['B.A', 'B.Sc', 'B.Com', 'M.A', 'M.Sc', 'PhD'],
    feeStructure: { tuitionFee: 30000 },
    facilities: ['Library', 'Computer Center', 'Auditorium', 'Sports', 'Cafeteria'],
    accreditation: 'NAAC A',
    ranking: 25,
    placementRate: 70,
    admissionCriteria: { minimumPercentage: 60 }
  }
];

// Timeline Events Data
export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'JEE Main 2024 Registration',
    description: 'Registration for Joint Entrance Examination Main for admission to NITs, IIITs, and other engineering colleges',
    category: 'exam',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-31'),
    targetAudience: ['Class 12', 'Graduates'],
    sourceUrl: 'https://jeemain.nta.nic.in'
  },
  {
    id: '2',
    title: 'NEET 2024 Application',
    description: 'National Eligibility cum Entrance Test for admission to medical colleges across India',
    category: 'exam',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-15'),
    targetAudience: ['Class 12', 'Graduates'],
    sourceUrl: 'https://neet.nta.nic.in'
  },
  {
    id: '3',
    title: 'CUET UG 2024 Registration',
    description: 'Common University Entrance Test for admission to central universities',
    category: 'exam',
    startDate: new Date('2024-11-20'),
    endDate: new Date('2024-12-20'),
    targetAudience: ['Class 12'],
    sourceUrl: 'https://cuet.samarth.ac.in'
  },
  {
    id: '4',
    title: 'National Scholarship Portal',
    description: 'Application for various government scholarships for students',
    category: 'scholarship',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2025-01-31'),
    targetAudience: ['Class 10', 'Class 12', 'Graduates'],
    sourceUrl: 'https://scholarships.gov.in'
  },
  {
    id: '5',
    title: 'Delhi University Admission',
    description: 'Admission process for undergraduate courses in Delhi University',
    category: 'admission',
    startDate: new Date('2024-05-15'),
    endDate: new Date('2024-07-31'),
    targetAudience: ['Class 12'],
    state: 'Delhi',
    sourceUrl: 'https://du.ac.in'
  },
  {
    id: '6',
    title: 'IIT Counselling Process',
    description: 'Joint Seat Allocation Authority counselling for IIT admissions',
    category: 'counseling',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-15'),
    targetAudience: ['Class 12'],
    sourceUrl: 'https://josaa.nic.in'
  },
  {
    id: '7',
    title: 'State Engineering Entrance',
    description: 'State-level engineering entrance examinations and counselling',
    category: 'exam',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-06-30'),
    targetAudience: ['Class 12'],
    state: 'Tamil Nadu'
  },
  {
    id: '8',
    title: 'Merit Scholarship for Girls',
    description: 'Special scholarship program for meritorious girl students',
    category: 'scholarship',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-11-30'),
    targetAudience: ['Class 10', 'Class 12'],
    sourceUrl: 'https://scholarships.gov.in'
  }
];

// Assessment scoring function
export const calculateAssessmentScore = (responses: Record<string, string | number>): AssessmentResult => {
  const aptitudeQuestions = assessmentQuestions.filter(q => q.category === 'aptitude');
  const personalityQuestions = assessmentQuestions.filter(q => q.category === 'personality');
  const interestQuestions = assessmentQuestions.filter(q => q.category === 'interests');

  // Calculate aptitude scores
  let mathScore = 0;
  let scienceScore = 0;
  let logicalScore = 0;

  aptitudeQuestions.forEach(q => {
    const response = responses[q.id];
    if (q.options && typeof response === 'string') {
      // Check if answer is correct (simplified logic)
      const correctAnswers: Record<string, string> = {
        'q2': '36', // 15% of 240
        'q4': '60 km/h', // 120km in 2 hours
        'q7': 'Solar', // renewable energy
        'q10': 'Canberra' // capital of Australia
      };
      
      if (correctAnswers[q.id] === response) {
        if (q.id === 'q2' || q.id === 'q4') mathScore += 25;
        if (q.id === 'q7') scienceScore += 25;
        if (q.id === 'q10') logicalScore += 25;
      }
    }
  });

  // Calculate personality type based on responses
  let analyticalScore = 0;
  let socialScore = 0;
  let creativeScore = 0;
  let leadershipScore = 0;

  personalityQuestions.forEach(q => {
    const response = responses[q.id];
    if (typeof response === 'number') {
      if (q.id === 'q3') socialScore += response;
      if (q.id === 'q6') leadershipScore += response;
      if (q.id === 'q8') socialScore += response;
    }
  });

  interestQuestions.forEach(q => {
    const response = responses[q.id];
    if (typeof response === 'number') {
      if (q.id === 'q1') analyticalScore += response;
      if (q.id === 'q5') creativeScore += response;
      if (q.id === 'q9') analyticalScore += response;
    }
  });

  // Determine personality type
  const scores = { analyticalScore, socialScore, creativeScore, leadershipScore };
  const maxScore = Math.max(...Object.values(scores));
  let personalityType = 'Balanced';
  
  if (maxScore === analyticalScore) personalityType = 'Analytical';
  else if (maxScore === socialScore) personalityType = 'Social';
  else if (maxScore === creativeScore) personalityType = 'Creative';
  else if (maxScore === leadershipScore) personalityType = 'Leadership';

  // Recommend streams based on scores
  const recommendedStreams: string[] = [];
  if (mathScore >= 50 || analyticalScore >= 15) recommendedStreams.push('Engineering', 'Computer Science');
  if (scienceScore >= 25) recommendedStreams.push('Medical', 'Pure Sciences');
  if (socialScore >= 15) recommendedStreams.push('Arts', 'Social Sciences');
  if (creativeScore >= 15) recommendedStreams.push('Fine Arts', 'Design');
  if (recommendedStreams.length === 0) recommendedStreams.push('Commerce', 'General Studies');

  // Career matches based on personality and aptitude
  const careerMatches: string[] = [];
  if (personalityType === 'Analytical') careerMatches.push('Software Engineer', 'Data Scientist', 'Research Scientist');
  if (personalityType === 'Social') careerMatches.push('Teacher', 'Doctor', 'Social Worker');
  if (personalityType === 'Creative') careerMatches.push('Designer', 'Writer', 'Artist');
  if (personalityType === 'Leadership') careerMatches.push('Manager', 'Entrepreneur', 'Civil Services');

  return {
    personalityType,
    aptitudeScores: {
      mathematics: mathScore,
      science: scienceScore,
      logical: logicalScore,
      verbal: 70, // Mock score
      spatial: 65 // Mock score
    },
    recommendedStreams: recommendedStreams.slice(0, 3),
    careerMatches: careerMatches.slice(0, 4),
    completedAt: new Date()
  };
};