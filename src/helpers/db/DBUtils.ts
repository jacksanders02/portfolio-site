import mongoose, { Connection, Model } from 'mongoose';
import {
  IModuleCollection,
  IResidenceEvilScore,
  ModuleCollectionSchema,
  ResidenceEvilScoreSchema,
} from '@/helpers/db/schema';

// Replace the uri string with your connection string.
const uri: string = process.env.MONGODB_URI || '';

const ModuleCollection: Model<IModuleCollection> = mongoose.models.ModuleCollection
    || mongoose.model('ModuleCollection', ModuleCollectionSchema);

const ResidenceEvilScore: Model<IResidenceEvilScore> = mongoose.models.ResidenceEvilScore
    || mongoose.model('ResidenceEvilScore', ResidenceEvilScoreSchema);

// Cache database connection
declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var mongoose: any;
}
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export default class DBUtils {
  static async openConnection(): Promise<Connection> {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      mongoose.set('strictQuery', true);
      cached.promise = await mongoose.connect(uri);
    }

    cached.conn = await cached.promise;
    return cached.conn;
  }

  static async readModules(): Promise<IModuleCollection[]> {
    return ModuleCollection.find({}).then((mcs: IModuleCollection[]) => mcs);
  }

  static async readScores(): Promise<IResidenceEvilScore[]> {
    console.log('Reading Scores...');
    return ResidenceEvilScore.find({})
      .sort({ score: -1 })
      .then((scores: IResidenceEvilScore[]) => {
        console.log(scores);
        return scores;
      });
  }

  static async postScores(scores: IResidenceEvilScore[]) {
    const successArray: boolean[] = [];
    scores.forEach((score: IResidenceEvilScore) => {
      if ((score.score as number) > 0) {
        // Query DB to check if this score exists (will return an ID if so)
        ResidenceEvilScore.exists({ player: score.player, score: score.score })
          .then((exists) => {
            if (exists == null) {
              // Score does not yet exist, so attempt to create it
              ResidenceEvilScore.create(score).then(() => {
                // On success
                successArray.push(true);
              }, () => {
                // On failure
                successArray.push(false);
              });
            }
          });
      } else {
        successArray.push(true);
      }
    });

    return successArray;
  }
}
