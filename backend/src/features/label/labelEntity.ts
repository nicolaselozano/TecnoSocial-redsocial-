import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Post } from "../post/postEntity";

@Entity()
export class Label {
  @PrimaryColumn()
  name: number;

  @Column({ type: "varchar", length: 120 })
  color: string;

  @ManyToMany(() => Post, (post) => post.id)
  @JoinTable()
  posts: Post[];
}
