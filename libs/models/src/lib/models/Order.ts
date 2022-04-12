// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {User} from '@uandi/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { service } from '@uandi/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ServiceMan } from '@uandi/models';

export class Order{
    Order_Status?:string;
    User?:User;
    Service?:[{
        Services?:service,
        iscompleted?:boolean,
        isAssignedTo?:ServiceMan
    }];
    Offer?:string;
    Iscompleted?:boolean;
    total_amount =0;
    date?: Date;
    isPaid?: boolean;
    _id ?: string;
    RazorpayOrder_id?: string;
}