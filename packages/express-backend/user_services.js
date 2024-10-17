import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }else if (job && name){
    promise = findUserByNameAndJob(name, job)
  }  
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function deleteUserById(id) {
 return userModel.findByIdAndDelete(id)
 .then((result) => {
  console.log("User deleted:", result); // Log the result
  return result;
  }).catch((error) => {
  console.log("Error deleting user:", error); // Log the error
  throw error;
});
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job })
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
  findUserByNameAndJob,
};