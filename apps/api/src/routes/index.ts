import { Router, type IRouter } from "express";
import healthRouter from "./health";
import eventsRouter from "./events";
import teamRouter from "./team";
import programsRouter from "./programs";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/events", eventsRouter);
router.use("/team", teamRouter);
router.use("/programs", programsRouter);
router.use(contactRouter);
router.use("/stats", statsRouter);

export default router;
