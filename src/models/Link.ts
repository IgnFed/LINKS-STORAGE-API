import { Schema, model } from 'mongoose'
import { ILinkBase, ILinkResponse } from '../interfaces/models/Link'

const colorsSchema = new Schema({
  backgroundColor: {
    type: String,
    required: false,
    default: '#FFFFFF'  
  },
  fontColor: {
    type: String,
    required: false,
    default: '#000000'
  }
})

const LinkSchema = new Schema<ILinkBase>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  colors: { 
    type: colorsSchema,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

LinkSchema.set('toJSON', {
  transform: (_, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

colorsSchema.set('toJSON', {
  transform: (_, ret: any) => {
    delete ret._id
    delete ret.__v
  }
})

export default model<ILinkResponse>('Link', LinkSchema)