import Image from "next/image"
import Link from "next/link"
import ContactForm from "./ContactForm"

const ContactUs = () => {
    return (
        <section>
            <div className="dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-7 md:gap-14 py-20 pt-28 md:pt-40">
                        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left items-center justify-between">
                            <h1 className="font-semibold">We'd love to hear from you</h1>
                            <div className="flex items-center gap-4">
                                <Link href={"/"} className="text-navyGray dark:text-white/80 hover:text-primary dark:hover:text-primary font-semibold">
                                    HOME
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 6l6 6l-6 6"></path>
                                </svg>
                                <p className="text-navyGray dark:text-white/80 font-semibold"> CONTACT US</p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start gap-8">
                            <div className="relative bg-primary rounded-md w-full lg:max-w-sm">
                                <Image src={"/images/contact/contact-bg.png"} alt="contact-bg" width={150} height={150} className="absolute right-0 top-0" />
                                <div className="relative z-10 p-7">
                                    <div className="flex flex-col gap-4">
                                        <h6 className="text-white font-bold">Reach Out Today</h6>
                                        <p className="text-white">Have questions or need assistance? We're just a message away.</p>
                                    </div>
                                    <div className="my-8 h-px border-0 border-t border-white/20" />
                                    <div className="flex flex-col gap-4">
                                        <h6 className="text-white font-bold">Our Location</h6>
                                        <p className="text-white">Visit us in person or find our contact details to connect with us directly.</p>
                                    </div>
                                </div>
                            </div>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs