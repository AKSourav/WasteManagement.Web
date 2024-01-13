import { NextRequest,NextResponse } from "next/server";

export async function GET(request)
{
    const postalCode = request.url.split('pincode/')[1];
    // console.log(postalCode);
    const pincodeUrl = `http://www.postalpincode.in/api/pincode/${postalCode}`;

    try {
        console.log(postalCode);
      const pincodeResponse = await fetch(pincodeUrl);
      const pincodeData = await pincodeResponse.json();
        console.log(pincodeData);
        return NextResponse.json(pincodeData);

    } catch (error) {
        return NextResponse.json({error:error.message});
    }
}