import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Auditable } from "./Auditable"
import { Length } from "class-validator";
import { Thread } from "./Thread";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { User } from "./User"

@Entity({ name: "ThreadItems" })
export class ThreadItem extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id!: string;

  @Column("int", {
    name: "Views",
    default: 0,
    nullable: false,
  })
  views!: number;

  @Column("int", {
    name: "Points",
    default: 0,
    nullable: false,
  })
  points!: number;

  @Column("boolean", {
    name: "IsDisabled",
    default: false,
    nullable: false,
  })
  isDisabled!: boolean;

  @Column("varchar", {
    name: "Body",
    length: 2500,
    nullable: false,
  })
  @Length(10, 2500)
  body!: string;

  @ManyToOne(() => User, (user: User) => user.threads)
  user!: User;

  @ManyToOne(() => Thread, (thread: Thread) => thread.threadItems)
  thread!: Thread;

  @OneToMany(() => ThreadItemPoint, (threadItemPoints) => threadItemPoints.threadItem)
  threadItemPoints!: ThreadItemPoint[];
}