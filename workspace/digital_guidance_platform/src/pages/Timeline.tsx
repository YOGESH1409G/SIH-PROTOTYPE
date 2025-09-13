import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, ArrowLeft, Calendar, Clock, Bell, ExternalLink, Filter } from 'lucide-react';
import { User, timelineEvents, TimelineEvent } from '@/lib/sampleData';

interface TimelineProps {
  currentUser: User | null;
}

const Timeline = ({ currentUser }: TimelineProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');

  const categories = ['all', 'admission', 'scholarship', 'exam', 'counseling'];
  const audiences = ['all', 'Class 10', 'Class 12', 'Graduates', 'All Students'];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesAudience = selectedAudience === 'all' || 
                           event.targetAudience.includes(selectedAudience) ||
                           event.targetAudience.includes('All Students');
    return matchesCategory && matchesAudience;
  }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEventStatus = (event: TimelineEvent) => {
    const now = new Date();
    if (now < event.startDate) return 'upcoming';
    if (now >= event.startDate && now <= event.endDate) return 'active';
    return 'expired';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'admission': return 'bg-blue-100 text-blue-800';
      case 'scholarship': return 'bg-green-100 text-green-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'counseling': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'border-blue-200 bg-blue-50';
      case 'active': return 'border-green-200 bg-green-50';
      case 'expired': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to view important timeline events
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
              <h1 className="text-2xl font-bold text-gray-900">Important Timeline</h1>
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
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Important Dates & Deadlines</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with admission deadlines, exam dates, and scholarship opportunities
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAudience} onValueChange={setSelectedAudience}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience === 'all' ? 'All Students' : audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Timeline Events */}
        <div className="space-y-6">
          {filteredEvents.map((event, index) => {
            const status = getEventStatus(event);
            const daysUntil = getDaysUntil(event.startDate);
            
            return (
              <Card 
                key={event.id} 
                className={`${getStatusColor(status)} border-l-4 ${
                  status === 'active' ? 'border-l-green-500' : 
                  status === 'upcoming' ? 'border-l-blue-500' : 'border-l-gray-400'
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                        {status === 'active' && (
                          <Badge variant="default" className="bg-green-600">
                            Active Now
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {event.description}
                      </CardDescription>
                    </div>
                    
                    <div className="text-right ml-4">
                      {status === 'upcoming' && daysUntil > 0 && (
                        <div className="text-sm font-semibold text-blue-600 mb-1">
                          {daysUntil} day{daysUntil !== 1 ? 's' : ''} left
                        </div>
                      )}
                      {status === 'active' && (
                        <div className="text-sm font-semibold text-green-600 mb-1">
                          Ongoing
                        </div>
                      )}
                      {status === 'expired' && (
                        <div className="text-sm font-semibold text-gray-500 mb-1">
                          Expired
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">
                          <strong>Start:</strong> {formatDate(event.startDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">
                          <strong>Deadline:</strong> {formatDate(event.endDate)}
                        </span>
                      </div>
                      
                      {event.state && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {event.state}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Target Audience:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {event.targetAudience.map((audience) => (
                            <Badge key={audience} variant="secondary" className="text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {event.sourceUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Official Link
                            </a>
                          </Button>
                        )}
                        
                        <Button size="sm" variant="outline">
                          <Bell className="h-4 w-4 mr-1" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more events
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Timeline Summary</CardTitle>
            <CardDescription>
              Overview of upcoming events and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {timelineEvents.filter(e => getEventStatus(e) === 'upcoming').length}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {timelineEvents.filter(e => getEventStatus(e) === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active Now</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {timelineEvents.filter(e => e.category === 'scholarship').length}
                </div>
                <div className="text-sm text-gray-600">Scholarships</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {timelineEvents.filter(e => e.category === 'exam').length}
                </div>
                <div className="text-sm text-gray-600">Exams</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Timeline;