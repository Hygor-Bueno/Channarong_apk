/* eslint-disable prettier/prettier */
export default class Util {
    toDay(): string {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        const formatDate = `${year}-${month}-${day}`;
        return formatDate;
    }
    datePtBR(date: string): string {
        const newDate: string[] = date.split('-');
        return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
    }
}

/*
    let n = new Date(pupil.payment_date);
    console.log(new Date(n.setMonth(n.getMonth() + 1)));
*/