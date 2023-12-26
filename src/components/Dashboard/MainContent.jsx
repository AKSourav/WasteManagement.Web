"use client"
import { useRouter } from 'next/navigation';

const MainContent = () => {
  const router = useRouter();

  return (
    <main className={`p-4 ${router.pathname === '/dashboard' ? 'lg:pl-64' : ''}`}>
      {router.pathname === '/dashboard' && <DashboardContent />}
      {router.pathname === '/profile' && <ProfileContent />}
    </main>
  );
};

const DashboardContent = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard Content</h1>
      {/* Add your stylish dashboard content here */}
    </>
  );
};

const ProfileContent = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Profile Content</h1>
      {/* Add your stylish profile content here */}
    </>
  );
};

export default MainContent;
