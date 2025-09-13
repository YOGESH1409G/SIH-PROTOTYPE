// Sample data for Digital Guidance Platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  currentClass: string;
  state: string;
  district: string;
  interests: string[];
  assessmentResults?: AssessmentResult;
  createdAt: Date;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  personalityType: string;
  aptitudeScores: {
    logical: number;
    verbal: number;
    numerical: number;
    spatial: number;
    creative: number;
  };
  interestAreas: string[];
  recommendedStreams: string[];
  careerMatches: string[];
  completedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale' | 'ranking';
  options?: string[];
  category: 'personality' | 'aptitude' | 'interest';
  weight: number;
}

export interface College {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Aided';
  state: string;
  district: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  courses: string[];
  facilities: string[];
  admissionCriteria: {
    minimumPercentage: number;
    entranceExam?: string;
  };
  feeStructure: {
    tuitionFee: number;
    hostelFee?: number;
  };
  ranking?: number;
  accreditation: string;
  placementRate: number;
  photos: string[];
}

export interface Course {
  id: string;
  name: string;
  degreeType: string;
  stream: string;
  duration: number;
  eligibility: string;
  careerPaths: string[];
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  governmentExams: string[];
  skills: string[];
}

export interface Career {
  id: string;
  title: string;
  industry: string;
  description: string;
  requiredEducation: string[];
  skills: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  growthProspects: string;
  governmentOpportunities: string[];
  privateOpportunities: string[];
  entrepreneurshipPotential: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  category: 'admission' | 'scholarship' | 'exam' | 'counseling';
  startDate: Date;
  endDate: Date;
  state?: string;
  targetAudience: string[];
  isRecurring: boolean;
  sourceUrl?: string;
}

// Sample Assessment Questions
export const assessmentQuestions: Question[] = [
  // Personality Questions
  {
    id: 'p1',
    text: 'I enjoy working with people and helping them solve problems',
    type: 'scale',
    category: 'personality',
    weight: 1
  },
  {
    id: 'p2',
    text: 'I prefer working alone on detailed tasks',
    type: 'scale',
    category: 'personality',
    weight: 1
  },
  {
    id: 'p3',
    text: 'I like to take charge and lead group projects',
    type: 'scale',
    category: 'personality',
    weight: 1
  },
  {
    id: 'p4',
    text: 'I enjoy creative and artistic activities',
    type: 'scale',
    category: 'personality',
    weight: 1
  },
  {
    id: 'p5',
    text: 'I am comfortable with taking risks and trying new things',
    type: 'scale',
    category: 'personality',
    weight: 1
  },

  // Interest Questions
  {
    id: 'i1',
    text: 'Which subjects do you find most interesting?',
    type: 'multiple-choice',
    options: ['Mathematics', 'Science', 'Literature', 'History', 'Arts', 'Commerce', 'Technology'],
    category: 'interest',
    weight: 2
  },
  {
    id: 'i2',
    text: 'What type of activities do you enjoy most?',
    type: 'multiple-choice',
    options: ['Problem solving', 'Creative expression', 'Helping others', 'Research', 'Building things', 'Managing projects'],
    category: 'interest',
    weight: 2
  },
  {
    id: 'i3',
    text: 'Which work environment appeals to you?',
    type: 'multiple-choice',
    options: ['Office setting', 'Laboratory', 'Outdoors', 'Hospital/Clinic', 'School/College', 'Creative studio'],
    category: 'interest',
    weight: 1.5
  },

  // Aptitude Questions
  {
    id: 'a1',
    text: 'If 2x + 5 = 15, what is the value of x?',
    type: 'multiple-choice',
    options: ['5', '10', '7.5', '2.5'],
    category: 'aptitude',
    weight: 1
  },
  {
    id: 'a2',
    text: 'Which word is most similar to "Eloquent"?',
    type: 'multiple-choice',
    options: ['Articulate', 'Quiet', 'Confused', 'Simple'],
    category: 'aptitude',
    weight: 1
  },
  {
    id: 'a3',
    text: 'Complete the pattern: 2, 6, 18, 54, ?',
    type: 'multiple-choice',
    options: ['108', '162', '216', '270'],
    category: 'aptitude',
    weight: 1
  }
];

