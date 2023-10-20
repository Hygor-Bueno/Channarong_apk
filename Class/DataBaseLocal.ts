/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IData {
    id: number;
    user: string;
    password: string;
    admin: boolean;
}

export class DataBaseLocal {
    private data: IData[];
    private counter: number;

    constructor() {
        this.data = [];
        this.counter = 1;
    }
    fetchData = async (dataBase:string): Promise<{ error: boolean; message: string; data: IData[]; }> => {
        let result:{error: boolean; message: string; data: IData[];};
        try {
            const storedData = await AsyncStorage.getItem(dataBase);
            if (!storedData) throw new Error('No data found');
            this.data = JSON.parse(storedData);
            this.printData();
            result = { error: false, data: this.data, message: '' };
        } catch (error: any) {
            result = { error: true, message: error.toString(), data: [] };
        }
        return result;
    };
    private printData(): void {
        console.log('Data:', this.data);
    }

    private storeData = async (dataBase: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(dataBase, JSON.stringify(this.data));
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    createItem = async (user: string, password: string, dataBase: string, admin:boolean): Promise<void> => {
        const newItem: IData = { id: this.counter, user, password,admin };
        this.data.push(newItem);
        this.counter++;
        await this.storeData(dataBase);
        this.printData();
    };

    updateItem = async (id: number, user: string,dataBase: string): Promise<void> => {
        this.data = this.data.map((item) =>
            item.id === id ? { ...item, user: `Updated ${user}` } : item
        );
        await this.storeData(dataBase);
        this.printData();
    };

    deleteItem = async (id: number,dataBase: string): Promise<void> => {
        this.data = this.data.filter((item) => item.id !== id);
        await this.storeData(dataBase);
        this.printData();
    };
}

