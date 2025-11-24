import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <>
        <Link href="/">
            <Image src={"/images/logo/logo.svg"} alt="logo" width={135} height={35} className="block dark:hidden"/>
            <Image src={"/images/logo/logo-white.svg"} alt="logo" width={135} height={35} className="hidden dark:block"/>
        </Link>
    </>
  )
}

export default Logo