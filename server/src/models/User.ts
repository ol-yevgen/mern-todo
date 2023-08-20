import { Schema, model, Types, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Types.ObjectId, ref: 'Task' }]
})

type User = InferSchemaType<typeof userSchema>;

module.exports = model<User>('User', userSchema)