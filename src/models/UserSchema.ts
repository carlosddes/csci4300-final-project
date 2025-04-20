import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true},
    password: { type:String, required: true}
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;