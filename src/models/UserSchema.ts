import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type:String, required: true}
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;