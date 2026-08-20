import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, mode, settings } = body as {
      imageUrl: string;
      mode: string;
      settings?: Record<string, unknown>;
    };

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Se requiere una imagen válida.' },
        { status: 400 }
      );
    }

    if (!mode) {
      return NextResponse.json(
        { error: 'Se requiere un modo de generación.' },
        { status: 400 }
      );
    }

    await new Promise((r) => setTimeout(r, 2000));

    const modelId = `model_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      modelId,
      previewUrl: null,
      modelUrl: null,
      status: 'generating',
      message: 'Modelo en cola de generación',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor.' },
      { status: 500 }
    );
  }
}
