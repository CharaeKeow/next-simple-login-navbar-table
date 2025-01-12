import {
  PostLoginRequestBody,
  PostLoginResponseError,
  PostLoginResponseSuccess,
} from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  request: NextRequest
): Promise<NextResponse<PostLoginResponseSuccess | PostLoginResponseError>> => {
  try {
    const requestBody: PostLoginRequestBody = await request.json();

    console.log({ requestBody });

    // This would be the logic to verify user, compare password, etc. Out of scope for this app

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};
