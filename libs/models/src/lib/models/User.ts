import {Order} from './Order';
import { service } from '@uandi/models';
export class User{
    Name ?: string;
    Email ?: string;
    Phone_no ?: number;
    Address ?: string;
    Gender ?: string;
    isAdmin ?: boolean;
    User_Wishlist ?: [service];
    Orders ?: [Order];
    password ?: string;
    date?:string;
}