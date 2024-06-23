import mongoose, {Schema, Document} from "mongoose";


// Message Interface and Schema
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// User Interface and Schema
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        trim: true,        
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please Enter a Valid Email Address!']
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    verifyCode: {
        type: String,
        required: [true, 'verify code is required!']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'verify code is required!']
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,        
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema))

export default UserModel;