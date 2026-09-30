import { ROUTES } from '@/lib/site';

// Content for the service / resource pages. Each entry renders through
// components/ServicePage.js with matching metadata, breadcrumbs and JSON-LD.
export const PAGES = {
  griefCoaching: {
    path: ROUTES.griefCoaching,
    metaTitle: 'Grief Coaching in Berlin, MD | Toni Ward Grief Coaching',
    description:
      'Compassionate, personalized grief coaching in Berlin, MD and online across Maryland. Certified grief coach Toni Ward helps you process loss and find hope again.',
    eyebrow: 'Personalized Grief Coaching',
    h1: 'Personalized Grief Coaching in Berlin, MD',
    lead:
      'Grief is not a problem to be solved — it is a journey to be walked. Toni Ward offers one-on-one coaching that meets you exactly where you are, with gentle structure, practical tools and a safe place to honor the person you love.',
    serviceType: 'Grief coaching',
    sections: [
      {
        h2: 'What grief coaching looks like',
        body: [
          'Grief coaching is a forward-looking, supportive partnership. Together we make space for the full weight of your loss while also gently exploring what healing, meaning and purpose can look like for you now.',
          'Sessions are available in person at Toni’s Berlin office or through secure online video, so you can receive support from anywhere in Maryland and beyond.',
        ],
      },
      {
        h2: 'The B.R.E.A.T.H.E. approach',
        body: [
          'Toni is a certified grief coach who specializes in the B.R.E.A.T.H.E. model — a compassionate framework that helps you slow down, understand what you are carrying and take manageable steps toward a life that still holds hope.',
          'In your first session Toni will walk you through the approach and, together, you will outline your needs and goals for the healing journey ahead.',
        ],
      },
      {
        h2: 'Who grief coaching can help',
        bullets: [
          'Anyone grieving the death of a spouse, partner, parent, child, sibling or friend',
          'People who feel “stuck” months or years after a loss',
          'Those navigating anniversaries, holidays and other difficult days',
          'Anyone who wants faith-informed, compassionate support',
          'People rebuilding identity, routines and purpose after a loss',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is grief coaching the same as therapy?',
        a: 'No. Grief coaching is a supportive, goal-oriented partnership focused on healing and moving forward while honoring your loss. It does not diagnose or treat mental health conditions. If you need clinical care, Toni can help you find a licensed professional.',
      },
      {
        q: 'Do you offer online grief coaching?',
        a: 'Yes. Sessions are available through secure, private video calls so you can join from home anywhere in Maryland and beyond.',
      },
      {
        q: 'How do I get started?',
        a: 'Start with a complimentary 30-minute consultation call. You can call, email or send a message through the contact page to schedule a time.',
      },
    ],
    related: ['individual', 'widow', 'speaking'],
  },

  individual: {
    path: ROUTES.individual,
    metaTitle: 'Individual Grief Support in Berlin, MD | Toni Ward Grief Coaching',
    description:
      'One-on-one grief support sessions in Berlin, MD and online. Private, confidential coaching tailored to your unique loss, pace and goals.',
    eyebrow: 'One-on-One Support',
    h1: 'Individual Grief Support in Berlin, MD',
    lead:
      'No two losses are alike, and no two healing journeys look the same. Individual sessions give you private, unhurried time with a certified grief coach who has walked this road herself.',
    serviceType: 'Individual grief support',
    sections: [
      {
        h2: 'Private, confidential sessions',
        body: [
          'Meet in person at Toni’s office in Berlin, MD, or connect by secure video from the comfort of home. Every session is confidential and centered entirely on you — your story, your loved one and what you need right now.',
        ],
      },
      {
        h2: 'What we work on together',
        bullets: [
          'Processing difficult emotions such as guilt, anger, regret and fear',
          'Creating healthy daily rhythms when everything feels upside down',
          'Preparing for anniversaries, birthdays and holidays',
          'Honoring your loved one through meaningful rituals and legacy projects',
          'Rediscovering hope, identity and purpose',
        ],
      },
      {
        h2: 'A coach who understands',
        body: [
          'After losing her husband suddenly in 2016, Toni dedicated her life to helping others navigate grief. She has supported grieving people in funeral homes, hospices and churches and brings that lived experience — along with formal training — to every session.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long are individual sessions?',
        a: 'Most sessions are about an hour. During your free consultation you and Toni will talk about the rhythm and number of sessions that feel right for you.',
      },
      {
        q: 'Do I need a referral?',
        a: 'No referral is needed. Simply reach out by phone, email or the contact form to schedule a complimentary consultation.',
      },
    ],
    related: ['griefCoaching', 'widow', 'resources'],
  },

  widow: {
    path: ROUTES.widow,
    metaTitle: 'Widow Support in Berlin, MD | Toni Ward Grief Coaching',
    description:
      'Compassionate widow and widower support in Berlin, MD — personalized coaching, online video sessions, workshops and speaking to help you heal and rebuild after losing a spouse.',
    eyebrow: 'Widow & Widower Coaching',
    h1: 'Widow Support in Berlin, MD',
    lead:
      'Losing a spouse changes everything — your home, your plans, even the way you see yourself. Toni became a widow suddenly at 38, and she understands this road from the inside.',
    serviceType: 'Widow support coaching',
    sections: [
      {
        h2: 'Specialized support after the loss of a spouse',
        body: [
          'Widow coaching focuses on the unique challenges that follow the death of a husband, wife or partner: rebuilding identity, navigating new responsibilities, parenting through grief and finding hope for the future.',
        ],
      },
      {
        h2: 'Virtual widow coaching sessions',
        body: [
          'Secure video sessions give you personalized guidance with the flexibility and comfort of joining from home — available to clients in Maryland and beyond.',
        ],
      },
      {
        h2: 'Areas we can explore',
        bullets: [
          'Who am I now? Rebuilding identity after marriage',
          'Managing the practical and financial changes that follow a loss',
          'Supporting children and family while grieving yourself',
          'Friendships, family dynamics and feeling “left out”',
          'Dating, remarriage and new beginnings — when and if you are ready',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is widow coaching only for recent losses?',
        a: 'Not at all. Some clients reach out within weeks, others many years later. Grief does not follow a timeline, and support is available whenever you need it.',
      },
      {
        q: 'Do you work with widowers too?',
        a: 'Yes. Toni supports anyone who has lost a spouse or life partner.',
      },
    ],
    related: ['griefCoaching', 'individual', 'membership'],
  },

  speaking: {
    path: ROUTES.speaking,
    metaTitle: 'Public Speaking & Grief Workshops | Toni Ward Grief Coaching',
    description:
      'Grief workshops, webinars and speaking engagements for churches, hospices, funeral homes, schools and organizations in Maryland and beyond.',
    eyebrow: 'Public Speaking & Workshops',
    h1: 'Grief Workshops & Public Speaking',
    lead:
      'Toni helps communities, congregations and organizations understand grief and support the grieving people among them — with warmth, honesty and practical takeaways.',
    serviceType: 'Grief workshops and public speaking',
    sections: [
      {
        h2: 'Popular workshop topics',
        bullets: [
          'Surviving the holidays after a loss',
          'Guilt and regret in grief',
          'Anniversaries and other difficult days',
          'Rebuilding identity after the loss of a spouse',
          'Faith and grief: where they meet',
          'How to support a grieving friend, employee or church member',
        ],
      },
      {
        h2: 'Who books Toni',
        body: [
          'Churches and ministries, hospices, funeral homes, widow and bereavement groups, workplaces, schools and community organizations. Sessions can be delivered in person or as a live webinar.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can workshops be customized?',
        a: 'Yes. Toni tailors every talk and workshop to your audience, time frame and goals.',
      },
      {
        q: 'Do you travel for speaking engagements?',
        a: 'Toni speaks throughout the Eastern Shore and Maryland, and offers virtual presentations for audiences anywhere.',
      },
    ],
    related: ['griefCoaching', 'widow', 'resources'],
  },

  resources: {
    path: ROUTES.resources,
    metaTitle: 'Grief Support Resources | Toni Ward Grief Coaching',
    description:
      'Grief recovery tools and community resources from Toni Ward Grief Coaching — coping strategies, support groups, reading and crisis contacts for Berlin, MD and beyond.',
    eyebrow: 'Resources',
    h1: 'Grief Recovery Tools & Community Resources',
    lead:
      'Healing happens in community. These tools and resources can support you between sessions — or help you take a first step if you are not ready to talk yet.',
    serviceType: 'Grief support resources',
    sections: [
      {
        h2: 'Everyday grief tools',
        bullets: [
          'Journaling prompts to put feelings into words',
          'Breathing and grounding practices for overwhelming moments',
          'Creating a “hard days” plan for anniversaries and holidays',
          'Simple rituals to honor and remember your loved one',
          'Gentle routines for sleep, nutrition and movement',
        ],
      },
      {
        h2: 'Community support',
        body: [
          'Local churches, hospice bereavement programs and peer support groups for widowed people can offer connection with others who understand. Toni is happy to point you toward options near Berlin, Ocean City and Salisbury.',
        ],
      },
      {
        h2: 'If you are in crisis',
        body: [
          'Grief coaching is not an emergency service. If you are thinking about harming yourself, call or text 988 (Suicide & Crisis Lifeline) or call 911 right away.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Where can I find more videos from Toni?',
        a: 'Visit the Videos & Resources page for Toni’s YouTube content, or join the membership area for exclusive sessions.',
      },
    ],
    related: ['videos', 'membership', 'griefCoaching'],
  },

  videos: {
    path: ROUTES.videos,
    metaTitle: 'Toni Ward Grief Coaching YouTube Channel | Support & Healing',
    description:
      'Watch Toni Ward’s videos on grief support, widow coaching and personal healing — practical guidance and encouragement for life after loss.',
    eyebrow: 'Videos & Resources',
    h1: 'Grief Support Videos & Resources',
    lead:
      'Short, heartfelt videos with practical guidance and encouragement for your grief journey — watch whenever you need a reminder that you are not alone.',
    serviceType: 'Grief support videos',
    showVideos: true,
    sections: [
      {
        h2: 'What you will find',
        bullets: [
          'Insights on grief and the healing process',
          'Encouragement for widows and widowers',
          'Tips for navigating holidays and anniversaries',
          'Faith-based reflections on loss and hope',
        ],
      },
    ],
    faqs: [],
    related: ['membership', 'resources', 'widow'],
  },

  membership: {
    path: ROUTES.membership,
    metaTitle: 'Grief Support Membership Area | Toni Ward Grief Coaching',
    description:
      'Exclusive grief support membership with a growing library of video sessions, coping strategies, guided meditations and talks from Toni Ward.',
    eyebrow: 'Membership',
    h1: 'Grief Support Membership Area',
    lead:
      'A private, growing library of support you can return to any time — especially on the long nights and hard days.',
    serviceType: 'Grief support membership',
    sections: [
      {
        h2: 'Inside the membership',
        bullets: [
          'Exclusive video sessions with Toni',
          'Practical coping strategies and worksheets',
          'Guided meditation and breathing practices',
          'Insightful talks on widowhood, faith and rebuilding',
          'Community encouragement from people who understand',
        ],
      },
      {
        h2: 'How to join',
        body: [
          'Reach out through the contact page or call to learn about membership options and receive your access details.',
        ],
      },
    ],
    faqs: [],
    related: ['videos', 'resources', 'griefCoaching'],
  },
};

export const SERVICE_CARDS = [
  {
    key: 'griefCoaching',
    title: 'Grief Coaching',
    text: 'One-on-one coaching sessions tailored to your unique journey through loss, helping you process emotions and find new purpose.',
    icon: 'heart',
  },
  {
    key: 'widow',
    title: 'Widow Support',
    text: 'Specialized support for navigating the unique challenges of losing a spouse — rebuilding identity and finding hope.',
    icon: 'rings',
  },
  {
    key: 'individual',
    title: 'Online & Individual Sessions',
    text: 'Secure, private video sessions from anywhere, or confidential in-person sessions at Toni’s Berlin office.',
    icon: 'video',
  },
  {
    key: 'speaking',
    title: 'Workshops & Speaking',
    text: 'Group workshops and professional speaking engagements that help communities and organizations understand grief.',
    icon: 'mic',
  },
];

export const HOME_FAQS = [
  {
    q: 'What is grief coaching?',
    a: 'Grief coaching is a compassionate, forward-focused partnership that helps you process loss, honor your loved one and take gentle steps toward healing, meaning and purpose.',
  },
  {
    q: 'Where are sessions held?',
    a: 'Confidential in-person sessions are held at Toni’s office in Berlin, MD. Secure online video sessions are available anywhere in Maryland and beyond.',
  },
  {
    q: 'Is there a free consultation?',
    a: 'Yes — a complimentary 30-minute consultation call lets you share what you are going through and decide whether coaching is right for you.',
  },
  {
    q: 'Is your approach faith-based?',
    a: 'Toni holds a degree in Christian studies and welcomes faith into the conversation for clients who want it, while supporting people of every background with respect.',
  },
];
