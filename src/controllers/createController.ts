import db from "../../models";

class CreateController {
    async userInfo(req:any, res:any){
        const user = await db.User.findOne({where: {id: req.user}, include: ["Details"]})

        return res.status(200).json(user)
    }

    async createCompany(req:any, res:any){
        try{
            const user = await db.User.findOne({where: {id: req.user}, include: ["Details"]})

            const company = await db.CompanyDetails.bulkCreate([{
                user_id: req.user,
                ...req.body
            }])

            return res.status(200).json({
                body: company,
                user
            })
        }catch (error: any){
            console.log(error)
            return  res.status(403).send({
                status: 403,
                message: error.message || "Error",
            })
        }
    }
}

export default new CreateController();