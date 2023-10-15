import venom from 'venom-bot';

venom
    .create({
        session: 'session-name'
    })
    .then((client: any) => start(client))
    .catch((erro: any) => {
        console.log(erro);
    });

function start(client: { onMessage: (arg0: (message: any) => void) => void; sendText: (arg0: any, arg1: string) => Promise<any>; }) {
    client.onMessage((message: { body: string; isGroupMsg: boolean; from: any; }) => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then((result: any) => {
                    console.log('Result: ', result); 
                })
                .catch((erro: any) => {
                    console.error('Error when sending: ', erro); 
                });
        }
    });
}