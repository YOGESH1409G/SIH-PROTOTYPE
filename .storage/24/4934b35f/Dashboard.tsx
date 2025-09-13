import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Calendar, TrendingUp, MapPin, Award, Bell, User } from 'lucide-react';
import { User as UserType, getUpcomingEvents, getRecommendedCourses } from '@/lib/sampleData';

interface DashboardProps {
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
}

const Dashboard = ({ currentUser, onLogin, onLogout }: DashboardProps) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    currentClass: '',
    state: '',
    district: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in real app, this would validate against backend
    const demoUser: UserType = {
      id: '1',
      email: loginForm.email,
      firstName: 'Demo',
      lastName: 'Student',
      currentClass: 'Class 12',
      state: 'Tamil Nadu',
      district: 'Chennai',
      interests: ['Technology', 'Science'],
      createdAt: new Date()
    };
    onLogin(demoUser);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserType = {
      id: Date.now().toString(),
      ...registerForm,
      interests: [],
      createdAt: new Date()
    };
    onLogin(newUser);
  };

  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const recommendedCourses = currentUser?.assessmentResults 
    ? getRecommendedCourses(currentUser.assessmentResults).slice(0, 3)
    : [];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Digital Guidance Platform</h1>
              </div>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to Your Account</DialogTitle>
                      <DialogDescription>
                        Enter your credentials to access your personalized dashboard
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Register</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Your Account</DialogTitle>
                      <DialogDescription>
                        Join thousands of students making informed career decisions
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={registerForm.firstName}
                            onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={registerForm.lastName}
                            onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentClass">Current Class</Label>
                        <Select onValueChange={(value) => setRegisterForm({...registerForm, currentClass: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Class 10">Class 10</SelectItem>
                            <SelectItem value="Class 11">Class 11</SelectItem>
                            <SelectItem value="Class 12">Class 12</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Select onValueChange={(value) => setRegisterForm({...registerForm, state: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="district">District</Label>
                          <Input
                            id="district"
                            value={registerForm.district}
                            onChange={(e) => setRegisterForm({...registerForm, district: e.target.value})}
                            placeholder="Enter district"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Personalized Career & Education Advisor
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the right subject stream, find government colleges, and explore career opportunities 
              tailored to your interests and aptitude.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Aptitude Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Take scientifically designed tests to discover your strengths and interests
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Find Government Colleges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore nearby government colleges with detailed information and admission criteria
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Career Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Visualize career paths and understand job opportunities for different courses
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Digital Guidance Platform</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-blue-600 font-medium">Dashboard</Link>
              <Link to="/assessment" className="text-gray-600 hover:text-blue-600">Assessment</Link>
              <Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link>
              <Link to="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
              <Link to="/timeline" className="text-gray-600 hover:text-blue-600">Timeline</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-600" />
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {currentUser.firstName}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.firstName}!
          </h2>
          <p className="text-gray-600">
            Continue your journey towards making informed educational decisions
          </p>
        </div>

        {/* Profile Completion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              Complete your profile to get better recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Progress value={currentUser.assessmentResults ? 80 : 40} className="flex-1" />
              <span className="text-sm font-medium">
                {currentUser.assessmentResults ? '80%' : '40%'}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant={currentUser.interests.length > 0 ? "default" : "secondary"}>
                Interests {currentUser.interests.length > 0 ? '✓' : ''}
              </Badge>
              <Badge variant={currentUser.assessmentResults ? "default" : "secondary"}>
                Assessment {currentUser.assessmentResults ? '✓' : ''}
              </Badge>
              <Badge variant="secondary">Career Goals</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/assessment">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Take Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Discover your strengths and interests
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/careers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Explore Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Visualize your career paths
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/colleges">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Find Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Search government colleges
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/timeline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Important Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Track admission deadlines
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recommendations and Updates */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recommended Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Based on your profile and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recommendedCourses.length > 0 ? (
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{course.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{course.stream} • {course.duration} years</p>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Take an assessment to get personalized recommendations</p>
                  <Link to="/assessment">
                    <Button>Start Assessment</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Important Dates</CardTitle>
              <CardDescription>
                Don't miss these deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge variant={event.category === 'exam' ? 'destructive' : 'default'}>
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-500">
                      Deadline: {event.endDate.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/timeline">
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;