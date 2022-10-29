import db from "../../models";

const { Company, Employee } = db

class EmployeeController {
    async createEmployee(req: any, res: any){
        try {
            // // 1. INSERT a new student
            const employeeCreated = await Employee.create(req.body)
            await employeeCreated.save()
            //   const student = await Student.create({
            //        firstName: "Jake",
            //   });

            // // 2. Find the Classes row
            const company = await Company.findOne({where: {id: req.companyId}});
            //    const classRow = await Class.findByPk(1);

            // // 3. INSERT the association in Enrollments table
            //    await student.addClass(classRow, { through: Enrollment });
            await company.addEmployee(employeeCreated,{
                through:  {
                    role: "employee"}

            })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: employeeCreated
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
            const employee = Employee.findOne({where: req.body.id})
            // TODO: Dont make
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: employee
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