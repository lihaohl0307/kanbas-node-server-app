import model from "./model.js";

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

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const createUser = (user) => {
    // remove _id field just in case client sends it
    // database will create _id for us instead
    delete user._id
    return model.create(user);
} 

// New function to add a quiz attempt for a user
export const addQuizAttempt = (userId, attempt) => {
    return model.findByIdAndUpdate(
        userId,
        { $push: { quizAttempts: attempt } },
        { new: true }
    );
};

// New function to get all quiz attempts for a user
export const getQuizAttempts = (userId) => {
    return model.findById(userId, { quizAttempts: 1, _id: 0 });
};


  
