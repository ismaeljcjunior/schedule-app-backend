import { PrismaClient } from '@prisma/client';
import schedule from 'node-schedule';
import { INotifyPendingProps } from '../../interfaces/interfaces';


const prisma = new PrismaClient();

async function getPendingNotificationsWithTodayDate() {
    console.log('getPendingNotificationsWithTodayDate');
    try {
        const today = new Date();
        const currentDay = today.getUTCDate();

        const notificationsPending = await prisma.$queryRawUnsafe<INotifyPendingProps[]>(
            `SELECT * FROM notifications WHERE DATE(dateScheduled) = CURDATE() AND status = 'aguardando';`
        );

        const notificationsToday = notificationsPending.filter((notificacao) => {
            return extractDay(notificacao.dateScheduled, currentDay) !== null;
        });

        console.log('Notificações aguardando com data de hoje:', notificationsToday);
    } catch (error) {
        console.error('Erro ao buscar notificações aguardando com data de hoje:', error);
    }
}


function extractDay(dateScheduled: string | number | Date | undefined, currentDay: number) {
    if (dateScheduled === undefined) {
        throw new Error("A data programada está indefinida.");
    }

    const data = new Date(dateScheduled);
    const dia = data.getUTCDate();

    if (dia === currentDay) {
        return dateScheduled;
    } else {
        return null; // Se não for o mesmo dia, retorne null
    }
}



getPendingNotificationsWithTodayDate();

const job = schedule.scheduleJob('*/2 * * * *', () => {
    console.log('Executando tarefa a cada 2 minutos');
    getPendingNotificationsWithTodayDate();
});
