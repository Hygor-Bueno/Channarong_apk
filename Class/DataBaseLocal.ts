/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPupil, IRequest, IUser } from '../Interfaces/iDataBaseLocal';

export class DataBaseLocal {
    private data: any[];
    private counter: number;

    constructor() {
        this.data = [];
        this.counter = 1;
    }
    async fetchData(dataBase: string): Promise<IRequest> {
        let result: IRequest = { error: false, message: '', data: [] };
        try {
            const storedData = await AsyncStorage.getItem(dataBase);
            if (!storedData) { throw new Error('No data found'); }
            this.data = JSON.parse(storedData);
            result.data = this.data;
        } catch (error: any) {
            result.error = true;
            result.message = error.toString();
        }
        return result;
    }

    private async storeData(dataBase: string,newData:any): Promise<void> {
        try {
            const storedData = await AsyncStorage.getItem(dataBase);
            let data = [];
            if (storedData) {
                data = JSON.parse(storedData);
            }
            data.push(newData);
            await AsyncStorage.setItem(dataBase, JSON.stringify(data));
        } catch (error) {
            console.error('Error storing data:', error);
        }
    }

    async createUser(user: string, password: string, dataBase: string, admin: boolean, status: boolean): Promise<void> {
        this.counter = await this.lastId(dataBase);
        const newItem: IUser = { id: this.counter, user, password, admin, status };
        await this.storeData(dataBase,newItem);
    }
    async createPupil(name: string, payment_date: string, dataBase: string, free: boolean, status: number): Promise<void> {
        this.counter = await this.lastId(dataBase);
        const newItem: IPupil = { id: this.counter, name, payment_date, free, status };
        await this.storeData(dataBase,newItem);
    }

    async lastId(dataBase: string): Promise<number> {
        let result: number = 0;
        let req: IRequest = await this.fetchData(dataBase);
        req.data.forEach((item: any) => {
            if (result < item.id) { result = item.id; }
        });
        return result + 1;
    }

    // async updateItem(id: number, user: string, dataBase: string): Promise<void> {
    //     this.data = this.data.map((item) =>
    //         item.id === id ? { ...item, user: `Updated ${user}` } : item
    //     );
    //     await this.storeData(dataBase);
    // }

    // async deleteItem(id: number, dataBase: string): Promise<void> {
    //     this.data = this.data.filter((item) => item.id !== id);
    //     await this.storeData(dataBase);
    // }
}

