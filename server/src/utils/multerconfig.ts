import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, callback) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/csv")) {
        fs.mkdirSync("public/csv");
      }
  
      callback(null, "public/csv");
    },
    filename(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    let fileName = path.extname(file.originalname);
    if (fileName !== ".csv") {
      return cb(new Error("Only csvs are allowed!"));
    }
    cb(null, true);
  };
  
  export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });