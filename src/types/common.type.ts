import {ObjectId} from "mongoose";

export interface ISort{
  [key: string]: number | string;
}

export interface IField{
  [key: string]: number;
}

export interface IFind {
  total: number;
  data: Array<Document>
}

export interface DateRangeType {
  startDate: Date;
  endDate: Date;
}

export interface DocumentCreateType<T> {
  data: Array<T> | T
}


export interface ISkipLimitSort{
  skip?: number
  limit?: number
  sort: ISort
}

export interface CreateEditReturnType{
  _id?: ObjectId | string
  message?: string
}