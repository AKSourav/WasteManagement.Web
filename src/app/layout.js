import { Inter, Roboto } from 'next/font/google'
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import StoreProvider from '@/utils/redux/StoreProvider';
import Wrapper from '@/utils/RefreshWrapper/Wrapper';
const roboto= Roboto({
  weight:'400',
  subsets: ['latin'],
  display: 'swap'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body 
        // className={inter.className}
        >
        <StoreProvider>
          <Navbar />
          <Wrapper>
            <div className='dark:bg-slate-700 dark:text-white'>
              {children}
            </div>
          </Wrapper>
        </StoreProvider>
      </body>
    </html>
  )
}
