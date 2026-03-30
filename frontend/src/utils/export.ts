import { Transaction } from '../types';
import { formatDate } from './format';

export function exportTransactionsToCSV(
transactions: Transaction[],
filename: string = 'transactions.csv')
{
  const headers = [
  'ID',
  'Date',
  'Name',
  'Phone',
  'Amount (KES)',
  'Description',
  'Status'];


  const rows = transactions.map((t) => [
  t.id,
  formatDate(t.date).replace(/,/g, ''), // Remove commas to avoid CSV issues
  `"${t.name}"`,
  t.phone,
  t.amount,
  `"${t.description}"`,
  t.status]
  );

  const csvContent = [
  headers.join(','),
  ...rows.map((row) => row.join(','))].
  join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}