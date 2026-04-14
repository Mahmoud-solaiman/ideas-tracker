import mongoose, { Schema, Document } from 'mongoose';

export interface Idea extends Document  {
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
}

const ideaSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true});


export default mongoose.model<Idea>('Idea', ideaSchema);