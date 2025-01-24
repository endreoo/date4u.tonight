import { Profile } from '../types/profile';

interface AIProfileGenerationParams {
  keywords: string[];
  gender: 'man' | 'woman';
  ageRange: {
    min: number;
    max: number;
  };
}

interface DeepseekResponse {
  bio: string;
  interests: string[];
  dateTypes: string[];
}

export class AIProfileService {
  // Temporarily using mock data for testing
  private static readonly MOCK_RESPONSE = {
    bio: "Hey there! I'm an adventurous soul with a creative spirit. Whether I'm exploring hidden trails, crafting unique art pieces, or trying out new cuisines, I'm always up for an exciting experience. My passion for creativity shows in everything I do - from my photography to my experimental cooking. I believe life is about collecting moments, not things, and I'm looking for someone who shares my enthusiasm for discovery and spontaneity. When I'm not working on my latest creative project, you'll find me planning my next adventure or learning a new skill.",
    dateTypes: ["coffee", "dinner"],
    interests: ["photography", "hiking", "cooking", "art"]
  };

  static async generateProfile(params: AIProfileGenerationParams): Promise<Partial<Profile>> {
    try {
      // Using mock response for testing
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const mockResponse = JSON.stringify(this.MOCK_RESPONSE);
      const aiResponse = mockResponse;
      
      // Parse the AI response to extract profile information
      const parsedResponse = this.parseAIResponse(aiResponse);
      
      return {
        bio: parsedResponse.bio,
        dateTypes: parsedResponse.dateTypes,
        availability: {
          days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
          timeSlots: ['19:00', '20:00']
        }
      };
    
    } catch (error) {
      console.error('AI Profile generation error:', error);
      throw error;
    }
  }

  private static constructPrompt(params: AIProfileGenerationParams): string {
    const { keywords, gender, ageRange } = params;
    return `Generate a dating profile in JSON format for a ${gender} between ${ageRange.min}-${ageRange.max} years old with the following characteristics: ${keywords.join(', ')}. The response should be in this exact format: {"bio": "[engaging bio text]", "dateTypes": ["preferred date types from: coffee, dinner, or VIP"]}. Make the bio engaging and natural, around 150-200 words.`;
  }

  private static parseAIResponse(response: string): DeepseekResponse {
    try {
      const parsed = JSON.parse(response);
      return {
        bio: parsed.bio,
        dateTypes: parsed.dateTypes.filter(type => ['coffee', 'dinner', 'vip'].includes(type.toLowerCase())),
        interests: parsed.interests || []
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Failed to generate profile: Invalid response format');
    }
  }
}