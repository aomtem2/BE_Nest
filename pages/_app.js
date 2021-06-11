import '../styles/globals.css'
import '../styles/admin.css'
import '../styles/login.css';
import '../styles/userManagement.css';
import '../styles/sidebar.css';
import '../styles/table.css';
import '../styles/staff.css';
import LayoutA from './component/LayoutA';

function MyApp({ Component, pageProps }) {

  return (
    <LayoutA>
      <Component {...pageProps} />
    </LayoutA>
  )
}

export default MyApp
