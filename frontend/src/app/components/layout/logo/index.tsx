import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <>
        <Link href="/">
            <Image src={"/images/logo/logo-white.svg"} alt="logo" width={160} height={50} className="block dark:hidden"/>
            <Image src={"/images/logo/logo-dark.svg"} alt="logo" width={160} height={50} className="hidden dark:block"/>
        </Link>
    </>
  )
}

export default Logo
