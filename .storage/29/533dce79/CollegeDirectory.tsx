import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, ArrowLeft, Search, MapPin, Star, Users, Building, Phone, Globe, Filter } from 'lucide-react';
import { User, colleges, College } from '@/lib/sampleData';

interface CollegeDirectoryProps {
  currentUser: User | null;
}

const CollegeDirectory = ({ currentUser }: CollegeDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const states = ['all', ...Array.from(new Set(colleges.map(college => college.state)))];
  const types = ['all', 'Government', 'Private', 'Aided'];
  const streams = ['all', 'Arts', 'Science', 'Commerce', 'Engineering', 'Medical'];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || college.state === selectedState;
    const matchesType = selectedType === 'all' || college.type === selectedType;
    const matchesStream = selectedStream === 'all' || 
                         college.courses.some(course => 
                           course.toLowerCase().includes(selectedStream.toLowerCase())
                         );
    return matchesSearch && matchesState && matchesType && matchesStream;
  });

  const formatFee = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const calculateDistance = (college: College): string => {
    // Mock distance calculation - in real app, would use geolocation
    return `${Math.floor(Math.random() * 50) + 5} km`;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to explore college directory
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
              <h1 className="text-2xl font-bold text-gray-900">College Directory</h1>
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
        {selectedCollege ? (
          // College Detail View
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCollege(null)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to College List
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* College Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedCollege.name}</CardTitle>
                        <CardDescription className="text-lg mt-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedCollege.city}, {selectedCollege.state}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant={selectedCollege.type === 'Government' ? 'default' : 'secondary'}>
                          {selectedCollege.type}
                        </Badge>
                        {selectedCollege.ranking && (
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">Rank #{selectedCollege.ranking}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Key Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Accreditation:</span>
                            <span className="font-medium">{selectedCollege.accreditation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Placement Rate:</span>
                            <span className="font-medium text-green-600">{selectedCollege.placementRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-medium">{calculateDistance(selectedCollege)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Fee Structure</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tuition Fee:</span>
                            <span className="font-medium">{formatFee(selectedCollege.feeStructure.tuitionFee)}/year</span>
                          </div>
                          {selectedCollege.feeStructure.hostelFee && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hostel Fee:</span>
                              <span className="font-medium">{formatFee(selectedCollege.feeStructure.hostelFee)}/year</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600 font-medium">Total (approx):</span>
                            <span className="font-semibold text-blue-600">
                              {formatFee(selectedCollege.feeStructure.tuitionFee + (selectedCollege.feeStructure.hostelFee || 0))}/year
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Courses Offered */}
                <Card>
                  <CardHeader>
                    <CardTitle>Courses Offered</CardTitle>
                    <CardDescription>
                      Available degree programs at this college
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedCollege.courses.map((course, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <h4 className="font-semibold">{course}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-xs">
                              {course.includes('B.') ? 'Undergraduate' : 'Postgraduate'}
                            </Badge>
                            <span className="text-xs text-gray-600">
                              Min: {selectedCollege.admissionCriteria.minimumPercentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Facilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Facilities & Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-3">
                      {selectedCollege.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                          <Building className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact College
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">College Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Placement Rate</span>
                      <span className="font-semibold text-green-600">{selectedCollege.placementRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Courses</span>
                      <span className="font-semibold">{selectedCollege.courses.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Type</span>
                      <Badge variant="outline">{selectedCollege.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // College List View
          <div>
            {/* Search and Filter */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Government Colleges</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state === 'all' ? 'All States' : state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="College type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream === 'all' ? 'All Streams' : stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <p className="text-gray-600 mb-4">
                Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
                {selectedState !== 'all' && ` in ${selectedState}`}
              </p>
            </div>

            {/* College Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <Card 
                  key={college.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCollege(college)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{college.name}</CardTitle>
                      <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                        {college.type}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.city}, {college.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Annual Fee</span>
                        <span className="font-semibold text-green-600">
                          {formatFee(college.feeStructure.tuitionFee)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Placement Rate</span>
                        <span className="font-semibold">{college.placementRate}%</span>
                      </div>

                      {college.ranking && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Ranking</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-semibold">#{college.ranking}</span>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Courses ({college.courses.length}):</p>
                        <div className="flex flex-wrap gap-1">
                          {college.courses.slice(0, 2).map((course) => (
                            <Badge key={course} variant="outline" className="text-xs">
                              {course.split(' ')[0]}
                            </Badge>
                          ))}
                          {college.courses.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{college.courses.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No colleges found</h3>
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

export default CollegeDirectory;