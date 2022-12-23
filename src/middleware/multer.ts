import multer from 'multer'

const upload = multer().any();

const multerMiddleware = async (req: any, res: any, next: any) => {
    await upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            console.log('multer error');
            return res.status(400).json({ message: 'multer error' });
        } else if (err) {
            console.log({ err });
            return res.status(400).json({ message: 'something went wrong' });
        }
        next();
    });
};

export default multerMiddleware;