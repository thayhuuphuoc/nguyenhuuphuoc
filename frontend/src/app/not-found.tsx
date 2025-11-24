
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Page | Blogforge ",
};

const ErrorPage = () => {
  return (
    <section>
      <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
        <div className='container'>
          <div className='flex flex-col items-center gap-8'>
            <div>
              <Image
                src={'/images/notfound/errorimg.svg'}
                alt='Not Found Image'
                height={400}
                width={500}
              />
            </div>
            <div className='flex flex-col gap-6 justify-center items-center max-w-xl text-center'>
              <h2 className="font-normal">
                Oops! The page you are looking for doesn't exist
              </h2>
              <Link href={"/"} className="bg-transparent hover:bg-black dark:hover:bg-white px-6 py-3 border border-black dark:border-white font-medium text-black dark:text-white hover:text-white dark:hover:text-black rounded-md transition-colors duration-500 ease-in-out">
              <span  className="">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
