import mongoose, { Document, Schema, Model } from "mongoose";

export interface IGoals extends Document {
    amount: string,
    userID: string
}

const goalsSchema = new Schema<IGoals>({
    amount: { type: String, required: true},
    userID: { type:String, required: true}
});

const Goal: Model<IGoals> = mongoose.models.Goal || mongoose.model<IGoals>("Goals", goalsSchema);
export default Goal;