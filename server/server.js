import express from "express";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { METHODS } from "http";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT","DELETE"],
        credentials: true
    }
));

const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: 'joy'
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

con.connect(function (err) {
    if (err) {
        console.log("error in connection");
    } else {
        console.log("and  connected")
    }
})

////////get employee API//////
app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee1";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Error: "Get Employee error" })
        } else {
            return res.json({ Status: "Success", Result: result })
        }
    })
})

/////getting employee id and also for employee id//////
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee1 where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Error: "getting Employee error" })
        } else {
            return res.json({ Status: "Success", Result: result })
        }
    })
})

////////update data /////////
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee1 SET salary = ?,address =? WHERE id = ?";
    con.query(sql, [req.body.salary,req.body.address, id], (err, result) => {
        if (err) {
            return res.json({ Error: "Error during updation" })
        } else {
            return res.json({ Status: "Success" })
        }
    })
})

/////////////////delete employee api///////////////////

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee1 WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Error: "Error during deletation" })
        } else {
            return res.json({ Status: "Success" })
        }
    })
})


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not Authenticated" })
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err)
                return res.json({ Error: "Token wrong" });
            req.role = decoded.role;
            req.id = decoded.id;
            next();

        })
    }
}
app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({
        Status: "Success", role: req.role, id: req.id,
    })
})


/////////////////counting/////////////
app.get('/adminCount', (req, res) => {
    const sql = "SELECT COUNT (id) as admin FROM users";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Error: "Error in running querry" });
        } else {
            return res.json(result);
        }
    })
})

app.get('/employeeCount', (req, res) => {
    const sql = "SELECT COUNT (id) as employee FROM employee1";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Error: "Error in runnin querry" });
        } else {
            return res.json(result);
        }
    })
})

app.get('/salaryCount', (req, res) => {
    const sql = "SELECT SUM(salary) as total_salary FROM employee1";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Error: "Error in runnin querry" });
        } else {
            return res.json(result);
        }
    })
})

///////login app///
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error in Server", Error: "Error in running querry" });
        if (result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: " Wrong email or password" })
        }
    })
})

//////////////logout api///////////
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

/////////employee login///////////
app.post('/empLogin', (req, res) => {
    const sql = "SELECT * FROM employee1 Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: "password error" });
                if (response) {
                    const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success", id: result[0].id })
                } else {
                    return res.json({ Status: "Error", Error: "Wrong Email or Password" });
                }

            })

        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})



//////////create account////////
app.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee1 (`name`,`email`,`password`,`salary`,`address`,`image`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), 10/*salt */, (err, hash) => {
        if (err) return res, json({ Error: "Error in hashing password" });
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if (err) res.json({ Error: "inside database query" });
            return res.json({ Status: "Success" });
        })
    })
})

app.listen(6060, () => {
    console.log("Server is running")
})