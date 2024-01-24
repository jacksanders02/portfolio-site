import mongoose, { Model } from "mongoose";
import { IModuleCollection, ModuleCollectionSchema } from "@/helpers/db/schema";

// Replace the uri string with your connection string.
const uri: string = process.env.MONGODB_URI || "";

const ModuleCollection: Model<IModuleCollection> = mongoose.models.ModuleCollection || mongoose.model('ModuleCollection', ModuleCollectionSchema);

export default class DBConnection {
  conn: mongoose.Connection

  constructor() {
    mongoose.connect(uri).then(r => r);
    this.conn = mongoose.connection;

    this.conn.on('error', console.error.bind(console, 'connection error:'));
    this.conn.once('open', function() {
      console.log('Connected to MongoDB!');
    });
  }

  readModules() {
    ModuleCollection.find({stage: "Year 1"}).then((mcs: Array<IModuleCollection>) => {
      console.log(mcs)
    })
  }
}