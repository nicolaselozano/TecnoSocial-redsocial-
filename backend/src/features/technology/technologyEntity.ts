import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Technology {
  @PrimaryColumn()
  name: number;

  @Column({ type: "varchar", length: 120 })
  color: string;
}
