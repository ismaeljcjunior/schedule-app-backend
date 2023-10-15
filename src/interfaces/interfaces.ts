export interface INotifyPendingProps {
    id: number
    clientName: String
    clientNumber: String
    observation: String
    dateExecution: Date
    dateScheduled?: Date
    status: String
    createdAt: Date
    updatedAt: Date
}