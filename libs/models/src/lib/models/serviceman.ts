import {Order} from './Order';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { service } from '@uandi/models';
export class ServiceMan{
    Name ?: string;
    Email ?: string;
    Phone_no ?: number;
    Address ?: string;
    Gender ?: string;
    Speciality ?: service;
    Assigned_order ?: [Order];
    date?:string;
    _id?:string;
}