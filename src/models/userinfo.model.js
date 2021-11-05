import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      max: [127, 'Max Length is 127 characters for name.'],
    },
    address: {
      type: String,
      required: true,
      max: [280, 'Max Length is 280 characters for address.'],
    },
    children: { type: Boolean, required: true },
    childrenNumber: { type: Number, default: 0 },
    occupation: {
      type: String,
      enum: ['Employed', 'Student', 'Self-employed'],
      required: true,
    },
    email: { type: String, required: true },
    updated: { type: Date, default: Date.now() },
  },
  { collection: 'recommendations' }
);

UserInfoSchema.index({ email: 1 });

const model = mongoose.model('UserInfo', UserInfoSchema);
export default model;
