import { DateInvitation } from '../types/invitation';

const WAHA_API_URL = import.meta.env.VITE_WAHA_API_URL || 'http://localhost:3000';

export class WhatsAppService {
  static async sendMessage(phone: string, message: string) {
    if (!phone) {
      throw new Error('Phone number is required');
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      throw new Error('Invalid phone number format');
    }

    try {
      const response = await fetch(`${WAHA_API_URL}/api/sendText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: cleanPhone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send WhatsApp message');
      }

      return await response.json();
    } catch (error) {
      console.error('WhatsApp notification error:', error);
      throw error;
    }
  }

  static formatInvitationMessage(invitation: DateInvitation): string {
    if (!invitation || !invitation.sender || !invitation.venue) {
      throw new Error('Invalid invitation data');
    }

    return `🎉 *New Date Invitation!* 🎉

*From:* ${invitation.sender.name}, ${invitation.sender.age}
${invitation.sender.bio}

*Date Details:*
📅 Date: ${invitation.date}
⏰ Time: ${invitation.timeSlot}
🏢 Venue: ${invitation.venue.name}
📍 Location: ${invitation.venue.location}
💝 Type: ${invitation.dateType.toUpperCase()} Date

*Your Incentive:* ${
  invitation.dateType === 'coffee' ? 'KES 500' :
  invitation.dateType === 'dinner' ? 'KES 1,000' :
  'KES 10,000'
}

*To respond:*
✅ Reply "YES" to accept
❌ Reply "NO" to decline

⏰ Your response is required within 5 minutes.

View full profile and details at: [Profile Link]`;
  }
}