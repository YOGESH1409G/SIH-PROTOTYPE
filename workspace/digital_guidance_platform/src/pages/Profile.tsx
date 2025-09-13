import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowLeft, User, Edit, Save, Plus, X } from 'lucide-react';
import { User as UserType } from '@/lib/sampleData';

interface ProfileProps {
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
}

const Profile = ({ currentUser, onLogin }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    currentClass: '',
    state: '',
    district: '',
    interests: [] as string[],
    careerGoals: ''
  });
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditForm({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        currentClass: currentUser.currentClass,
        state: currentUser.state,
        district: currentUser.district,
        interests: currentUser.interests || [],
        careerGoals: ''
      });
    }
  }, [currentUser]);

  const handleSave = () => {
    if (currentUser) {
      const updatedUser: UserType = {
        ...currentUser,
        ...editForm
      };
      onLogin(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !editForm.interests.includes(newInterest.trim())) {
      setEditForm({
        ...editForm,
        interests: [...editForm.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setEditForm({
      ...editForm,
      interests: editForm.interests.filter(i => i !== interest)
    });
  };

  const getProfileCompleteness = () => {
    if (!currentUser) return 0;
    let completed = 0;
    const total = 6;

    if (currentUser.firstName && currentUser.lastName) completed++;
    if (currentUser.currentClass) completed++;
    if (currentUser.state && currentUser.district) completed++;
    if (currentUser.interests && currentUser.interests.length > 0) completed++;
    if (currentUser.assessmentResults) completed++;
    // Career goals would be another field
    
    return Math.round((completed / total) * 100);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to view your profile
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
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle>{currentUser.firstName} {currentUser.lastName}</CardTitle>
                <CardDescription>{currentUser.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-gray-600">{getProfileCompleteness()}%</span>
                    </div>
                    <Progress value={getProfileCompleteness()} className="h-2" />
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">{currentUser.currentClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{currentUser.district}, {currentUser.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member since:</span>
                      <span className="font-medium">{currentUser.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/assessment">
                  <Button className="w-full" variant="outline">
                    {currentUser.assessmentResults ? 'Retake Assessment' : 'Take Assessment'}
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button className="w-full" variant="outline">
                    Explore Careers
                  </Button>
                </Link>
                <Link to="/colleges">
                  <Button className="w-full" variant="outline">
                    Find Colleges
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Basic Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="currentClass">Current Class</Label>
                      <Select value={editForm.currentClass} onValueChange={(value) => setEditForm({...editForm, currentClass: value})}>
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={editForm.state} onValueChange={(value) => setEditForm({...editForm, state: value})}>
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
                          value={editForm.district}
                          onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                          placeholder="Enter district"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="careerGoals">Career Goals</Label>
                      <Textarea
                        id="careerGoals"
                        value={editForm.careerGoals}
                        onChange={(e) => setEditForm({...editForm, careerGoals: e.target.value})}
                        placeholder="Describe your career aspirations..."
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Name</Label>
                        <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Email</Label>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Current Class</Label>
                        <p className="font-medium">{currentUser.currentClass}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Location</Label>
                        <p className="font-medium">{currentUser.district}, {currentUser.state}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interests & Preferences</CardTitle>
                <CardDescription>
                  Add your interests to get better recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Current Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {(isEditing ? editForm.interests : currentUser.interests).map((interest) => (
                        <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                          {interest}
                          {isEditing && (
                            <button
                              onClick={() => removeInterest(interest)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                      {(isEditing ? editForm.interests : currentUser.interests).length === 0 && (
                        <p className="text-gray-500 text-sm">No interests added yet</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new interest..."
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      />
                      <Button onClick={addInterest} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Results */}
            {currentUser.assessmentResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                  <CardDescription>
                    Your latest aptitude assessment results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-600">Personality Type</Label>
                      <p className="font-medium text-lg text-blue-600">
                        {currentUser.assessmentResults.personalityType}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block">Recommended Streams</Label>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.assessmentResults.recommendedStreams.map((stream) => (
                          <Badge key={stream} variant="default">
                            {stream}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block">Career Matches</Label>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.assessmentResults.careerMatches.map((career) => (
                          <Badge key={career} variant="outline">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link to="/assessment">
                        <Button variant="outline">
                          Retake Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;