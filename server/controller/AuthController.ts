import { Request,Response } from "express";
import User from "../models/user-Model";
import { hash } from "../util/bcrypt/bcrypt";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const AuthController: Record<string, any> = {
     signup:async(req:Request,res:Response)=>{
        try{
            const { password, email, username }: { password: string, email: string, username: string } = req.body;
            let existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ status: false, error: "User already exists" });
            } else {
                const hashed= await hash(password)
                console.log('this is hashed',hashed)
                let newUser = await User.create({ email, username, password:hashed });

                let jwtSecret: string | undefined = process.env.JWT_SCT;

                if (!jwtSecret) {
                    console.error('JWT secret not found in environment variables');
                  } else {
                    let token = jwt.sign({ data: newUser._id }, jwtSecret);
                    console.log('Generated token:', token);

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24,
                    });
                  }

                return res.status(200).json({ status: true, data: newUser, message: "User created successfully" });
            }


        }catch(err:any){
            console.log('Internal server Error:-',err)
        }
     },
     Login:async(req:Request,res:Response)=>{
        try{
            const {password,email}:{password:string,email:string}=req.body;
            const user = await User.findOne({ email });

            if (!user) {
            
              return res.status(400).json({ status: false, error: "User not found" });
            }
          
           
            const passwordMatch = await bcrypt.compare(password, user.password);
          
            if (!passwordMatch) {
             
              return res.status(400).json({ status: false, error: "Incorrect password" });
            }
          
           
            return res.status(200).json({ status: true, data: user ,message: "User logged in" });
          
        }catch(err:any){
            console.error('Internal server error:', err);
            return res.status(500).json({ status: false, err: "Internal server error" });
        }
     }
  };
  
  export default AuthController;
  