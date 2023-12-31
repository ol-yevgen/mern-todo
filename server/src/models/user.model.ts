import { Schema, model, Types, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true, }, // select: false - to not receive
    password: { type: String, required: true},
    tasks: [{ type: Types.ObjectId, ref: 'Task' }],
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema)