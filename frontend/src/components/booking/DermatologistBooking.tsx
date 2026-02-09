import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Mail, MessageSquare, MapPin, Star, 
  Clock, Calendar, Stethoscope, MessageCircle, 
  Video, Check, X, AlertCircle
} from 'lucide-react';

// ... keep existing interfaces ...

const mockDoctors: Doctor[] = [
  // ... keep first 2 existing doctors ...
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    qualification: 'MD, Dermatology',
    specialization: 'Pediatric Dermatology',
    experience: 10,
    location: 'Miami, FL',
    consultationFee: 160,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    isOnline: true,
    expertise: ['Pediatric Dermatology', 'Eczema', 'Birthmarks']
  },
  {
    id: '4',
    name: 'Dr. Siva',
    qualification: 'MD, FAAD',
    specialization: 'Surgical Dermatology',
    experience: 15,
    location: 'Erode, IN',
    consultationFee: 200,
    rating: 4.9,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    isOnline: false,
    expertise: ['Skin Cancer', 'Mohs Surgery', 'Laser Treatment']
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    qualification: 'MD, Dermatology',
    specialization: 'Cosmetic Dermatology',
    experience: 9,
    location: 'Los Angeles, CA',
    consultationFee: 175,
    rating: 4.8,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    isOnline: true,
    expertise: ['Botox', 'Fillers', 'Chemical Peels']
  },
  {
    id: '6',
    name: 'Dr. Robert Thompson',
    qualification: 'MD, FAAD',
    specialization: 'Medical Dermatology',
    experience: 20,
    location: 'Boston, MA',
    consultationFee: 190,
    rating: 4.9,
    reviews: 231,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    isOnline: true,
    expertise: ['Psoriasis', 'Rosacea', 'Skin Allergies']
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    qualification: 'MD, Dermatology',
    specialization: 'Cosmetic & Medical Dermatology',
    experience: 11,
    location: 'Houston, TX',
    consultationFee: 165,
    rating: 4.7,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    isOnline: false,
    expertise: ['Acne', 'Laser Hair Removal', 'Anti-aging']
  },
  {
    id: '8',
    name: 'Dr. David Kim',
    qualification: 'MD, FAAD',
    specialization: 'Surgical Dermatology',
    experience: 14,
    location: 'Seattle, WA',
    consultationFee: 185,
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    isOnline: true,
    expertise: ['Skin Cancer', 'Mole Removal', 'Scar Treatment']
  },
  {
    id: '9',
    name: 'Dr. Rachel Green',
    qualification: 'MD, Dermatology',
    specialization: 'Pediatric & Medical Dermatology',
    experience: 13,
    location: 'Denver, CO',
    consultationFee: 170,
    rating: 4.9,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    isOnline: false,
    expertise: ['Pediatric Dermatology', 'Acne', 'Eczema']
  },
  {
    id: '10',
    name: 'Dr. Thomas Anderson',
    qualification: 'MD, FAAD',
    specialization: 'Cosmetic Dermatology',
    experience: 16,
    location: 'Austin, TX',
    consultationFee: 195,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    isOnline: true,
    expertise: ['Botox', 'Dermal Fillers', 'Laser Resurfacing']
  }
];

export default function DermatologistBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [skinIssue, setSkinIssue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const filtered = mockDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDoctors(filtered);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find a Dermatologist</h1>
        <input
          type="text"
          placeholder="Search by name, specialization, or skin condition..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Keep existing doctor card content */}
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover"
              />
              {doctor.isOnline && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  Online
                </span>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.qualification}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({doctor.reviews})</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {doctor.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  {doctor.experience} years experience
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {doctor.specialization}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.expertise.map((exp, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-pink-600">
                  ${doctor.consultationFee}
                </span>
                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowAppointmentModal(true);
                  }}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Keep existing Appointment Modal */}
      <AnimatePresence>
        {showAppointmentModal && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold">Book Appointment</h2>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your skin issue
                  </label>
                  <textarea
                    value={skinIssue}
                    onChange={(e) => setSkinIssue(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 h-32"
                    placeholder="Please provide details about your skin concern..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowAppointmentModal(false);
                      setShowSuccessModal(true);
                      setSkinIssue('');
                    }}
                    className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keep existing Success Modal */}
      <AnimatePresence>
        {showSuccessModal && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Appointment Booked!</h2>
              <p className="text-gray-600 mb-6">
                {selectedDoctor.name} will contact you soon to confirm your appointment.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedDoctor(null);
                }}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}