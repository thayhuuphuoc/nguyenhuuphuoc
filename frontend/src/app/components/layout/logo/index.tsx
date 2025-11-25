import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <>
        <Link href="/">
<<<<<<< HEAD
            <Image src={"/images/logo/logo-white.svg"} alt="logo" width={135} height={35} className="block dark:hidden"/>
            <Image src={"/images/logo/logo-dark.svg"} alt="logo" width={135} height={35} className="hidden dark:block"/>
=======
            <Image src={"/images/logo/logo.svg"} alt="logo" width={152} height={50} className="block dark:hidden"/>
            <Image src={"/images/logo/logo-white.svg"} alt="logo" width={152} height={50} className="hidden dark:block"/>
>>>>>>> 0d9e20b2b3304405f0e67b646ee09ab5d14d7782
        </Link>
    </>
  )
}

export default Logo
