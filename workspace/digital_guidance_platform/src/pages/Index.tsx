import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, User, GraduationCap, MapPin, Calendar, TrendingUp, Bell, Search, Menu, ChevronRight, Award, Users, Target, BarChart3 } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Modern Header with Glass Effect */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Digital Guidance Platform
                  </h1>
                  <p className="text-xs text-slate-500">Personalized Career Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 rounded-full px-3 py-1.5">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search careers, colleges..." 
                    className="bg-transparent text-sm outline-none w-48"
                  />
                </div>
                
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                
                <div className="flex items-center space-x-2 bg-white/60 rounded-full px-3 py-1.5 border border-slate-200/60">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {currentUser.firstName.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-slate-700">{currentUser.firstName}</p>
                    <p className="text-xs text-slate-500">{currentUser.currentClass}</p>
                  </div>
                  <Link to="/profile">
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section with Modern Cards */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back, {currentUser.firstName}! 👋
                </h2>
                <p className="text-slate-600 text-lg">
                  Continue your journey to academic and career success
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  Active Student
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {currentUser.currentClass}
                </Badge>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Assessment Score</p>
                      <p className="text-2xl font-bold">
                        {currentUser.assessmentResults ? '85%' : 'Not Taken'}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Career Matches</p>
                      <p className="text-2xl font-bold">
                        {currentUser.assessmentResults ? currentUser.assessmentResults.careerMatches.length : '0'}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Colleges Saved</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <MapPin className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Days to Exam</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assessment Section */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900">Aptitude Assessment</CardTitle>
                      <CardDescription className="text-slate-600">
                        Discover your strengths and get personalized recommendations
                      </CardDescription>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {currentUser.assessmentResults ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Overall Score</span>
                        <span className="text-sm font-bold text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between">
                        <Link to="/assessment">
                          <Button variant="outline" size="sm">Retake Assessment</Button>
                        </Link>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500">
                          View Results
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-slate-600 mb-4">Take your first assessment to get started</p>
                      <Link to="/assessment">
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                          Start Assessment
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/careers">
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Explore Careers</h3>
                          <p className="text-sm text-slate-600">50+ career paths</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/colleges">
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl group-hover:scale-110 transition-transform">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Find Colleges</h3>
                          <p className="text-sm text-slate-600">500+ institutions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/timeline">
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Important Dates</h3>
                          <p className="text-sm text-slate-600">Upcoming deadlines</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Progress Report</h3>
                        <p className="text-sm text-slate-600">Track your journey</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Personalized Recommendations */}
              {currentUser.assessmentResults && (
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Your Recommendations</CardTitle>
                    <CardDescription>Based on your assessment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Top Streams</h4>
                      <div className="space-y-2">
                        {currentUser.assessmentResults.recommendedStreams.slice(0, 3).map((stream, index) => (
                          <div key={stream} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">{stream}</span>
                            <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                              {index === 0 ? 'Best Match' : `${90 - index * 10}%`}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Assessment completed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">3 colleges bookmarked</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Profile updated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div>
                        <p className="font-medium text-red-900 text-sm">JEE Main Registration</p>
                        <p className="text-xs text-red-600">March 15, 2024</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <div>
                        <p className="font-medium text-orange-900 text-sm">NEET Application</p>
                        <p className="text-xs text-orange-600">March 20, 2024</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-700">10 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg w-fit">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Digital Guidance Platform
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Your comprehensive guide to career success and college admissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Get Started'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-3">Quick Demo Access:</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEmail('student@example.com');
                  setTimeout(handleLogin, 100);
                }}
                className="border-slate-300 hover:bg-slate-50"
              >
                Try Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Platform Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Aptitude Assessment</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Career Exploration</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">College Directory</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Important Dates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;