// Sample Colleges Data
export const colleges: College[] = [
  {
    id: 'c1',
    name: 'Government Arts College, Chennai',
    type: 'Government',
    state: 'Tamil Nadu',
    district: 'Chennai',
    city: 'Chennai',
    location: { lat: 13.0827, lng: 80.2707 },
    courses: ['B.A. English', 'B.A. History', 'B.A. Economics', 'B.Com', 'BBA'],
    facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel', 'Cafeteria'],
    admissionCriteria: {
      minimumPercentage: 60,
      entranceExam: 'State Board Merit'
    },
    feeStructure: {
      tuitionFee: 5000,
      hostelFee: 15000
    },
    ranking: 25,
    accreditation: 'NAAC A+',
    placementRate: 75,
    photos: ['/api/placeholder/400/300']
  },
  {
    id: 'c2',
    name: 'Government Science College, Bangalore',
    type: 'Government',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    city: 'Bangalore',
    location: { lat: 12.9716, lng: 77.5946 },
    courses: ['B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Computer Science', 'B.Tech'],
    facilities: ['Advanced Labs', 'Research Center', 'Library', 'Hostel', 'Sports Ground'],
    admissionCriteria: {
      minimumPercentage: 70,
      entranceExam: 'KCET'
    },
    feeStructure: {
      tuitionFee: 8000,
      hostelFee: 18000
    },
    ranking: 15,
    accreditation: 'NAAC A++',
    placementRate: 85,
    photos: ['/api/placeholder/400/300']
  },
  {
    id: 'c3',
    name: 'Government Commerce College, Mumbai',
    type: 'Government',
    state: 'Maharashtra',
    district: 'Mumbai',
    city: 'Mumbai',
    location: { lat: 19.0760, lng: 72.8777 },
    courses: ['B.Com', 'BBA', 'B.Com (Banking)', 'BMS', 'BAF'],
    facilities: ['Computer Lab', 'Library', 'Auditorium', 'Placement Cell', 'Cafeteria'],
    admissionCriteria: {
      minimumPercentage: 65,
      entranceExam: 'Merit Based'
    },
    feeStructure: {
      tuitionFee: 6000,
      hostelFee: 20000
    },
    ranking: 20,
    accreditation: 'NAAC A',
    placementRate: 80,
    photos: ['/api/placeholder/400/300']
  },
  {
    id: 'c4',
    name: 'Government Engineering College, Delhi',
    type: 'Government',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'New Delhi',
    location: { lat: 28.6139, lng: 77.2090 },
    courses: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech EEE'],
    facilities: ['State-of-art Labs', 'Research Centers', 'Library', 'Hostel', 'Sports Complex', 'Innovation Hub'],
    admissionCriteria: {
      minimumPercentage: 75,
      entranceExam: 'JEE Main'
    },
    feeStructure: {
      tuitionFee: 12000,
      hostelFee: 25000
    },
    ranking: 8,
    accreditation: 'NAAC A++',
    placementRate: 95,
    photos: ['/api/placeholder/400/300']
  },
  {
    id: 'c5',
    name: 'Government Medical College, Lucknow',
    type: 'Government',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    city: 'Lucknow',
    location: { lat: 26.8467, lng: 80.9462 },
    courses: ['MBBS', 'BDS', 'B.Sc. Nursing', 'B.Pharma', 'BAMS'],
    facilities: ['Hospital', 'Medical Labs', 'Library', 'Hostel', 'Research Center'],
    admissionCriteria: {
      minimumPercentage: 85,
      entranceExam: 'NEET'
    },
    feeStructure: {
      tuitionFee: 15000,
      hostelFee: 20000
    },
    ranking: 12,
    accreditation: 'MCI Approved',
    placementRate: 90,
    photos: ['/api/placeholder/400/300']
  }
];

