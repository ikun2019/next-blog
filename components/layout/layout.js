import MainNavigation from './main-navigation';

const layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  )
}

export default layout