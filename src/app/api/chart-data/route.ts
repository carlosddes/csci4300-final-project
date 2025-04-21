import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';
import Income from '@/models/IncomeSchema';
import Expense from '@/models/ExpenseSchema';

function parseAmount(str: string): number {
  // Remove the $ and commas, then parse as float
  return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
}

export async function GET() {
  await connectMongoDB();

  const incomes = await Income.find();
  const expenses = await Expense.find();

  const totalIncome = incomes.reduce((sum, item) => sum + parseAmount(item.amount), 0);
  const totalExpense = expenses.reduce((sum, item) => sum + parseAmount(item.amount), 0);

  const chartData = [
    ['Type', 'Amount'],
    ['Income', totalIncome],
    ['Expenses', totalExpense],
  ];

  return NextResponse.json(chartData);
}
