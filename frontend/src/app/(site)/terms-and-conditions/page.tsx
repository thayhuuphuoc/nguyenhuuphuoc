import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Terms & Condition | Blogforce Sanity Blog Template",
};

export default function Page() {
    return (
        <section>
            <div className="pb-16 md:pb-20 pt-32 md:pt-40 flex flex-col gap-8 md:gap-14 dark:bg-baseInk">
                <div className="container relative z-10">
                    <div className='flex flex-col gap-8 md:gap-14'>
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-3">
                                <Image src="/images/icon/terms-condition.svg" alt="icon" width={20} height={20} />
                                <p className="text-navyGray dark:text-white/80">Terms & Conditions</p>
                            </div>
                            <h1 className="font-semibold">
                                Terms & Conditions
                            </h1>
                        </div>
                        <div className="text-justify">
                            <p className="text-navyGray dark:text-white/80">
                                This Getnextjstemplates Terms of Service (“<span className="font-semibold">Agreement</span>”) is entered into by and between (“<Link href={"https://getnextjstemplates.com/"} className="font-semibold hover:text-primary dark:hover:text-primary">Getnextjstemplates</Link>”) and the entity or person placing an order for or accessing the Services (“<span className="font-semibold">Customer</span>”). This Agreement consists of the terms and conditions set forth below and any Order Form. The “<span className="font-semibold">Effective Date”</span> of this Agreement is the date which is the earlier of (a) Customer’s initial access to the Services through any online provisioning, registration or order process or (b) the Effective Date of the first Order Form. This Agreement will govern Customer’s initial purchase on the Effective Date as well as any future purchases made by Customer that reference this Agreement. Getnextjstemplates may modify this Agreement from time to time as permitted in Section 13.4 (Amendment).
                            </p>
                            <p className="mt-5 text-navyGray dark:text-white/80">
                                Capitalized terms shall have the meanings set forth in Section 1, or in the section where they are first used
                            </p>
                            <div className="my-6">
                                <h5 className="font-semibold">1. Definitions</h5>
                                <ul className="mt-6 text-navyGray dark:text-white/80">
                                    <li>
                                        <p>
                                            <span className="font-semibold">1.1 “Authorized Devices”</span>
                                            means those mobile, desktop, or other devices with which the Services can be accessed and used.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">1.2 “Content”</span>
                                            means code, content, fonts, graphics, designs, documents, or materials created using the Services by Customer and its Users or imported into the Services by Customer and its Users.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p><span className="font-semibold">1.3 “Documentation”</span>
                                            means the technical materials made available by Getnextjstemplates to Customer and/or its Users in hard copy or electronic form describing the use and operation of the Services.</p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">1.4 “Services”</span>
                                            Getnextjstemplates’s proprietary web-based products and services, along with downloadable desktop and mobile apps. Each Order Form will identify details of Customer’s Services subscription.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">
                                                1.5 “Order Form”
                                            </span>
                                            means a document signed by both Parties identifying the Enterprise Services to be made available by Getnextjstemplates pursuant to this Agreement.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">1.6 “Packages”</span>
                                            or
                                            <span className="font-semibold">
                                                “Components”
                                            </span>
                                            means add-on modules made available within the Services. Packages and Components may be created by Getnextjstemplates, Customer or other third parties. Packages and Components created by Getnextjstemplates are supported as part of the Services. Getnextjstemplates will use reasonable efforts to support Customer’s use of Packages and Components created by third parties but disclaims all warranties as to such Packages and Components.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">
                                                1.7 “User”
                                            </span>
                                            means an employee, contractor or other individual associated with Customer who has been provisioned by Customer with access to the Services.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">1.8 “Services”</span>
                                            means Getnextjstemplates’s SaaS product, web design software, tools, along with downloadable desktop and mobile apps. Each Order Form will identify details of Customer’s subscription to the Services.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="my-6">
                                <h5 className="font-semibold">2. License and use rights</h5>
                                <ul className="mt-6 text-navyGray dark:text-white/80">
                                    <li>
                                        <p>
                                            <span className="font-semibold">2.1 Services</span>{" "}
                                            Getnextjstemplates hereby grants Customer a non-exclusive, non-transferable license during the Term (as defined in Section 12) to: (a) use the Services and to download and install desktop or mobile applications as applicable on the number and type of Authorized Devices solely for Customer’s internal business purposes in accordance with the Documentation, and/or (b) use our SaaS product, hosted systems, design software, tools, and build websites under the Getnextjstemplates.app domain.. The Services are delivered electronically.
                                        </p>
                                    </li>
                                    <li className="mt-5">
                                        <p>
                                            <span className="font-semibold">2.2 Provisioning the Services</span>{" "}
                                            Getnextjstemplates will provide to Customer the necessary passwords, security protocols, policies, network links or connections (“Access Protocols”) to allow Customer and its Users to access the Services as described herein; no other access to the website or servers from which the Services are delivered is permitted. Customer will provision its Users  to access and use the features and functions of the Services through the Access Protocols. Customer may select one or more Users to act as administrators and control, manage and use the Services on Customer’s behalf. Customer shall be responsible for all acts and omissions of its Users
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
