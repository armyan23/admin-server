import db from "../../models";

const { Company, Employee } = db

class EmployeeController {
    async createEmployee(req: any, res: any){
        try {
            // // 1. INSERT a new student
            const addEmployee = await Employee.create(req.body)
            await addEmployee.save()
            //   const student = await Student.create({
            //        firstName: "Jake",
            //   });

            // // 2. Find the Classes row
            const company = await Company.findByPk(req.companyId);
            //    const classRow = await Class.findByPk(1);

            // // 3. INSERT the association in Enrollments table
            //    await student.addClass(classRow, { through: Enrollment });
                await company.addEmployee(addEmployee,{
                    through:  {
                        role: "employee"}

                })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: addEmployee
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async getEmployeeId(req: any, res: any){
        try {
            // TODO: Dont WORK
            // const employee = Employee.findOne({where: req.body.id})
            return res.status(200).json({
                status: 200,
                message: "Success",
                // data: employee
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async getEmployeesAll(req: any, res: any){
        try {
            const company = await Company.findOne({
                where: {
                    id: req.companyId,
                },
                include: {
                    model: Employee,
                    as: "Employee"
                }
            })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: company.Employee
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
}

export default new EmployeeController();