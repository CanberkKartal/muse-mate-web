# MuseMate MVP Setup Guide

This is a functional MVP of MuseMate - a personalized museum exploration application. The application includes all core features: user authentication, museum browsing, tour creation, and tour management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or later
- npm 9.6.0 or later
- A Supabase account and project

### 1. Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

### 2. Database Setup

1. In your Supabase project dashboard, go to the SQL editor
2. Run the `schema.sql` file to create all tables and setup Row Level Security
3. Run the `sample-data.sql` file to populate with sample museums and sections

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features Implemented

### Core Functionality ✅
- **User Authentication**: Complete sign up, sign in, and user management
- **Museum Discovery**: Browse museums with search and filtering
- **Museum Details**: View detailed museum information with sections and key objects
- **Tour Creation**: Create personalized tours by selecting museum sections
- **Tour Management**: View, manage, and delete personal tours
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Database Schema ✅
- Museums table with metadata
- Sections table with floor organization
- Key objects table with descriptions
- Tours table with user ownership
- Tour sections table for many-to-many relationships
- Row Level Security (RLS) policies for data protection

### Authentication & Security ✅
- Supabase Auth integration
- JWT-based session management
- Protected routes and API calls
- Row-level security for data access

### UI/UX ✅
- Modern, clean interface using shadcn/ui components
- Interactive section selection for tour creation
- Floor-based organization of museum sections
- Search functionality for museums and tours
- Loading states and error handling

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── museum/            # Museum-specific components
│   ├── tour/              # Tour-specific components
│   └── layout/            # Layout components
├── lib/
│   ├── services/          # Data access services
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── context/               # React context providers
```

## 🧪 Testing the Application

### 1. User Registration/Login
- Visit `/register` to create a new account
- Use `/login` to sign in with existing credentials
- Authentication state persists across sessions

### 2. Museum Exploration
- Browse museums at `/museums`
- Search for museums by name, city, or theme
- Click "Explore" to view detailed museum information
- View sections organized by floor with key objects

### 3. Tour Creation
- From any museum detail page, click "Create Tour"
- Give your tour a name
- Select sections you want to include by clicking on them
- Click "Create Tour" to save

### 4. Tour Management
- Visit `/tours` to see all your created tours
- Search through your tours
- View detailed tour itineraries with step-by-step section visits
- Delete tours you no longer need

### 5. Profile Management
- Access your profile at `/profile`
- View account information and tour statistics
- Quick access to main application features

## 🗄️ Sample Data

The application includes sample data for:
- **3 Museums**: The Met (NYC), Natural History Museum (NYC), The Louvre (Paris)
- **12 Sections**: 4 sections per museum across different floors
- **20+ Key Objects**: Notable artifacts and artworks in each section

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically with git pushes

## 🎯 Core Value Proposition Delivered

✅ **Museum Discovery**: Users can easily browse and discover museums with rich information
✅ **Personalized Tours**: Create custom tours by selecting specific sections of interest
✅ **Tour Management**: Save, view, and manage multiple personalized museum tours
✅ **User-Friendly Interface**: Intuitive, responsive design that works across devices
✅ **Data Organization**: Clear floor-based organization with key objects highlighted

## 📝 Next Steps for Production

While this MVP demonstrates all core functionality, consider these enhancements for production:

- Add image uploads for museums and key objects
- Implement tour sharing between users
- Add visit tracking and history
- Include directions and navigation within museums
- Add museum reviews and ratings
- Implement social features like following other users
- Add museum opening hours and ticket information
- Include accessibility information for different sections

The foundation is solid and the architecture is scalable for future enhancements!