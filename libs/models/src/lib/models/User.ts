import {Order} from './Order';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { service } from '@uandi/models';
export class User{
    Name ?: string;
    Email ?: string;
    Phone_no ?: number;
    Address ?: string;
    Gender ?: string;
    isAdmin ?: boolean;
    User_Wishlist ?: [service];
    Cart ?: [service];
    Orders ?: [Order];
    password ?: string;
    date?:string;
    _id?:string;
}