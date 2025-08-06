import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { key, tag, path, type = 'page' } = await request.json();

    if (key !== process.env.NEXT_KEY_CACHE_TIME) {
      return createResponse(false, 400);
    }

    if (path) {
      if (Array.isArray(path)) {
        path.forEach((pathname) => revalidatePath(pathname, type));
      } else {
        revalidatePath(path, type);
      }

      return createResponse(true, 200, { path });
    }

    if (tag) {
      if (Array.isArray(tag)) {
        tag.forEach(revalidateTag);
      } else {
        revalidateTag(tag);
      }
      return createResponse(true, 200, { tag });
    }

    return createResponse(false, 200, { tag });
  } catch {
    return createResponse(false, 400);
  }
}

function createResponse(revalidated: boolean, status: number, data: Record<string, any> = {}) {
  return NextResponse.json({ ...data, revalidated, now: Date.now() }, { status });
}
