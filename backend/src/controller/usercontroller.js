const User = require('../model/User')
const UserSession = require('../model/UserSession')
const Review = require('../model/Review')


exports.adduser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.send({
                success: false,
                message: "Error: Email or Password missing"
            })
        }
        const newUser = await new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save()
        return res.status(200).json({
            data: newUser,
            message: "User added successfully",
            error: null
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while adding user",
            error: err.message
        })
    }
}


exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.find({ email: email })
        console.log("user", user, user[0]._id)
        if (user.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid user'
            });
        }
        if (user[0].validPassword(password) == false) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const userSession = await new UserSession({
            userId: user[0]._id
        })
        userSession.save()
        return res.status(200).json({
            success: true,
            token: userSession._id,
            message: "Sign in successfully",
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while sign in",
            error: err.message
        })
    }
}


exports.logout = async (req, res) => {
    const token = req.query;
    // console.log("token",token.token)
    try {
        let userSession = await UserSession.findOneAndUpdate({
            _id: token.token,
            isDeleted: false
        }, { isDeleted: true }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while logging out",
            error: err.message
        })
    }
}

exports.verifytoken = async (req, res) => {
    const token = req.query;
    try {
        let usersession = UserSession.find({
            _id: token,
            isDeleted: false
        })
        if (usersession.length != 1) {
            return res.status(400).json({
                success: false,
                message: 'Error: Invalid'
            });
        }
        return res.status(200).json({
            success: true,
            message: "verified"
        });
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while verifying",
            error: err.message
        })
    }
}



exports.addreview = async (req, res) => {
    // console.log("addreview")
    // mal_id user_id   rating  user_review
    const anime_mal_id = req.params.id
    const token = req.body.token
    const rating = req.body.rating
    const user_review = req.body.user_review
    try {
        let usersession = await UserSession.findOne({ _id: token, isDeleted: false })
        let user_id = usersession.userId
        console.log(usersession, "...", user_id)
        let newReview = await new Review({
            mal_id: anime_mal_id,
            user_id: user_id,
            rating: rating,
            user_review: user_review
        })
        await newReview.save()
        console.log(newReview)
        return res.status(200).json({
            data: newReview,
            message: "Review added",
            error: null
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while adding review",
            error: err.message
        })
    }
}

exports.getreview = async (req, res) => {
    const mal_id = req.query.mal_id
    // const user_id = req.query.user_id
    // console.log("mal_id",mal_id,"userid",user_id)
    try {
        let review = await Review.find({ "mal_id": mal_id })
        console.log("review", review)
        return res.status(200).json({
            data: review,
            message: "Review found",
            error: null
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while fetching review",
            error: err.message
        })
    }
}


exports.updatereview = async (req, res) => {
    const anime_mal_id = req.params.id
    const token = req.body.token
    const rating = req.body.rating
    const user_review = req.body.user_review
    try {

        let usersession = await UserSession.findOne({
            _id: token,
            isDeleted: false
        })
        let user_id = usersession.userId
        console.log(usersession, "...", user_id)

        let newReview = await Review.findOneAndUpdate({
            "mal_id": anime_mal_id,
            "user_id": user_id,
        }, {
            $set: {
                "rating": rating,
                "user_review": user_review
            }
        }, { new: true })
        // console.log("newReview", newReview)

        return res.status(200).json({
            data: newReview,
            message: "Review updated",
            error: null
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error while updating review",
            error: err.message
        })
    }
}

exports.avgrating = async (req, res) => {
    const anime_mal_id = req.params.id
    try {
        let avg = await Review.aggregate([
            {
                $group:
                {
                    _id: "$mal_id",
                    Average: { $avg: "$rating" }
                }
            }
        ])
        let rating = avg.filter(x=>x._id==anime_mal_id)
        console.log(rating)

        return res.status(200).json({
            data: rating,
            message: "Rating found",
            error: null
        })
    }
    catch (err) {
        return res.status(400).json({
            data: null,
            message: "Error fetching rating",
            error: err.message
        })
    }
}