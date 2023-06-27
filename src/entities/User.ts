import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Auditable } from "./Auditable"
import { Length } from "class-validator";
import { Thread } from './Thread';
import { ThreadItem } from "./ThreadItem";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { ThreadPoint } from './ThreadPoint';

@Entity({ name: "Users" })
export class User extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id!: string;

  @Column("varchar", {
    name: "Email",
    length: 120,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column("varchar", {
    name: "UserName",
    length: 60,
    unique: true,
    nullable: false, 
  })
  userName!: string;

  @Column("varchar", {
    name: "Password",
    length: 100,
    nullable: false,
  })
  @Length(8, 100)
  password!: string;

  @Column("boolean", {
    name: "Confirmed",
    default: false,
    nullable: false,
  })
  confirmed!: boolean;

  @Column("boolean", {
    name: "IsDisabled",
    default: false,
    nullable: false,
  })
  isDisabled!: boolean;

  @OneToMany(() => Thread, (threads) => threads.user)
  threads!: Thread[];

  @OneToMany(() => ThreadItem, (threadItem) => threadItem.user)
  threadItems!: ThreadItem[];

  @OneToMany(() => ThreadPoint, (threadPoints) => threadPoints.user)
  threadPoints!: ThreadPoint[];

  @OneToMany(() => ThreadItemPoint, (threadItemPoints) => threadItemPoints.user)
  threadItemPoints!: ThreadItemPoint[];
}