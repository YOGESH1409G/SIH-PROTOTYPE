import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft, Search, TrendingUp, DollarSign, Users, Building, ArrowRight } from 'lucide-react';
import { User, careers, courses, Career, Course } from '@/lib/sampleData';

interface CareerExplorerProps {
  currentUser: User | null;
}

const CareerExplorer = ({ currentUser }: CareerExplorerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const industries = ['all', ...Array.from(new Set(careers.map(career => career.industry)))];
  
  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || career.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getRelatedCourses = (career: Career): Course[] => {
    return courses.filter(course => 
      career.requiredEducation.some(edu => 
        course.name.toLowerCase().includes(edu.toLowerCase()) ||
        course.degreeType.toLowerCase().includes(edu.toLowerCase())
      )
    );
  };

  const formatSalary = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to explore career opportunities
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Career Explorer</h1>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCareer ? (
          // Career Detail View
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCareer(null)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Career List
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Career Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                        <CardDescription className="text-lg mt-2">
                          {selectedCareer.industry}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {formatSalary(selectedCareer.salaryRange.min)} - {formatSalary(selectedCareer.salaryRange.max)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedCareer.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Career Path Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Career Path Journey</CardTitle>
                    <CardDescription>
                      Your journey from education to career success
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Education Phase */}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Education Requirements</h4>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {selectedCareer.requiredEducation.map((edu) => (
                              <Badge key={edu} variant="secondary">{edu}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Skills Phase */}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Key Skills to Develop</h4>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {selectedCareer.skills.map((skill) => (
                              <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Career Opportunities */}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Career Opportunities</h4>
                          <div className="mt-2 grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sm text-gray-700 mb-2">Government Sector</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {selectedCareer.governmentOpportunities.map((opp) => (
                                  <li key={opp}>• {opp}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm text-gray-700 mb-2">Private Sector</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {selectedCareer.privateOpportunities.map((opp) => (
                                  <li key={opp}>• {opp}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Courses</CardTitle>
                    <CardDescription>
                      Courses that can lead to this career
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {getRelatedCourses(selectedCareer).map((course) => (
                        <div key={course.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{course.name}</h4>
                            <Badge variant="outline">{course.duration} years</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{course.eligibility}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-1">
                              {course.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <span className="text-sm font-medium text-green-600">
                              Entry: {formatSalary(course.averageSalary.entry)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Career Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Salary Range</p>
                        <p className="text-xs text-gray-600">
                          {formatSalary(selectedCareer.salaryRange.min)} - {formatSalary(selectedCareer.salaryRange.max)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Growth Prospects</p>
                        <p className="text-xs text-gray-600">{selectedCareer.growthProspects}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Entrepreneurship</p>
                        <p className="text-xs text-gray-600">{selectedCareer.entrepreneurshipPotential}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/colleges">
                      <Button className="w-full" variant="outline">
                        Find Colleges
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/timeline">
                      <Button className="w-full" variant="outline">
                        Important Dates
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/assessment">
                      <Button className="w-full" variant="outline">
                        Retake Assessment
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // Career List View
          <div>
            {/* Search and Filter */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Career Opportunities</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search careers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry === 'all' ? 'All Industries' : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <p className="text-gray-600 mb-4">
                Showing {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
                {selectedIndustry !== 'all' && ` in ${selectedIndustry}`}
              </p>
            </div>

            {/* Career Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <Card 
                  key={career.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCareer(career)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {career.industry}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {career.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Salary Range</span>
                        <span className="font-semibold text-green-600">
                          {formatSalary(career.salaryRange.min)} - {formatSalary(career.salaryRange.max)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{career.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCareers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No careers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CareerExplorer;