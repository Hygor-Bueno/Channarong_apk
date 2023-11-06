/* eslint-disable prettier/prettier */

export interface IUser {
  id: number;
  user: string;
  password: string;
  admin: boolean;
  status: boolean;
}

/*
Status: 
0 - Inativo
1 - Ativo.
2 - Mensalidade atrasada.
*/
export interface IPupil{
    id: number;
    name: string;
    payment_date: string;
    free:boolean;
    status: number;
}

export interface ISettings{
    payment:number;
}

export interface IRequest{ 
    error: boolean;
    message: string;
    data: any[];
}

export interface IModalPupil{
    viewHeader:boolean;
    onClose:()=>void;
    pupil:IPupil;
}