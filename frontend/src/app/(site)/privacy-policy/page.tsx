import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Privacy Policy | Blogforge Sanity Blog Template",
};

export default function Page() {
    return (
        <section>
            <div className="pb-14 md:pb-20 pt-40 flex flex-col gap-8 md:gap-14 dark:bg-baseInk">
                <div className="container relative z-10">
                    <div className='flex flex-col gap-8 md:gap-14'>
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-3">
                                <Image src="/images/icon/privacy-policy.svg" alt="icon" width={20} height={20} />
                                <p className="text-navyGray dark:text-white/80">Privacy Policy</p>
                            </div>
                            <h1 className="font-semibold">
                                Privacy Policy
                            </h1>
                        </div>

                        <div>
                            <p className="text-navyGray dark:text-white/80 text-justify">
                                This Privacy Statement explains how personal information about our (potential) customers and other individuals using our services is collected, used, and disclosed by **Getnextjstemplates Template** ("us", "we", "our"). This Privacy Statement describes our privacy practices in relation to the use of our websites, including any customer portals or interactive websites <Link href="https://getnextjstemplates.com/" className="text-black dark:text-white hover:text-primary dark:hover:text-primary">(https://getnextjstemplates.com/)</Link>, our software (Next.js), services, solutions, tools, and related applications, services, and programs, including research and marketing activities, offered by us (the "Services").

                                By signing up for our Services and agreeing to our General Terms and Conditions, you consent to the collection, usage, storage, and disclosure of your information as described in this Privacy Statement.

                                Our Services may contain links to external websites or services. The privacy practices and content of such sites or services will be governed by their respective privacy policies.

                                We may update this Privacy Statement periodically. If changes occur, we will notify you by updating the date at the top of the statement and providing additional notifications (such as a statement on our homepage or an email notification). We encourage you to review this Privacy Statement whenever you use our Services to stay informed about how we handle your information.
                                This Privacy Statement explains how Personal Information about our (potential) customers and other individuals using our services is collected, used and disclosed by Getnextjstemplates, Getnextjstemplates Inc. and its respective affiliates ("us", "we", "our" or "Getnextjstemplates"). This Privacy Statement describes our privacy practices in relation to the use of our websites (including any customer portal or interactive customer website)
                            </p>

                            <p className="text-navyGray dark:text-white/80 text-justify">By signing up to our Services and by agreeing to our General Terms and Conditions required to use certain of our Services, you agree to the collection, usage, storage and disclosure of information described in this Privacy Statement.</p>

                            <p className="text-navyGray dark:text-white/80 text-justify">Our Services may contain links to other websites or services; and information practices and/or the content of such other websites or services shall be governed by the privacy statements of such other websites or services.</p>

                            <p className="text-navyGray dark:text-white/80 text-justify">We may change this Privacy Statement from time to time. If we make changes, we will notify you by revising the date at the top of the statement and providing you with additional notifications of such (such as adding a statement to our homepage, in our Getnextjstemplates Preview app or sending you a notification). We encourage you to review the Privacy Statement whenever you use our Services to stay informed about our information practices and the ways you can help protect your privacy.</p>

                            <div className="my-6">
                                <h5 className="font-semibold">Personal information collection </h5>
                                <p className="mt-6 text-navyGray dark:text-white/80 text-justify">
                                    While using our Services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. For example, we collect information when you create an account, request customer support or otherwise communicate with us. The types of information we may collect include basic user information (such as your name, email address, social media avatar, telephone number and photograph), company information and any other information you choose to provide.
                                </p>

                                <p className="mt-6 text-navyGray dark:text-white/80 text-justify">
                                    We will not collect financial information from you (such as your payment card number, expiration date or security code). All payments to us are handled via a third party, Getnextjstemplates Ltd{" "}
                                    <Link href="https://getnextjstemplates.com/" className="text-black dark:text-white hover:text-primary dark:hover:text-primary">(https://getnextjstemplates.com/)</Link>. We refer to their Privacy Statement <Link href="https://getnextjstemplates.com/" className="text-black dark:text-white hover:text-primary dark:hover:text-primary">(https://getnextjstemplates.com/)</Link>.
                                </p>

                            </div>
                            <div className="my-6">
                                <h5 className="font-semibold">Personal information you provide to us</h5>
                                <p className="mt-6 text-navyGray dark:text-white/80 text-justify">
                                    While using our Services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. For example, we collect information when you create an account, request customer support or otherwise communicate with us. The types of information we may collect include basic user information (such as your name, email address, social media avatar, telephone number and photograph), company information and any other information you choose to provide.
                                </p>
                                <p className="mt-6 text-navyGray dark:text-white/80 text-justify">
                                    We will not collect financial information from you (such as your payment card number, expiration date or security code). All payments to us are handled via a third party, Getnextjstemplates
                                    <Link href="https://getnextjstemplates.com/" className="text-black dark:text-white hover:text-primary dark:hover:text-primary">(https://getnextjstemplates.com/)</Link>. We refer to their Privacy Statement <Link href="https://getnextjstemplates.com/" className="text-black dark:text-white hover:text-primary dark:hover:text-primary">(https://getnextjstemplates.com/)</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
