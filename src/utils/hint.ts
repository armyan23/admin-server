// // usery jnjeluc kjnje ira het kapvac amen inch
// await queryInterface.addConstraint("verify",{
//   fields: ["user_id"],
//   type: "foreign key",
//   name: "verify",
//   references: {
//     table: "users", field:"id"
//   },
//   onUpdate: "cascade",
//   onDelete: "cascade"
// })

// req.params.id

// REGISTER
//1. Destructure the req.body
//2. Check if user exist (if user exist then throw error)
//3. Bcrypt the user password
//   const saltRound = 10;
//   const salt = await bcrypt.genSalt(saltRound);
//   const bcryptPassword = await bcrypt.hash(password, salt);
//4. Enter the new user inside our database
//5. Generating our jwt token
//   const token = jwtGenerator(newUser.rows[0].user_id);
//   res.json({token});


// LOGIN
//1. Destructure the req.body
//2. Check if user doesn't exist (if not we throw error)
//   Message = ("Password or Email is incorrect!");
//3. Check if incoming password is the same the database password
//   const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
//   if (!validPassword){
//        return res.status(401).send("Password or Email is incorrect! *Password");
//   }
//4. Give them the jwt token
//   const token = jwtGenerator(user.rows[0].user_id);
//   res.json({token})




// EXAMPLE
// async getUser(req: any, res: any){
//     try{
//         const {id} = req.body
//         // const users = await db.User.findAll({});
//         const user = await db.User.findOne({ where: { id },
//             include:[
//                 "Details",
//                 // "Verify"
//             ]
//         });
//
//         if(user){
//             return res.status(200).send({
//                 status: 200,
//                 message: "",
//                 data: user
//             });
//         }else {
//             return res.status(200).send({
//                 message: "No such user",
//             });
//         }
//
//     }catch (err){
//         console.error(err)
//         return res.status(500).send({
//             status: 500,
//             message: "Server Error"
//         })
//     }
// }


//
// async getUserInfo(req: any, res: any){
//     try{
//         const {id} = req.body
//         // const users = await db.User.findAll({});
//         const user = await db.User.findOne({ where: { id }});
//         console.log(user);
//
//         if(user){
//             return res.status(200).send({
//                 status: 200,
//                 message: "",
//                 data: user
//             });
//         }else {
//             return res.status(200).send({
//                 message: "No such user",
//             });
//         }
//
//     }catch (err){
//         console.error(err)
//         return res.status(500).send({
//             status: 500,
//             message: "Server Error"
//         })
//     }
// }