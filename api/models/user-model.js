import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: false
        },
        profilePic: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        BioGraph: {
            type: String,
            default: "I am a passionate blogger and web developer."
        }
    }, {Timestamp: true}
)


const User = mongoose.model('User', userSchema)
export default User