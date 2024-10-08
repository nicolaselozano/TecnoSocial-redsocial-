import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Label {
  @PrimaryColumn()
  name: number;

  @Column({ type: "varchar", length: 120 })
  color: string;
}
