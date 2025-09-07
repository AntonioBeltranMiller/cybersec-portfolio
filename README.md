# Cybersecurity Portfolio - Antonio Beltran-Miller

Professional portfolio website showcasing cybersecurity expertise, incident response experience, and security research projects.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free)

### Installation

1. **Clone and Setup**
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cybersec-portfolio.git
cd cybersec-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

2. **Open browser**
Navigate to `http://localhost:3000`

## 📸 Adding Your Screenshots

### Project Images
Place your screenshots in the following structure:
```
public/
└── images/
    └── projects/
        ├── npm-vuln-1.png
        ├── npm-vuln-2.png
        ├── certprotector-dashboard.png
        ├── certprotector-alerts.png
        ├── certprotector-arch.png
        ├── soc-lab-network.png
        ├── soc-lab-splunk.png
        ├── soc-lab-alerts.png
        ├── tpot-dashboard.png
        ├── tpot-attacks.png
        ├── tpot-analysis.png
        ├── cybershell-arch.png
        └── cybershell-scan.png
```

### Screenshot Guidelines
- **Resolution**: 1920x1080 or 1280x720
- **Format**: PNG or JPG (PNG preferred for technical content)
- **File size**: Optimize to under 500KB each
- **Naming**: Use descriptive names matching the array in `page.tsx`

### Capturing Good Screenshots

#### For T-Pot Honeypot:
1. Let it run for 48+ hours to collect real data
2. Capture:
   - Main dashboard with attack statistics
   - World map showing attack origins
   - Top attacked services
   - Kibana queries showing specific attacks
   - IOC extraction results

#### For SOC Lab:
1. Populate Splunk with meaningful data
2. Capture:
   - Network diagram (use draw.io or similar)
   - Splunk dashboard with alerts
   - Custom detection rule examples
   - Search queries in action
   - Alert details

#### For CertProtector:
1. Add test domains
2. Capture:
   - Dashboard overview
   - Alert configuration
   - API documentation
   - Architecture diagram
   - Sample alert emails

## 🎨 Customization

### Updating Content

#### Personal Information
Edit `app/page.tsx` and update:
- Name and title
- Email and social links
- Bio and descriptions

#### Projects
Modify the `projects` array in `app/page.tsx`:
```typescript
const projects = [
  {
    id: 'your-project',
    title: 'Project Name',
    description: 'What it does',
    impact: 'Business value',
    tags: ['Tech', 'Stack'],
    images: ['/images/projects/your-image.png'],
    liveDemo: 'https://your-demo.com',
    github: 'https://github.com/your-repo',
  }
]
```

#### Skills
Update `components/SkillsMatrix.tsx` with your skill levels and related projects.

#### Experience
Modify `components/Timeline.tsx` with your work history.

### Color Scheme
Edit the color variables in `app/globals.css` or individual components:
```css
/* Cyan theme (current) */
--primary: #00D4FF;
--success: #00FF88;

/* Alternative themes */
/* Purple theme */
--primary: #8B5CF6;
--success: #10B981;

/* Blue theme */
--primary: #3B82F6;
--success: #10B981;
```

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Click "Deploy"

3. **Custom Domain (Optional)**
- In Vercel dashboard, go to Settings > Domains
- Add your custom domain
- Update DNS records as instructed

### Environment Variables (Optional)
If you add features requiring secrets:
1. Create `.env.local` for local development
2. Add to Vercel dashboard under Settings > Environment Variables

## 📝 Adding Blog Posts

Create new blog posts by adding folders under `app/blog/`:

```typescript
// app/blog/your-post/page.tsx
export default function YourPost() {
  return (
    <article>
      <h1>Your Post Title</h1>
      {/* Your content */}
    </article>
  )
}
```

## 🔒 Security Considerations

- Never commit sensitive data or real IP addresses
- Sanitize all screenshots to remove:
  - Client information
  - Real IP addresses
  - Sensitive file paths
  - API keys or tokens
- Use placeholder data for demos

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Professional Tips

1. **Before the Interview**
   - Test the site on mobile (interviewers might pull it up on their phone)
   - Ensure all links work
   - Have a PDF resume ready at `/public/resume.pdf`
   - Test load times (use Lighthouse)

2. **Image Optimization**
   - Use [TinyPNG](https://tinypng.com/) to compress images
   - Consider using Next.js Image component for automatic optimization
   - Add blur placeholders for better UX

3. **Content Tips**
   - Keep descriptions concise but impactful
   - Use metrics wherever possible
   - Focus on business impact, not just technical details
   - Update the "Currently Learning" section regularly

## 📞 Support

For questions or issues, feel free to reach out:
- Email: antoniobeltranmiller@gmail.com
- LinkedIn: [Antonio Beltran-Miller](https://linkedin.com/in/antoniobeltran-miller)

---
