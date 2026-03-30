import { Transaction, Workspace } from '../types';

const names = [
'John Kamau',
'Mary Wanjiku',
'Peter Ochieng',
'Grace Muthoni',
'David Kipchoge',
'Sarah Njoroge',
'James Mwangi',
'Lucy Wambui',
'Kevin Omondi',
'Faith Akinyi',
'Michael Mutua',
'Esther Nduta'];


const descriptions = [
'Payment for goods',
'Service fee',
'Monthly subscription',
'Delivery payment',
'Consultation fee',
'Invoice #1029',
'Software license',
'Utility bill'];


export const generateMockTransactions = (count: number = 30): Transaction[] => {
  return Array.from({ length: count }).
  map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    );

    return {
      id: `TRX${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      date: date.toISOString(),
      name: names[Math.floor(Math.random() * names.length)],
      phone: `2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
      amount: Math.floor(Math.random() * 49950) + 50,
      description:
      descriptions[Math.floor(Math.random() * descriptions.length)],
      status:
      Math.random() > 0.1 ?
      'completed' :
      Math.random() > 0.5 ?
      'pending' :
      'failed'
    };
  }).
  sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateMockWorkspaces = (): Workspace[] => {
  return [
  {
    id: 'ws_1',
    name: 'Main Store Receipts',
    chatId: '12036302918273645@g.us',
    googleSheetUrl:
    'https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    transactionCount: 1250
  },
  {
    id: 'ws_2',
    name: 'Online Deliveries',
    chatId: '12036302918273646@g.us',
    googleSheetUrl:
    'https://docs.google.com/spreadsheets/d/0J9I8H7G6F5E4D3C2B1A/edit',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    transactionCount: 432
  }];

};