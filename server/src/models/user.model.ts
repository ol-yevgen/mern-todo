import { Schema, model, Types, InferSchemaType } from 'mongoose';
// import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Types.ObjectId, ref: 'Task' }],
    // verificationCode: {type: String, required:true, default: () => nanoid()},
    // passwordResetCode: {type: String || null, required:true},
    // verified: { type: Boolean, default: false },

},
    { timestamps: true } 
)

// userSchema.pre<User>('save', async function (next) {
//     if (!this.password) {
//         return
//     }

//     const hashedPassword = await bcrypt.hash(this.password, 12)
//     this.password = hashedPassword
//     next()
// })

type User = InferSchemaType<typeof userSchema>;

module.exports = model<User>('User', userSchema)