// Sample Courses Data
export const courses: Course[] = [
  {
    id: 'course1',
    name: 'Bachelor of Arts (B.A.)',
    degreeType: 'Undergraduate',
    stream: 'Arts',
    duration: 3,
    eligibility: 'Class 12 pass in any stream',
    careerPaths: ['Civil Services', 'Teaching', 'Journalism', 'Social Work', 'Law'],
    averageSalary: {
      entry: 300000,
      mid: 600000,
      senior: 1200000
    },
    governmentExams: ['UPSC', 'SSC', 'State PSC', 'Banking Exams'],
    skills: ['Communication', 'Critical Thinking', 'Research', 'Writing']
  },
  {
    id: 'course2',
    name: 'Bachelor of Science (B.Sc.)',
    degreeType: 'Undergraduate',
    stream: 'Science',
    duration: 3,
    eligibility: 'Class 12 pass with Science subjects',
    careerPaths: ['Research', 'Teaching', 'Healthcare', 'Technology', 'Environmental Science'],
    averageSalary: {
      entry: 400000,
      mid: 800000,
      senior: 1500000
    },
    governmentExams: ['CSIR NET', 'GATE', 'Defense Services', 'Railway Exams'],
    skills: ['Analytical Thinking', 'Problem Solving', 'Laboratory Skills', 'Data Analysis']
  },
  {
    id: 'course3',
    name: 'Bachelor of Commerce (B.Com)',
    degreeType: 'Undergraduate',
    stream: 'Commerce',
    duration: 3,
    eligibility: 'Class 12 pass with Commerce/any stream',
    careerPaths: ['Accounting', 'Banking', 'Finance', 'Business Management', 'Taxation'],
    averageSalary: {
      entry: 350000,
      mid: 700000,
      senior: 1400000
    },
    governmentExams: ['Banking Exams', 'SSC', 'Income Tax Officer', 'Customs Officer'],
    skills: ['Financial Analysis', 'Accounting', 'Business Communication', 'Management']
  },
  {
    id: 'course4',
    name: 'Bachelor of Technology (B.Tech)',
    degreeType: 'Undergraduate',
    stream: 'Engineering',
    duration: 4,
    eligibility: 'Class 12 pass with PCM, JEE qualification',
    careerPaths: ['Software Development', 'Engineering', 'Research', 'Entrepreneurship', 'Consulting'],
    averageSalary: {
      entry: 600000,
      mid: 1200000,
      senior: 2500000
    },
    governmentExams: ['GATE', 'ESE', 'Defense Services', 'PSU Exams'],
    skills: ['Technical Skills', 'Problem Solving', 'Innovation', 'Project Management']
  },
  {
    id: 'course5',
    name: 'Bachelor of Medicine (MBBS)',
    degreeType: 'Undergraduate',
    stream: 'Medical',
    duration: 5.5,
    eligibility: 'Class 12 pass with PCB, NEET qualification',
    careerPaths: ['Doctor', 'Surgeon', 'Medical Research', 'Public Health', 'Medical Administration'],
    averageSalary: {
      entry: 800000,
      mid: 1500000,
      senior: 3000000
    },
    governmentExams: ['NEET PG', 'AIIMS PG', 'Medical Officer Exams'],
    skills: ['Medical Knowledge', 'Patient Care', 'Decision Making', 'Communication']
  }
];

// Sample Career Data
export const careers: Career[] = [
  {
    id: 'career1',
    title: 'Software Engineer',
    industry: 'Information Technology',
    description: 'Design, develop, and maintain software applications and systems',
    requiredEducation: ['B.Tech CSE', 'B.Sc. Computer Science', 'MCA'],
    skills: ['Programming', 'Problem Solving', 'System Design', 'Testing'],
    salaryRange: { min: 400000, max: 2000000 },
    growthProspects: 'Excellent - High demand in market',
    governmentOpportunities: ['ISRO', 'DRDO', 'NIC', 'Railways'],
    privateOpportunities: ['Tech Companies', 'Startups', 'Consulting', 'Product Companies'],
    entrepreneurshipPotential: 'High - Can start tech companies or freelance'
  },
  {
    id: 'career2',
    title: 'Civil Services Officer (IAS/IPS)',
    industry: 'Government Administration',
    description: 'Serve in administrative and policy-making roles in government',
    requiredEducation: ['Any Graduate Degree'],
    skills: ['Leadership', 'Public Administration', 'Communication', 'Decision Making'],
    salaryRange: { min: 800000, max: 2500000 },
    growthProspects: 'Excellent - Prestigious career with social impact',
    governmentOpportunities: ['IAS', 'IPS', 'IFS', 'State Services'],
    privateOpportunities: ['Policy Consulting', 'Think Tanks', 'International Organizations'],
    entrepreneurshipPotential: 'Medium - Can venture into social enterprises'
  },
  {
    id: 'career3',
    title: 'Doctor',
    industry: 'Healthcare',
    description: 'Diagnose and treat patients, promote health and wellness',
    requiredEducation: ['MBBS', 'MD/MS Specialization'],
    skills: ['Medical Knowledge', 'Patient Care', 'Diagnosis', 'Surgery'],
    salaryRange: { min: 600000, max: 5000000 },
    growthProspects: 'Excellent - Always in demand',
    governmentOpportunities: ['Government Hospitals', 'Medical Officer', 'Public Health'],
    privateOpportunities: ['Private Practice', 'Corporate Hospitals', 'Medical Research'],
    entrepreneurshipPotential: 'High - Can establish own practice or healthcare ventures'
  },
  {
    id: 'career4',
    title: 'Chartered Accountant',
    industry: 'Finance & Accounting',
    description: 'Provide financial advice, auditing, and taxation services',
    requiredEducation: ['B.Com', 'CA Course'],
    skills: ['Financial Analysis', 'Auditing', 'Taxation', 'Business Advisory'],
    salaryRange: { min: 500000, max: 3000000 },
    growthProspects: 'Very Good - Essential for businesses',
    governmentOpportunities: ['Income Tax Department', 'CAG', 'Finance Ministry'],
    privateOpportunities: ['CA Firms', 'Corporate Finance', 'Investment Banking'],
    entrepreneurshipPotential: 'High - Can start own CA practice or financial services'
  },
  {
    id: 'career5',
    title: 'Teacher/Professor',
    industry: 'Education',
    description: 'Educate and mentor students at various academic levels',
    requiredEducation: ['Subject Graduate', 'B.Ed', 'M.Ed/PhD for higher levels'],
    skills: ['Subject Expertise', 'Communication', 'Patience', 'Mentoring'],
    salaryRange: { min: 300000, max: 1500000 },
    growthProspects: 'Good - Stable career with social respect',
    governmentOpportunities: ['Government Schools', 'Colleges', 'Universities'],
    privateOpportunities: ['Private Schools', 'Coaching Centers', 'Online Education'],
    entrepreneurshipPotential: 'Medium - Can start educational institutions or content creation'
  }
];

