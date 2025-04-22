import mongoose, { Document, Schema, Model } from "mongoose";

export interface IExpense extends Document {
    title: string,
    description: string,
    imageURL: string,
    amount: string,
    date: string,
    paymentMethod: string,
    userID: string,
}

const expenseSchema = new Schema<IExpense>({
    title: { type: String, required: true},
    description: { type:String, required: true},
    imageURL: { type: String, required: true},
    amount: { type: String, required: true},
    date: { type: String, required: true},
    paymentMethod: { type: String, required: true},
    userID: { type:String, required: true}
});

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;