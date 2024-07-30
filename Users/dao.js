import model from "./model.js";
export const createUser = (user) => {} // implemented later
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive, ignore the case (uppercase or lowercase) 
    return model.find({
        // $or takes an array of conditions. If any condition in the array is met, the document will be included in the result.
        $or: [
        { firstName: { $regex: regex } }, 
        { lastName: { $regex: regex } }
        ],
    });
  };
  
