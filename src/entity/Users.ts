import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    name!: string

    @Column()
    password!: string

}