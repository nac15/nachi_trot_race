import { Schema, model } from 'mongoose'
import IHorseData from '../interfaces/IHorseData'

// Schmea for race events
const EventSchema = new Schema<IHorseData>(
  {
    event: { type: String },
    horse: {
      id: { type: Number },
      name: { type: String },
    },
    time: { type: Number },
  },
  {
    timestamps: true,
  }
)

// Model for race events and exporting it
export const TrotEvent = model<IHorseData>('TrotEvent', EventSchema)
