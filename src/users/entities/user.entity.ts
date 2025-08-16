import { Gender } from "src/enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar'})
    full_name: string

    @Column({type: 'varchar'})
    email: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'varchar'})
    username: string

    @Column({type: 'varchar'})
    phone_number: string

    @Column({type: 'varchar'})
    confirm_pass: string

    @Column({type: 'varchar', enum: Gender})
    gender: Gender

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
