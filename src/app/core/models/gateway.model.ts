import {PDevice} from './p_devices.model';

export interface Gateway {
    id: string;
    displayName: string;
    ipv4_address: string;
    p_devices: PDevice[];
}
