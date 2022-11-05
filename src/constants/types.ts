export interface IBarItem {
  title: string
  value: number,
  maxValue: number
}

export interface IUserDataItem {
  date: string
  values: IBarItem[]
}
