# Business Templates

This directory contains landing page templates for different business types.

## Current Templates

### ✅ SalonTemplate
- **Business Type**: `salon`
- **Features**: 
  - Beautiful pink/purple gradient design
  - Services showcase with pricing and duration
  - Operating hours display
  - Contact information with click-to-call/WhatsApp
  - Social media links
  - Responsive design
  - Professional salon-focused styling

## Planned Templates

### 🚧 Coming Soon
- **TutorTemplate** - For tutoring services
- **BoutiqueTemplate** - For fashion/retail businesses  
- **GymTemplate** - For fitness centers
- **RestaurantTemplate** - For restaurants and cafes
- **DefaultTemplate** - Generic template for 'other' business types

## Template Structure

Each template receives a `Business` object with the following data:
- `businessName` - Name of the business
- `businessType` - Type (salon, tutor, boutique, gym, restaurant, other)
- `tagline` - Business tagline/slogan
- `description` - Business description
- `services[]` - Array of services with name, description, price, duration
- `contact` - Contact information (phone, email, address, whatsapp, socialLinks)
- `operatingHours` - Opening hours for each day of the week

## Usage

Templates are automatically selected based on the `businessType` field in the public business page at `/[username]`.

```tsx
// Example usage in [username]/page.tsx
if (publicBusiness.businessType === 'salon') {
  return <SalonTemplate business={publicBusiness} />;
}
```