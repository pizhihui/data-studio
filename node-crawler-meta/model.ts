import mongoose, { Schema,model, Model } from 'mongoose'

interface IMcFunc {
  func_name: string
  func_desc: string
  func_link: string
  func_code?: string
  func_html?: string
}

type McFuncModelType = Model<IMcFunc>

await mongoose.connect('mongodb://l2.ttut.cc:55074/crawlerdb')

const McFunctionSchema = new Schema<IMcFunc, McFuncModelType>({
  func_name: String,
  func_desc: String,
  func_link: String,
  func_html: String
})
export const McModel = model<IMcFunc, McFuncModelType>('mc_function', McFunctionSchema)

