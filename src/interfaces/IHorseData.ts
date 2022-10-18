// Interface type for the race events data
export default interface IHorseData {
  event: string
  horse: {
    id: number
    name: string
  }
  time: number
}
