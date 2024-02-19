import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = data;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};