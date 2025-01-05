import { Profile } from '../types/profile';
import { Venue } from '../data/venues';
import { WhatsAppService } from './WhatsAppService';
import { DateInvitation } from '../types/invitation';

const NOTIFICATIONS_ENABLED = import.meta.env.VITE_NOTIFICATIONS_ENABLED === 'true';

export class NotificationService {
  static async sendWhatsAppNotification(invitation: DateInvitation) {
    if (!NOTIFICATIONS_ENABLED) {
      console.log('WhatsApp notifications disabled');
      return;
    }

    if (!invitation.profile.phone) {
      console.log('No phone number provided for WhatsApp notification');
      return;
    }

    const message = WhatsAppService.formatInvitationMessage(invitation);
    try {
      return await WhatsAppService.sendMessage(invitation.profile.phone, message);
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
      // Don't throw the error to prevent breaking the invitation flow
    }
  }

  static async sendEmailNotification(invitation: DateInvitation) {
    if (!NOTIFICATIONS_ENABLED) {
      console.log('Email notifications disabled');
      return;
    }

    if (!invitation.profile.email) {
      console.log('No email provided for email notification');
      return;
    }

    // TODO: Integrate with email service (e.g., SendGrid)
    console.log('Email notification sent:', {
      to: invitation.profile.email,
      subject: '💝 New Date Invitation from Date4U',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
              .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #fff; }
              .profile { display: flex; align-items: center; margin: 20px 0; }
              .profile img { width: 80px; height: 80px; border-radius: 50%; margin-right: 15px; }
              .details { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
              .button { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 5px; }
              .accept { background: #22c55e; color: white; }
              .decline { background: #ef4444; color: white; }
              .footer { text-align: center; padding: 20px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Date Invitation! 💝</h1>
              </div>
              
              <div class="content">
                <div class="profile">
                  <img src="${invitation.sender.photos[0]}" alt="${invitation.sender.name}" />
                  <div>
                    <h2>${invitation.sender.name}, ${invitation.sender.age}</h2>
                    <p>${invitation.sender.bio}</p>
                  </div>
                </div>

                <div class="details">
                  <h3>Date Details</h3>
                  <p><strong>Type:</strong> ${invitation.dateType.toUpperCase()} Date</p>
                  <p><strong>Date:</strong> ${invitation.date}</p>
                  <p><strong>Time:</strong> ${invitation.timeSlot}</p>
                  <p><strong>Venue:</strong> ${invitation.venue.name}</p>
                  <p><strong>Location:</strong> ${invitation.venue.location}</p>
                  
                  <p><strong>Your Incentive:</strong> ${
                    invitation.dateType === 'coffee' ? 'KES 500' :
                    invitation.dateType === 'dinner' ? 'KES 1,000' :
                    'KES 10,000'
                  }</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                  <a href="[Accept Link]" class="button accept">Accept Invitation</a>
                  <a href="[Decline Link]" class="button decline">Decline</a>
                </div>

                <p style="color: #ef4444; text-align: center; margin-top: 20px;">
                  Please respond within 5 minutes
                </p>
              </div>

              <div class="footer">
                <p>© 2024 Date4U. All rights reserved.</p>
                <p>This is a private invitation. Please do not share.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });
  }
}