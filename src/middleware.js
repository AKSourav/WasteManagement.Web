import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const refreshToken= request.cookies.get('refresh') || null;
  
  const pathname=request.nextUrl.pathname;
  const search=request.nextUrl.search.slice(1).split('&');
  const query={};
  search.forEach(element => {
    const key=element.split('=')[0];
    const value=element.split('=')[1];
    if(key)
        query[key]=value;
  });
  const {redirect}=query;
  if(refreshToken && pathname==='/auth') 
    return NextResponse.redirect(new URL(redirect?redirect:'/dashboard', request.url))
  if(!refreshToken && pathname!=='/auth')
    return NextResponse.redirect(new URL(`/auth${pathname.split('/')[1]==='dashboard'?`?redirect=${pathname}`:``}`, request.url))
//   console.log(request.nextUrl);
//   console.log("refresh:",refreshToken);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth','/dashboard/:path*'],
}