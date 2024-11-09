import express from "express";

const router = express.Router();

import {getUsers} from "./pages/list/List";

router.get("/users",getUsers)
router.get("/users",createUsers)

