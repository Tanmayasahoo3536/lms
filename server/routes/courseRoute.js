import express, { Router } from "express";
import { getAllCourse, getCourseId } from "../controllers/courseController.js";

const courseRouter=Router();

courseRouter.get('/all',getAllCourse);
courseRouter.get('/:id',getCourseId);

export default courseRouter;