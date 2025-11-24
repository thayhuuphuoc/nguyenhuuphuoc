import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ author }: any) => {
    return (
        <div className="group flex flex-col px-8 py-6 gap-4 items-center text-center shadow-card rounded-md hover:scale-[1.01]">
            <Link href={`/author/${author?.author?.slug?.current}`}>
                <Image src={author?.author?.image?.asset?.url} alt="author-image" width={80} height={80} className="rounded-full" />
            </Link>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center gap-1">
                    <Link href={`/author/${author?.author?.slug?.current}`}>
                        <h6 className="text-navyGray dark:text-white font-semibold">{author?.author?.name}</h6>
                    </Link>
                    <p className="text-xs text-navyGray dark:text-white/80">{author?.author?.position}</p>
                </div>
                <p className="text-navyGray dark:text-white/80">{author?.author?.bio[0]?.children[0]?.text}</p>
            </div>
        </div>
    );
};

export default AuthorCard;
