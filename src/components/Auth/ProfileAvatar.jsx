import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfileAvatar = ({ onLogout, className, user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  const handleOptionSelect = (option) => {
    switch (option) {
      case 'Profile': router.push('/profile');
        break;
      case 'Settings': router.push('/settings');
        break;
    }
    setDropdownOpen(false);
  };

  return (
    <div
      className={` dark:bg-gray-800 relative inline-block group ${className}`}
      onMouseEnter={() => handleDropdownToggle(true)}
    >
      <img
        className="rounded-full h-10 w-10 object-cover cursor-pointer transition duration-300 transform group-hover:scale-110"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_367ZesPhTFsoj7ZOm8JH1eVvOZEIBpdIA"
        alt="Profile"
      />
      {isDropdownOpen && (
        <div
          style={{ zIndex: 99999999 }}
          className="w-36 absolute top-12 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-2 rounded shadow-md"
          onMouseEnter={() => handleDropdownToggle(true)}
          onMouseLeave={() => handleDropdownToggle(false)}
        >
          <button
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 dark:bg-gray-800"
            onClick={() => handleOptionSelect('Profile')}
          >
            Hello, {user?.email?.split('@')[0]}
          </button>
          <button
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 dark:bg-gray-800"
            onClick={() => handleOptionSelect('Settings')}
          >
            Settings
          </button>
          <button
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 dark:bg-gray-800"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
