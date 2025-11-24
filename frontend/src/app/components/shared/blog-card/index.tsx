import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => {
    
  return (
    <div className="shadow-card rounded-md hover:scale-[1.01]">
      <div className="relative w-full h-[240px] overflow-hidden rounded-t-md">
        <Link href={blog?.badge === 'pro' ? '/pricing' : `/blog/${blog?.slug?.current}`}>
          {blog?.mainImage?.asset?.url &&
            <Image
              src={blog?.mainImage?.asset?.url}

              alt="cover-image"
              width={365}
              height={240}
              className="w-full h-full object-cover rounded-t-md"
            />
          }
        </Link>
        {blog?.badge == "pro" &&
          <div className="absolute top-6 right-6 w-fit flex items-center gap-1.5 px-2 py-1 mb-3 bg-shineYellow rounded-md">
            <Image src={"/images/icon/diamond-icon.svg"} alt="diamond-icon" width={20} height={20} />
            <span className="uppercase font-semibold text-white">{blog?.badge}</span>
          </div>
        }
        <span className="absolute bottom-6 right-6 text-xs font-semibold w-fit p-1 px-2.5 text-black bg-white rounded-md capitalize">
          2 min Read
        </span>
      </div>
      <div className="relative p-6 pt-8 flex flex-col gap-5">
        <div className="group absolute -top-6 left-7 z-20">
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
            {blog?.author?.name}
          </div>
          <Image
            src={blog?.author?.image?.asset?.url || "/images/default-author.png"}
            alt="author-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <span className="text-xs font-semibold w-fit p-1 px-2.5 text-navyGray dark:text-white bg-gray dark:bg-white/20 rounded-md capitalize">
          {blog?.categories?.map((cat: any, idx: number) => (
            <span key={idx} className="">
              {cat.title}
            </span>
          ))}
        </span>
        <Link href={blog?.badge === 'pro' ? '/pricing' : `/blog/${blog?.slug.current}`}>
          <h6 className="text-navyGray dark:text-white font-semibold line-clamp-2">{blog.title}</h6>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Image src={"/images/icon/eye-black-icon.svg"} alt="eye-icon" width={18} height={18} className="block dark:hidden" />
                <Image src={"/images/icon/eye-white-icon.svg"} alt="eye-icon" width={18} height={18} className="hidden dark:block" />
                <p className="text-sm text-navyGray dark:text-white/80">213</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src={"/images/icon/message-black-icon.svg"} alt="message-icon" width={18} height={18} className="block dark:hidden" />
                <Image src={"/images/icon/message-white-icon.svg"} alt="message-icon" width={18} height={18} className="hidden dark:block" />
                <p className="text-sm text-navyGray dark:text-white/80">3</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path>
            </svg>
            <p className="text-xs text-navyGray dark:text-white/80 font-medium">
              {new Date(blog?.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
