import { NextResponse } from 'next/server';

const mockModels = [
  {
    id: '1',
    name: 'Mi primer modelo',
    mode: 'relief',
    status: 'completed',
    createdAt: '2025-01-15',
  },
  {
    id: '2',
    name: 'Lithophane familiar',
    mode: 'lithophane',
    status: 'completed',
    createdAt: '2025-01-14',
  },
];

export async function GET() {
  return NextResponse.json(mockModels);
}
