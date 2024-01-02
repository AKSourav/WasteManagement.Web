"use client"
import { useSelector } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    useEffect(() => {
      // Redirect to auth if not authenticated
      if (!isAuthenticated) {
        const pathToRedirect=`/auth?redirect=${pathname}`;
        router.replace(pathToRedirect);
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
