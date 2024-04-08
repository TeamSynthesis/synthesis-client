import getPreplan from '$lib/services/project/get-preplan';
import type { RequestHandler } from './$types';
import type {Preplan} from "$lib/stores/preplan";

export const POST: RequestHandler = async (e) => {
    const preplan = await getPreplan({processId: e.params.pp_id}, e);
    if(preplan.ok === true)
    return new Response(JSON.stringify(preplan.val), {
        status: 200,
      })
    // return new Response(JSON.stringify(
    //   {data:mockData,isSuccess:true, message:"project generated successfully" })
    //   ,{status:200})

    return new Response(JSON.stringify({status: "error", errors: [preplan.val]}), {
        status: 500
      })
};
const mockData:Preplan ={
  "overview": {
    "description": "InterestMatch is a mobile and web application designed to connect individuals based on shared interests, hobbies, or passions. By creating a profile and selecting from a variety of interest categories, users are matched with others who have similar preferences. The app includes features like messaging, event creation, and community boards to foster interaction and meetups in a safe and friendly environment. It aims to enhance social connectivity and enable users to find like-minded peers for activities, learning, and friendship.",
    "suggestedNames": [
      {
        "name": "HobbyLink",
        "reason": "The name suggests a connection between hobbies, indicating the app's purpose of linking people with shared interests."
      },
      {
        "name": "PassionPals",
        "reason": "This name conveys the idea of finding companionship through shared passions."
      },
      {
        "name": "IntersectConnect",
        "reason": "A portmanteau that signifies the intersection of interests and the connection it brings."
      },
      {
        "name": "AffinitySphere",
        "reason": "The term 'affinity' reflects similarity, while 'sphere' suggests a global or comprehensive scope."
      }
    ],
    "suggestedDomains": [
      {
        "name": "HobbyLinkApp.com",
        "reason": "The '.com' extension is popular and easy to remember. Estimated price: $10-20/year."
      },
      {
        "name": "PassionPals.io",
        "reason": "The '.io' extension is trendy among tech startups. Estimated price: $30-50/year."
      },
      {
        "name": "IntersectConnect.net",
        "reason": "The '.net' extension is a classic alternative to '.com'. Estimated price: $10-15/year."
      },
      {
        "name": "AffinitySphere.org",
        "reason": "The '.org' extension could be used to emphasize a community-centric platform. Estimated price: $10-20/year."
      }
    ]
  },
  "competitiveAnalysis": {
    "competitors": [
      {
        "name": "Meetup",
        "size": "Large",
        "reviewSentiment": 7.5,
        "features": [
          "Event Creation",
          "Interest Groups",
          "Local Meetups",
          "Member Messaging"
        ],
        "pricingModel": "Freemium",
        "url": "https://www.meetup.com",
        "description": "Meetup connects people with similar interests through group events and gatherings.",
        "logoUrl": "https://logo.clearbit.com/meetup.com"
      },
      {
        "name": "Eventbrite",
        "size": "Large",
        "reviewSentiment": 8,
        "features": [
          "Event Management",
          "Ticketing",
          "Interest-based Search",
          "Social Sharing"
        ],
        "pricingModel": "Freemium",
        "url": "https://www.eventbrite.com",
        "description": "Eventbrite offers a platform for event management and ticketing, often used for interest-based events and networking.",
        "logoUrl": "https://logo.clearbit.com/eventbrite.com"
      },
      {
        "name": "Bumble BFF",
        "size": "Medium",
        "reviewSentiment": 6.5,
        "features": [
          "Swipe to Connect",
          "Interest Tags",
          "Friendship-focused",
          "Profile Customization"
        ],
        "pricingModel": "Free with In-App Purchases",
        "url": "https://bumble.com/bff",
        "description": "Bumble BFF is a mode within Bumble that allows users to connect with new friends based on shared interests.",
        "logoUrl": "https://logo.clearbit.com/bumble.com"
      },
      {
        "name": "Patook",
        "size": "Small",
        "reviewSentiment": 6,
        "features": [
          "Platonic Matchmaking",
          "Interest Points System",
          "Messaging",
          "User Verification"
        ],
        "pricingModel": "Free",
        "url": "https://www.patook.com",
        "description": "Patook is an app designed for making platonic friends with a points system to match users based on shared interests.",
        "logoUrl": "https://logo.clearbit.com/patook.com"
      }
    ],
    "swot": {
      "strengths": [
        "Targeting niche interests",
        "Facilitates real-world connections",
        "Customizable user profiles"
      ],
      "weaknesses": [
        "Potential safety concerns",
        "Privacy issues",
        "Dependency on user base for content"
      ],
      "opportunities": [
        "Growing interest in community building",
        "Partnerships with local businesses and event spaces",
        "Expansion into dating or professional networking"
      ],
      "threats": [
        "Established competitors with large user bases",
        "Social media platforms integrating similar features",
        "Changes in social behavior post-pandemic"
      ]
    },
    "targetAudience": {
      "demographics": {
        "age": "18-50"
      }
    }
  },
  "branding": {
    "icon": {
      "imgUrl": "https://dalleproduse.blob.core.windows.net/private/images/11531790-6663-4609-b35b-8c301dbc2037/generated_00.png?se=2024-04-06T20%3A11%3A58Z&sig=shPwN1bjo%2BIp7nVbkEuJyxgDVYMSUGcVRR91p2ie4c4%3D&ske=2024-04-11T16%3A21%3A03Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-04-04T16%3A21%3A03Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02",
      "description": "The app icon features the initials 'ME' in a bold and modern font, representing the individuality and personal connection the app facilitates. The icon is set against a solid white background, symbolizing simplicity and purity."
    },
    "slogan": "Connect. Discover. Share.",
    "wireframe": {
      "screen": "Home",
      "image": {
        "imgUrl": "https://dalleproduse.blob.core.windows.net/private/images/cde843e1-c8fc-4372-a541-1b97fe1b086b/generated_00.png?se=2024-04-06T20%3A12%3A09Z&sig=xp1wevQVHLHz1Lv2LeUFFyeJeTTwlb7yjCp86MQF0Bk%3D&ske=2024-04-12T11%3A49%3A42Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-04-05T11%3A49%3A42Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02",
        "description": "The wireframe showcases the Home screen of the app. The primary color teal-500 is used for the header and navigation elements, creating a consistent and intuitive user experience. The secondary color indigo-500 is used for the background of the content area, providing a visually appealing contrast. The accent color pink-500 is used for interactive buttons and highlighting important elements, adding a touch of vibrancy to the design."
      }
    },
    "moodBoard": {
      "imgUrl": "https://dalleproduse.blob.core.windows.net/private/images/09c1b90e-7d55-4758-953e-82373da8c8bf/generated_00.png?se=2024-04-06T20%3A12%3A20Z&sig=YtqcGZqybn93kI7DZ1cjcZxFIgf1yjbSPUPwpv7Ro8M%3D&ske=2024-04-11T16%3A21%3A03Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-04-04T16%3A21%3A03Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02",
      "description": "The moodboard captures the essence of the app, showcasing images of people with similar interests engaging in activities together. The primary color teal-500 is used as the dominant color, representing the core values of trust and connection. The secondary color indigo-500 is reflected in images of diverse hobbies and interests, highlighting the app's ability to bring people together based on shared passions. The accent color pink-500 is used sparingly to add pops of excitement and energy to the moodboard."
    },
    "palette": {
      "primary": {
        "Name": "teal-500",
        "Color": "06b6d4"
      },
      "secondary": {
        "Name": "indigo-500",
        "Color": "6366f1"
      },
      "accent": {
        "Name": "pink-500",
        "Color": "ec4899"
      },
      "previewUrl": "https://coolors.co/visualizer/06b6d4-6366f1-ec4899",
      "reason": "The primary color teal-500 represents a sense of trust and reliability, which is essential for an app that helps people meet. The secondary color indigo-500 conveys a sense of creativity and uniqueness, making it an ideal choice to showcase the diverse interests of the app users. The accent color pink-500 adds a touch of playfulness and excitement, making the app visually appealing and engaging."
    },
    "typography": {
      "font": "Poppins",
      "reason": "Poppins is a versatile and modern typeface that offers excellent readability across different devices. Its clean and rounded letterforms convey a sense of friendliness and approachability, aligning with the app's purpose of connecting people with shared interests."
    }
  },
  "features": [
    {
      "name": "User Registration and Authentication",
      "description": "Allow users to create an account and login to the application",
      "type": 0,
      "tasks": [
        {
          "activity": "Implement user registration functionality",
          "priority": 1
        },
        {
          "activity": "Implement user login functionality",
          "priority": 1
        }
      ]
    },
    {
      "name": "User Profile Management",
      "description": "Enable users to manage their profile information and preferences",
      "type": 0,
      "tasks": [
        {
          "activity": "Implement user profile creation and editing functionality",
          "priority": 1
        },
        {
          "activity": "Implement profile picture upload functionality",
          "priority": 1
        }
      ]
    },
    {
      "name": "Interest Creation and Management",
      "description": "Allow users to create and manage their interests",
      "type": 0,
      "tasks": [
        {
          "activity": "Implement interest creation functionality",
          "priority": 1
        },
        {
          "activity": "Implement interest editing and deletion functionality",
          "priority": 1
        }
      ]
    },
    {
      "name": "Matching Algorithm",
      "description": "Develop an algorithm to match users based on their interests",
      "type": 0,
      "tasks": [
        {
          "activity": "Research and design a matching algorithm",
          "priority": 2
        },
        {
          "activity": "Implement the matching algorithm",
          "priority": 2
        }
      ]
    },
    {
      "name": "User Search",
      "description": "Enable users to search for other users based on their interests",
      "type": 1,
      "tasks": [
        {
          "activity": "Implement user search functionality",
          "priority": 1
        },
        {
          "activity": "Optimize search algorithm for performance",
          "priority": 2
        }
      ]
    },
    {
      "name": "Chat and Messaging",
      "description": "Allow users to communicate with each other through chat and messaging features",
      "type": 1,
      "tasks": [
        {
          "activity": "Implement real-time chat functionality",
          "priority": 1
        },
        {
          "activity": "Implement messaging features like sending images and emojis",
          "priority": 2
        }
      ]
    },
    {
      "name": "Notifications",
      "description": "Implement notification system to inform users about new matches, messages, etc.",
      "type": 1,
      "tasks": [
        {
          "activity": "Develop notification system",
          "priority": 2
        },
        {
          "activity": "Implement push notifications for mobile devices",
          "priority": 2
        }
      ]
    },
    {
      "name": "Privacy and Security",
      "description": "Ensure user data is secure and implement privacy settings",
      "type": 1,
      "tasks": [
        {
          "activity": "Implement password hashing and encryption",
          "priority": 2
        },
        {
          "activity": "Allow users to manage privacy settings",
          "priority": 2
        }
      ]
    },
    {
      "name": "Social Media Integration",
      "description": "Integrate the app with social media platforms for easy sharing and login",
      "type": 2,
      "tasks": [
        {
          "activity": "Implement social media login functionality",
          "priority": 2
        },
        {
          "activity": "Enable users to share their interests on social media",
          "priority": 2
        }
      ]
    },
    {
      "name": "Location-Based Matching",
      "description": "Develop a feature to match users based on their location",
      "type": 2,
      "tasks": [
        {
          "activity": "Integrate with location services API",
          "priority": 2
        },
        {
          "activity": "Implement location-based matching algorithm",
          "priority": 2
        }
      ]
    }
  ]
}