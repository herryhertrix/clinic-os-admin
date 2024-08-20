import { Section } from "./SectionModel";

export interface AnamnesisForm {
  id: number;
  title: string;
  description: string;
  createdAt: string; // ISO string representation of the date
  sections: Section[];
}
