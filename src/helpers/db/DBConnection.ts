import mongoose, { Model } from "mongoose";
import {
  IModuleCollection,
  IResidenceEvilScore,
  ModuleCollectionSchema,
  ResidenceEvilScoreSchema
} from "@/helpers/db/schema";

// Replace the uri string with your connection string.
const uri: string = process.env.MONGODB_URI || "";

const ModuleCollection: Model<IModuleCollection> = mongoose.models.ModuleCollection ||
    mongoose.model("ModuleCollection", ModuleCollectionSchema);

const ResidenceEvilScore: Model<IResidenceEvilScore> = mongoose.models.ResidenceEvilScore ||
    mongoose.model("ResidenceEvilScore", ResidenceEvilScoreSchema);

export default class DBConnection {
  conn: mongoose.Connection;

  constructor() {
    mongoose.connect(uri).then((r) => r);
    this.conn = mongoose.connection;

    this.conn.on("error", console.error.bind(console, "connection error:"));
    this.conn.once("open", function () {
      console.log("Connected to MongoDB!");
    });
  }

  async readModules(): Promise<IModuleCollection[]> {
    return ModuleCollection.find({}).then((mcs: IModuleCollection[]) => mcs);
  }

  async readScores(): Promise<IResidenceEvilScore[]> {
    return ResidenceEvilScore.find({}).sort({score: -1}).then((scores: IResidenceEvilScore[]) => scores);
  }

  async postScores(scores: IResidenceEvilScore[]) {
    const successArray: boolean[] = []
    for (let score of scores) {
      if ((score.score as number) > 0) {
        ResidenceEvilScore.exists({player: score.player, score: score.score}).then(exists => {
          if (exists == null) {
            ResidenceEvilScore.create(score).then(() => {
              // On success
              successArray.push(true);
            }, () => {
              // On failure
              successArray.push(false);
            });
          }
        })
      } else {
        successArray.push(true);
      }
    }

    return successArray;
  }
}
