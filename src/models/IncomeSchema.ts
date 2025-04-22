import mongoose, { Document, Schema, Model } from "mongoose";

export interface Iincome extends Document {
    title: string,
    description: string,
    imageURL: string,
    amount: string,
    date: string,
    paymentMethod: string,
    userID: string,
}

const incomeSchema = new Schema<Iincome>({
    title: { type: String, required: true},
    description: { type:String, required: true},
    imageURL: { type: String, required: true},
    amount: { type: String, required: true},
    date: { type: String, required: true},
    paymentMethod: { type: String, required: true},
    userID: { type:String, required: true}
});

const Income: Model<Iincome> = mongoose.models.Income || mongoose.model<Iincome>("Income", incomeSchema);
export default Income;