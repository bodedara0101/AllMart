import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Copy, Check, Search, Filter } from 'lucide-react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: 'Product Design Review',
      host: 'Sarah Chen',
      time: '2:00 PM',
      date: 'Dec 12, 2025',
      participants: 8,
      maxParticipants: 15,
      status: 'upcoming',
      code: 'ABC-123'
    },
    {
      id: '2',
      title: 'Weekly Team Sync',
      host: 'Michael Ross',
      time: '10:00 AM',
      date: 'Dec 13, 2025',
      participants: 12,
      maxParticipants: 20,
      status: 'upcoming',
      code: 'XYZ-789'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    maxParticipants: 10
  });

  const [joinCode, setJoinCode] = useState('');

  const generateMeetingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part1 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${part1}-${part2}`;
  };

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    const meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      host: 'You',
      time: newMeeting.time,
      date: newMeeting.date,
      participants: 1,
      maxParticipants: newMeeting.maxParticipants,
      status: 'upcoming',
      code: generateMeetingCode()
    };
    setMeetings([meeting, ...meetings]);
    setShowCreateModal(false);
    setNewMeeting({ title: '', date: '', time: '', maxParticipants: 10 });
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    const meeting = meetings.find(m => m.code === joinCode.toUpperCase());
    if (meeting && meeting.participants < meeting.maxParticipants) {
      setMeetings(meetings.map(m => 
        m.id === meeting.id 
          ? {...m, participants: m.participants + 1}
          : m
      ));
      setShowJoinModal(false);
      setJoinCode('');
      alert(`Successfully joined: ${meeting.title}`);
    } else if (!meeting) {
      alert('Meeting code not found!');
    } else {
      alert('Meeting is full!');
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || meeting.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-2xl font-bold text-black">
                Meetings
              </h1>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                title={'Join Meeting'}
                onClick={() => setShowJoinModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-2.5 border-2 border-blue-600 text-blue-600 rounded-xl text-sm sm:text-base font-medium hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden xs:inline">Join</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="all">All Meetings</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live Now</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
            >
              <div className="bg-blue-600 h-2"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex-1 line-clamp-2">
                    {meeting.title}
                  </h3>
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                    {meeting.status}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{meeting.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{meeting.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {meeting.participants}/{meeting.maxParticipants} participants
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">Code:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs sm:text-sm font-mono text-blue-600 truncate">
                      {meeting.code}
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(meeting.code)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copiedCode === meeting.code ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                <button className="w-full mt-3 sm:mt-4 px-4 py-2 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-16">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new meeting</p>
          </div>
        )}
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 transform transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Create New Meeting</h2>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Title
                </label>
                <input
                  type="text"
                  required
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="Enter meeting title"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  required
                  min="2"
                  max="100"
                  value={newMeeting.maxParticipants}
                  onChange={(e) => setNewMeeting({...newMeeting, maxParticipants: parseInt(e.target.value)})}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 border-2 border-gray-200 text-gray-700 text-sm sm:text-base rounded-xl font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateMeeting}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-xl font-medium hover:shadow-lg transition-all order-1 sm:order-2"
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Meeting Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Meeting</h2>
            <form onSubmit={handleJoinMeeting} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Code
                </label>
                <input
                  type="text"
                  required
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-center text-lg tracking-wider"
                  placeholder="ABC-123"
                  maxLength="7"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-character meeting code
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Join Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};