export interface Transaction {
  id: string;
  date: string;
  name: string;
  phone: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Workspace {
  id: string;
  name: string;
  chatId: string;
  googleSheetUrl: string;
  createdAt: string;
  transactionCount: number;
}