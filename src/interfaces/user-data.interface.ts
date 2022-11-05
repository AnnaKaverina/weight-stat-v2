export interface IBarItem {
  title: string
  value: number
  maxValue: number
}

export interface IUserDataItem {
  date: string
  values: Array<IBarItem> | null
}

export interface IUserState {
  index: number
  date: string
  stat: IUserDataItem[]
}
