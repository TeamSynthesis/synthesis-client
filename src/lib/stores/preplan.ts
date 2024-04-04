import { writable } from "svelte/store"

export type Preplan = {
      "overview": {
        "description": string,
        "suggestedNames": {
            "name": string,
            "reason": string
          }[],
        "suggestedDomains": {
            "name": string,
            "reason": string,
          }[]
      },
      "competitiveAnalysis": {
        "competitors": {
            "name": string,
            "size": string,
            "reviewSentiment": number,
            "features": string[],
            "pricingModel": string,
            "url": string,
            "description": string,
            "logoUrl": String
          }[],
        "swot": {
          "strengths": string[],
          "weaknesses": string[],
          "opportunities": string[],
          "threats": string[]
        },
        "targetAudience": {
          "demographics": {
            "age": string
          }
        }
      },
      "branding": {
        "icon": {
          "imgUrl": string,
          "description": string,
        },
        "slogan": string,
        "wireframe": {
          "screen": string,
          "image": {
            "imgUrl": string,
            "description": string
          }
        },
        "moodBoard": {
          "imgUrl": string,
          "description": string,
        },
        "palette": {
          "primary": {
                "Name": string,
            "Color": string
          },
          "secondary": {
            "Name": string,
            "Color": string
          },
          "accent": {
            "Name": string,
            "Color": string
          },
          "previewUrl": string,
          "reason": string,
        },
        "typography": {
          "font": string,
          "reason": string,
        }
      },
      "features": {
        "name": string,
        "description": string,
        "type": number,
        "tasks":
          {
            "activity": string,
            "priority": number
          }[]
        
      }[]
    }
  

 const preplan = writable<Preplan|null>(null);
 export default preplan