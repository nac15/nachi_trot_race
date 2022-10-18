import Database from '../src/utils/Database'
import IHorseData from '../src/interfaces/IHorseData'
import { TrotEvent } from '../src/models/TrotEvent'

describe('Trot race events', () => {
  let event: IHorseData

  beforeAll(() => {
    event = {
      event: 'start',
      horse: {
        id: 1,
        name: 'Stellar',
      },
      time: 0,
    }
  })
  it('Should connect to the database', async () => {
    const connect = await Database.connectDB()
    expect(connect).toBeTruthy()
  })
  it('Should save the data in the database', async () => {
    const dataToSave = await new TrotEvent(event)
    const response = await dataToSave.save()
    expect(response).toBeTruthy()
  })
  afterAll((done) => {
    Database.closeConnection()
    done()
  })
})
