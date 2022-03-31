import { Schema, model } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IUserBase, IUserResponse } from '../interfaces/models/User'

const UserSchema = new Schema<IUserBase>({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  links: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Link',
    }
  ]
})

UserSchema.set('toJSON', {
  transform: (_, ret:any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

UserSchema.plugin(mongooseUniqueValidator)

export default model<IUserResponse>('User', UserSchema)