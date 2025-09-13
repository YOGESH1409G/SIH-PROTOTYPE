import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Award, Users } from 'lucide-react';
import { User, assessmentQuestions, calculateAssessmentScore, AssessmentResult } from '@/lib/sampleData';

interface AssessmentProps {
  currentUser: User | null;
}

const Assessment = ({ currentUser }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<AssessmentResult | null>(null);

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete assessment
      const assessmentResult = calculateAssessmentScore(responses);
      setResults(assessmentResult);
      setIsCompleted(true);
      
      // Save to localStorage
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          assessmentResults: assessmentResult
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentQ = assessmentQuestions[currentQuestion];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to take the assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
              </div>
              <Link to="/">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
            <p className="text-gray-600">
              Here are your personalized results and recommendations
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Personality Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Personality Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {results.personalityType}
                  </div>
                  <p className="text-gray-600">
                    {results.personalityType === 'Analytical' && 'You enjoy solving problems and working with data'}
                    {results.personalityType === 'Social' && 'You thrive when helping others and working in teams'}
                    {results.personalityType === 'Creative' && 'You excel in artistic and innovative environments'}
                    {results.personalityType === 'Leadership' && 'You naturally take charge and guide others'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aptitude Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Aptitude Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(results.aptitudeScores).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{skill}</span>
                        <span>{Math.round(score)}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recommended Streams */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Streams</CardTitle>
                <CardDescription>
                  Based on your interests and aptitude
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendedStreams.map((stream, index) => (
                    <div key={stream} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{stream}</h4>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? 'Best match' : 'Good match'} for your profile
                        </p>
                      </div>
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {index === 0 ? 'Top Choice' : 'Alternative'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Career Matches
                </CardTitle>
                <CardDescription>
                  Careers that align with your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.careerMatches.map((career, index) => (
                    <div key={career} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{career}</h4>
                        <p className="text-sm text-gray-600">
                          {Math.round(90 - index * 10)}% compatibility
                        </p>
                      </div>
                      <Badge variant="outline">
                        Match
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Continue your journey with these recommended actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/careers">
                  <Button className="w-full h-auto p-4" variant="outline">
                    <div className="text-center">
                      <Award className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Explore Careers</div>
                      <div className="text-xs text-gray-600">Detailed career information</div>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/colleges">
                  <Button className="w-full h-auto p-4" variant="outline">
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Find Colleges</div>
                      <div className="text-xs text-gray-600">Government college options</div>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/timeline">
                  <Button className="w-full h-auto p-4" variant="outline">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Important Dates</div>
                      <div className="text-xs text-gray-600">Admission deadlines</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Aptitude Assessment</h1>
            </div>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </h2>
            <Badge variant="outline">
              {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}% Complete</p>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.text}</CardTitle>
            {currentQ.category === 'aptitude' && (
              <CardDescription>
                Choose the best answer from the options below
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQ.type === 'multiple-choice' && currentQ.options && (
              <RadioGroup
                value={responses[currentQ.id] || ''}
                onValueChange={(value) => handleResponse(currentQ.id, value)}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                      <Label htmlFor={`${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentQ.type === 'scale' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Strongly Disagree</span>
                  <span>Neutral</span>
                  <span>Strongly Agree</span>
                </div>
                <Slider
                  value={[responses[currentQ.id] || 5]}
                  onValueChange={(value) => handleResponse(currentQ.id, value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="text-lg font-semibold">
                    {responses[currentQ.id] || 5}/10
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!responses[currentQ.id]}
          >
            {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {assessmentQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestion
                  ? 'bg-blue-600'
                  : responses[assessmentQuestions[index].id]
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Assessment;