// Sample Timeline Events
export const timelineEvents: TimelineEvent[] = [
  {
    id: 't1',
    title: 'NEET 2025 Application',
    description: 'National Eligibility cum Entrance Test for medical courses',
    category: 'exam',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-31'),
    targetAudience: ['Class 12', 'Medical Aspirants'],
    isRecurring: true,
    sourceUrl: 'https://neet.nta.nic.in'
  },
  {
    id: 't2',
    title: 'JEE Main 2025 Registration',
    description: 'Joint Entrance Examination for engineering courses',
    category: 'exam',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2024-11-30'),
    targetAudience: ['Class 12', 'Engineering Aspirants'],
    isRecurring: true,
    sourceUrl: 'https://jeemain.nta.nic.in'
  },
  {
    id: 't3',
    title: 'Delhi University Admissions',
    description: 'Undergraduate admissions for Delhi University colleges',
    category: 'admission',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-07-31'),
    state: 'Delhi',
    targetAudience: ['Class 12 Pass'],
    isRecurring: true,
    sourceUrl: 'https://du.ac.in'
  },
  {
    id: 't4',
    title: 'National Scholarship Portal',
    description: 'Various scholarships for students from different backgrounds',
    category: 'scholarship',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2025-01-31'),
    targetAudience: ['All Students'],
    isRecurring: true,
    sourceUrl: 'https://scholarships.gov.in'
  },
  {
    id: 't5',
    title: 'UPSC Civil Services Notification',
    description: 'Notification for Civil Services Examination',
    category: 'exam',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-15'),
    targetAudience: ['Graduates'],
    isRecurring: true,
    sourceUrl: 'https://upsc.gov.in'
  }
];

// Helper functions for recommendations
export const calculateAssessmentScore = (responses: Record<string, any>): AssessmentResult => {
  // Simple scoring algorithm - in real implementation, this would be more sophisticated
  const personalityScore = Math.random() * 100;
  const aptitudeScores = {
    logical: Math.random() * 100,
    verbal: Math.random() * 100,
    numerical: Math.random() * 100,
    spatial: Math.random() * 100,
    creative: Math.random() * 100
  };

  let personalityType = 'Analytical';
  let recommendedStreams = ['Science'];
  let careerMatches = ['Software Engineer'];

  // Determine personality type based on responses
  if (responses.p1 > 7) personalityType = 'Social';
  if (responses.p4 > 7) personalityType = 'Creative';
  if (responses.p3 > 7) personalityType = 'Leadership';

  // Recommend streams based on interests and aptitude
  if (responses.i1?.includes('Mathematics') || responses.i1?.includes('Science')) {
    recommendedStreams = ['Science', 'Engineering'];
    careerMatches = ['Software Engineer', 'Doctor', 'Engineer'];
  } else if (responses.i1?.includes('Commerce')) {
    recommendedStreams = ['Commerce'];
    careerMatches = ['Chartered Accountant', 'Business Manager'];
  } else if (responses.i1?.includes('Arts') || responses.i1?.includes('Literature')) {
    recommendedStreams = ['Arts', 'Humanities'];
    careerMatches = ['Teacher', 'Civil Services Officer', 'Journalist'];
  }

  return {
    id: `result_${Date.now()}`,
    userId: 'current_user',
    personalityType,
    aptitudeScores,
    interestAreas: responses.i1 || [],
    recommendedStreams,
    careerMatches,
    completedAt: new Date()
  };
};

export const getRecommendedColleges = (userState: string, stream: string): College[] => {
  return colleges.filter(college => 
    college.state === userState || 
    college.courses.some(course => course.toLowerCase().includes(stream.toLowerCase()))
  );
};

export const getRecommendedCourses = (assessmentResult: AssessmentResult): Course[] => {
  return courses.filter(course => 
    assessmentResult.recommendedStreams.some(stream => 
      course.stream.toLowerCase().includes(stream.toLowerCase())
    )
  );
};

export const getUpcomingEvents = (): TimelineEvent[] => {
  const now = new Date();
  return timelineEvents.filter(event => event.endDate > now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};