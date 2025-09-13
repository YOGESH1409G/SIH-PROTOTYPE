import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Calendar, TrendingUp, MapPin, Award, Bell, User } from 'lucide-react';
import { User as UserType, timelineEvents } from '@/lib/sampleData';

interface DashboardProps {
  currentUser: UserType | null;
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to access your dashboard
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

  // Get upcoming events from timeline
  const upcomingEvents = timelineEvents
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-400" />
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.firstName}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your academic journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assessment Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentUser.assessmentResults ? '85%' : 'Not Taken'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Career Matches</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentUser.assessmentResults ? currentUser.assessmentResults.careerMatches.length : '0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Colleges Saved</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Days to Exam</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Continue your journey with these recommended next steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/assessment">
                    <Button className="w-full h-auto p-4" variant={currentUser.assessmentResults ? "outline" : "default"}>
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                        <div className="font-semibold">
                          {currentUser.assessmentResults ? 'Retake Assessment' : 'Take Assessment'}
                        </div>
                        <div className="text-xs text-gray-600">Discover your strengths</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/careers">
                    <Button className="w-full h-auto p-4" variant="outline">
                      <div className="text-center">
                        <Award className="h-8 w-8 mx-auto mb-2" />
                        <div className="font-semibold">Explore Careers</div>
                        <div className="text-xs text-gray-600">Find your path</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/colleges">
                    <Button className="w-full h-auto p-4" variant="outline">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <div className="font-semibold">Find Colleges</div>
                        <div className="text-xs text-gray-600">Government institutions</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/timeline">
                    <Button className="w-full h-auto p-4" variant="outline">
                      <div className="text-center">
                        <Calendar className="h-8 w-8 mx-auto mb-2" />
                        <div className="font-semibold">Important Dates</div>
                        <div className="text-xs text-gray-600">Admission deadlines</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section */}
            {currentUser.assessmentResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    Based on your assessment results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Score</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Streams</h4>
                        <div className="space-y-2">
                          {currentUser.assessmentResults.recommendedStreams.map((stream, index) => (
                            <div key={stream} className="flex items-center justify-between">
                              <span className="text-sm">{stream}</span>
                              <Badge variant={index === 0 ? 'default' : 'secondary'}>
                                {index === 0 ? 'Best Match' : 'Good Match'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Career Matches</h4>
                        <div className="space-y-2">
                          {currentUser.assessmentResults.careerMatches.map((career, index) => (
                            <div key={career} className="flex items-center justify-between">
                              <span className="text-sm">{career}</span>
                              <Badge variant="outline">
                                {Math.round(90 - index * 5)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Important dates you shouldn't miss
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        event.type === 'exam' ? 'bg-red-100' :
                        event.type === 'admission' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        <Calendar className={`h-4 w-4 ${
                          event.type === 'exam' ? 'text-red-600' :
                          event.type === 'admission' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/timeline">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Dates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>
                  Complete your profile for better recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profile Completion</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Basic information completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Interests added</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span>Academic records pending</span>
                    </div>
                  </div>
                  
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="w-full">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;