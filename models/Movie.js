import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a name for this movie."],
  },
  poster: {
    type: String,
    required: [true, "Please provide an image url for this movie."],
  },
  year: {
    type: Number,
  },
})

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema)
