import { Entity,Column,PrimaryGeneratedColumn  } from "typeorm";

@Entity()

export class Blog {
    @PrimaryGeneratedColumn()
    id !: number;

    @Column({type:"varchar"})
    public title !: string;

    @Column ({type:"varchar"})
    public content!: string;

    @Column({type : "varchar"})
    public image!: string;
}