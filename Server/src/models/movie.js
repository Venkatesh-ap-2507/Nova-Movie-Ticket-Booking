import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const movieSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: {
    type: String,
    required: true,
  },
  photoUrls: {
    type: [String],
    required: true,
  },
  casts: [
    {
      type: String,
      ref: 'Cast',
      required: true,
    }
  ],
  languages: [
    {
      type: String,
      ref: 'Language',
      required: true,
    }
  ],
  genres: [
    {
      type: String,
      ref: 'Genre',
      required: true,
    }
  ],

  comming: {
    type: Boolean,
    default: false,
  },
  filmCertificate: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  releasedDate: {
    type: Date,
    default: undefined,
  },
  time: {
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
});

const movieCollection = mongoose.model('Movie', movieSchema);
export default movieCollection;
