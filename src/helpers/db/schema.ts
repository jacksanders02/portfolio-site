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

export interface IResidenceEvilScore {
  player: String;
  score: Number;
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

export const ResidenceEvilScoreSchema: Schema = new Schema<IResidenceEvilScore>({
  player: { type: String, required: true },
  score: { type: Number, required: true }
});
