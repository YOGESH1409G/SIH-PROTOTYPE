import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, User, GraduationCap, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { User as UserType, users } from '@/lib/sampleData';

interface IndexProps {
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
}

const Index = ({ currentUser, onLogin }: IndexProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-login for demo purposes
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && !currentUser) {
      try {
        const user = JSON.parse(savedUser);
        onLogin(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, [currentUser, onLogin]);

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simple demo login - find user by email or use first user
    let user = users.find(u => u.email === email);
    if (!user && email) {
      // Create a new user for demo
      user = {
        id: Date.now().toString(),
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        currentClass: 'Class 12',
        state: 'Tamil Nadu',
        district: 'Chennai',
        interests: ['Technology', 'Science'],
        createdAt: new Date()
      };
    } else if (!user) {
      user = users[0]; // Default to first user
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin(user);
    setIsLoading(false);
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Digital Guidance Platform</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {currentUser.firstName}!</span>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Success Starts Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your potential, explore career paths, and find the perfect government college 
              with our comprehensive guidance platform designed for Indian students.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link to="/assessment">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Take Assessment</CardTitle>
                  <CardDescription>
                    Discover your strengths and get personalized career recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    {currentUser.assessmentResults ? 'Retake Assessment' : 'Start Assessment'}
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/careers">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <GraduationCap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Explore Careers</CardTitle>
                  <CardDescription>
                    Browse detailed information about various career paths and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Browse Careers
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/colleges">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Find Colleges</CardTitle>
                  <CardDescription>
                    Search government colleges with detailed information and admission criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Search Colleges
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/timeline">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle>Important Dates</CardTitle>
                  <CardDescription>
                    Stay updated with admission deadlines, exam dates, and scholarship opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Timeline
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Study Resources</CardTitle>
                <CardDescription>
                  Access study materials, preparation guides, and educational resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Counseling Support</CardTitle>
                <CardDescription>
                  Get personalized guidance from education counselors and mentors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Recommendations */}
          {currentUser.assessmentResults && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your assessment results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Streams</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.assessmentResults.recommendedStreams.map((stream) => (
                        <span key={stream} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {stream}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Career Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.assessmentResults.careerMatches.map((career) => (
                        <span key={career} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Career Paths</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Government Colleges</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Scholarship Programs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Digital Guidance Platform</CardTitle>
            <CardDescription>
              Your comprehensive guide to career success and college admissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Get Started'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Quick Demo Access:</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEmail('student@example.com');
                  setTimeout(handleLogin, 100);
                }}
              >
                Try Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Aptitude Assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <span>Career Exploration</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span>College Directory</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>Important Dates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;