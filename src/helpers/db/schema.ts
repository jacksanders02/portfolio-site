import { Schema } from "mongoose";

export interface IModule {
  name: String;
  description: String;
  grade: String;
}

export interface IModuleCollection {
  stage: String;
  modules: [IModule];
}

export const ModuleSchema: Schema = new Schema<IModule>({
  name: { type: String, required: true },
  description: String,
  grade: String,
});

export const ModuleCollectionSchema: Schema = new Schema<IModuleCollection>({
  stage: { type: String, required: true },
  modules: [ModuleSchema],
});
