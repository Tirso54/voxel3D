import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { modelId, material, size, color } = body as {
      modelId?: string;
      material?: string;
      size?: string;
      color?: string;
    };

    if (!modelId || typeof modelId !== 'string') {
      return NextResponse.json({ error: 'Se requiere un modelId válido.' }, { status: 400 });
    }
    if (!material) {
      return NextResponse.json({ error: 'Se requiere un material.' }, { status: 400 });
    }
    if (!size) {
      return NextResponse.json({ error: 'Se requiere un tamaño.' }, { status: 400 });
    }

    return NextResponse.json({
      orderId: `order_${Date.now()}`,
      status: 'pending',
      material,
      size,
      color: color || null,
      message: 'Pedido registrado correctamente',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al crear el pedido.' },
      { status: 500 }
    );
  }
}
