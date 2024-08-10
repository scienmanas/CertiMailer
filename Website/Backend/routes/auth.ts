import { Router, Request, Response } from "express";

// Initialse the router
const router = Router();

// Get JWT secret
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

// PASSKEY for admin to approve the new user
const ADMIN_PASSKEY = "Manas Poddar"

// Route - 1: Create new user
router.post('/create-user', async (req: Request, res: Response) => {

})




// // Route: 1 -> Creating user
// // creater user using post method
// router.post('/create-user',
//     async (req, res) => {
//         console.log(req.body)
//         try {
//             // check if user is already present
//             let user = await User.findOne(
//                 { email: req.body.email }
//             );

//             // null is returned if no uset exists but it exist null is not returned
//             if (user === undefined || null) {
//                 return res.status(400).json(
//                     { error: "sorry a user already exists" }
//                 )
//             }

//             // use bcrypt 
//             const salt = await bcrypt.genSalt(10);
//             const secPass = await bcrypt.hash(req.body.password, salt);

//             // perform insertion if user does not ecxits
//             user = await User.create({
//                 name: req.body.name,
//                 password: secPass,
//                 email: req.body.email,
//             })
//             console.log(user)
//             res.json(user);
//         }
//         catch (error) {
//             console.log(error.message);
//             res.status(500).send("Some error occurred");
//         }

//     })


// // Route - 2 : Authenticating user and sending a jwt
// // creater login endpoint
// router.post('/login', async (req, res) => {

//     // get the passed data
//     const { email, password } = req.body;

//     try {

//         // find the user is database
//         let user = await User.findOne(
//             {
//                 email: email
//             }
//         )

//         console.log(user)

//         // if nothing undefined or null is returned
//         if (user === null || user === undefined) {
//             return res.status(400).json(
//                 {
//                     status: false,
//                     message: "Wrong credentials"
//                 }
//             )
//         }

//         // compare the password for authenticalton
//         const passwordCompare = await bcrypt.compare(password, user.password)
//         if (!passwordCompare) {
//             return res.status(400).json(
//                 {
//                     status: false,
//                     message: "Wrong credentials"
//                 }
//             )
//         }


//         // get the fectehd user dataq
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }

//         // return a jwt token if correct user
//         const authToken = jwt.sign(data, JWT_SECRET);
//         res.json(authToken)
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).json(
//             {
//                 status: false,
//                 message: "Internal server error"
//             }
//         )
//     }

// })


// // Route -3 : Verify the user 
// router.post('/get-user', fetchUser, async (req, res) => {
//     try {

//         // get the user with the valid id
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("-password");

//         // send the respond
//         res.status(200).send(user);

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json(
//             {
//                 message: "Internal server error"
//             }
//         )
//     }
// })





export default router;