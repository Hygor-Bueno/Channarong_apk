/* eslint-disable prettier/prettier */

import React, { useEffect, useState, useContext, createContext } from 'react';
import type { PropsWithChildren } from 'react';
import { IPupil } from '../Interfaces/iDataBaseLocal';
import { DataBaseLocal } from '../Class/DataBaseLocal';
import Util from '../Util/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IChannarongContext {
    listPupil: IPupil[];
    setListPupil: React.Dispatch<React.SetStateAction<IPupil[]>>;
}

const MyContext = createContext<IChannarongContext>({
    listPupil: [],
    setListPupil: () => { }
});

export function useChannarongContext() {
    return useContext(MyContext);
}

type Props = PropsWithChildren<{}>;
export default function ChannarongProvider(props: Props) {
    const [listPupil, setListPupil] = useState<IPupil[]>([]);
    useEffect(() => {
        async function init(): Promise<void> {
            let db = new DataBaseLocal();
            let reqPupil = await db.fetchData('pupil');
            if (!reqPupil.error) {
                let list = validatePayments(reqPupil.data);
                setListPupil(list);
                updateList(list);
            }
        }

        function validatePayments(list: IPupil[]) {
            const util = new Util();
            let date = util.dbDate();
            list.forEach((pupil: IPupil) => {
                if (pupil.payment_date < date) {
                    pupil.status = 2;
                }
            });
            return list;
        }

        async function updateList(datas: IPupil[]) {
            await AsyncStorage.setItem('pupil', JSON.stringify(datas));
        }

        init();
    }, []);

    const contextValue: IChannarongContext = {
        listPupil,
        setListPupil
    };

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
}
