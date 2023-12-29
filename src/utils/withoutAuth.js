"use client"
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const withoutAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect=searchParams.get('redirect');
    
    useEffect(() => {
      // Redirect to if authenticated to dashboard
      if (isAuthenticated) {
        const pathToRedirect=redirect?redirect:`/dashboard`;
        router.replace(pathToRedirect);
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if not authenticated
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withoutAuth;
