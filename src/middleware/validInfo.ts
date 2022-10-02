import exp from "constants";

async function valid(req: any, res: any, next: Function) {
    const { email, name, password } = req.body;

    function validEmail(userEmail: any) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials!");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email!");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401) .json("Invalid Email");
        }
    }

    next();
};

// Sarqeci es faily bayc voch mi ban chareci es faili het :: time from video 1:15


export default valid;