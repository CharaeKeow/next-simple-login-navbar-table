import {
  GetSecureWordRequestBody,
  GetSecureWordRequestResponseError,
  GetSecureWordRequestResponseSuccess,
} from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

// Note: In real world, this could be something like a Typespec generated type

export const POST = async (
  request: NextRequest
): Promise<
  NextResponse<
    GetSecureWordRequestResponseSuccess | GetSecureWordRequestResponseError
  >
> => {
  try {
    // Get username from request body. No need to do anything since the validation for the username is out of the scope for this app
    const requestBody: GetSecureWordRequestBody = await request.json();

    console.log({ requestBody }); // remained to silent TS error

    return NextResponse.json({ secureWord: 'secure123' }, { status: 200 });
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
