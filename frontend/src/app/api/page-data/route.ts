import { NextResponse } from "next/server";

const pricingList = [
  {
    plan_name: 'Silver',
    plan_img: "/images/pricing/silver-medal.png",
    plan_price: '10.99',
    plan_feature: [
      'Up to 10 Blog Authors',
      'Advanced Blog Template Customization',
      '25GB Media Upload Limit',
      'Daily Content Sync',
      'Enhanced SEO & Analytics'
    ],
  },
  {
    plan_name: 'Gold',
    plan_img: "/images/pricing/gold-medal.png",
    popular: 'Popular',
    plan_price: '22.99',
    plan_feature: [
      'Unlimited Blog Authors',
      'Full Template Library Access',
      '100GB Media Upload Limit',
      'Real-Time Content Sync',
      'Advanced SEO + Schema Support'
    ],
  },
  {
    plan_name: 'Bronze',
    plan_img: "/images/pricing/bronze-medal.png",
    plan_price: 'Free',
    plan_feature: [
      'Up to 3 Blog Authors',
      'Multiple Blog Templates',
      '10GB Media Upload Limit',
      'Weekly Content Sync',
      'SEO Tools & Meta Support'
    ],
  },
]

const blogCommentList = [
  {
    "name": "Sophie Hamilton",
    "image":"/images/avatar/user-5.jpg",
    "comment": "This blog was incredibly insightful! I’ve always wanted to explore Thailand beyond the typical tourist spots. Thanks for the travel tips!"
  },
  {
    "name": "Don Turner",
    "image":"/images/avatar/user-6.jpg",
    "comment": "I loved reading about the hidden gems in Thailand. The writing style is engaging, and the photos really brought the places to life."
  },
  {
    "name": "Rodney Russell",
    "reply": true,
    "image":"/images/avatar/user-7.jpg",
    "comment": "Great article. I’ve visited Thailand twice, and this gave me new ideas for my next trip. Especially intrigued by the quiet retreats you mentioned."
  },
  {
    "name": "Lelia Mason",
    "image":"/images/avatar/user-8.jpg",
    "comment": "This was such a refreshing read. It’s nice to see a blog that focuses on more than just the popular beaches. Keep up the good work!"
  }
]


export const GET = async () => {
  return NextResponse.json({
    pricingList,
    blogCommentList
  });
};