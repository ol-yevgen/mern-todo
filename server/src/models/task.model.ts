import { Schema, model, InferSchemaType } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema)