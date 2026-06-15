import mongoose from 'mongoose';
const { Schema } = mongoose;

const businessSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    enum: ['salon', 'tutor', 'boutique', 'gym', 'restaurant', 'other'],
    required: true
  },
  tagline: String,
  description: String,
  
  services: [{
    name: String,
    description: String,
    price: String,
    duration: String
  }],
  
  contact: {
    phone: String,
    email: String,
    address: String,
    whatsapp: String,
    socialLinks: {
      instagram: String,
      facebook: String,
      linkedin: String
    }
  },
  
  gallery: [{
    url: { type: String },
    publicId: { type: String }
  }],
  
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  
  isPublished: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'default'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Business', businessSchema);
