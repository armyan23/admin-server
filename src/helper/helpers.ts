import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export function codeGenerate(length = 8){
    return Math.random().toString(36).substring(2, length);
}

export async function createBcrypt(password: string, saltRound=  10){
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt)

    return bcryptPassword
}

export async function createImage(files: any, id: number, item: any, dirFile: string){
    for (const file of files) {
        const namePrefix = 1;
        const dir = `resources/${dirFile}/${id}`;

        if (!fs.existsSync(`src/${dir}`)){
            fs.mkdirSync(`src/${dir}`,{recursive: true});
        }
        const url = path.join(
            path.resolve(),
            ".",
            `src/${dir}/${namePrefix}_${file.originalname}`
        );
        const fileUrl = `${process.env.SERVER_API}/${dir}/${namePrefix}_${file.originalname}`;
        await fs.writeFileSync(url, file.buffer);
        await item.update({
            image: fileUrl
        })
    }
}

export async function deleteImage( Model: any, ){
    const path = Model?.image?.replace(process.env.SERVER_API, "./src");
    await fs.unlink(path, (err) => {
        if (err) console.log(err);
    });
    Model.update({image: null})
}