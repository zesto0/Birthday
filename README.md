# 💛 Birthday Website - Setup & Customization Guide

## 🎁 What You've Got

A complete, ready-to-deploy birthday website with:
- **index.html** - The main HTML structure
- **styles.css** - All the beautiful styling (mobile-first!)
- **script.js** - Interactive features (lightbox, animations)
- **README.md** - This guide

## 🎨 How to Customize

### 1. Add Your Personal Message
Open `index.html` and look for these comments:
- `<!-- Replace this with your personal message paragraph 1 -->`
- `<!-- Replace this with your personal message paragraph 2 -->`

Replace the placeholder text with your heartfelt message.

### 2. Add Your Photos or Videos

#### For Photos:
1. Create a folder called `images` in the same directory as index.html
2. Add your photos (recommended: 400x300px minimum, JPEG/PNG format)
3. In `index.html`, replace the placeholder image URLs:
   ```html
   <!-- Replace: -->
   src="https://via.placeholder.com/400x300/..."
   
   <!-- With: -->
   src="images/your-photo-name.jpg"
   ```

#### For Videos:
1. Create a folder called `videos` in the same directory as index.html
2. Add your videos (MP4 format recommended)
3. In `index.html`, uncomment the video code and remove the image:
   ```html
   <!-- Remove the comment tags and add your video -->
   <video class="memory-video" controls autoplay muted loop playsinline>
       <source src="videos/your-video.mp4" type="video/mp4">
       Your browser does not support the video tag.
   </video>
   
   <!-- Delete or comment out the img tag --
   ```

### 3. Update Photo Captions
Look for `<!-- Replace with your caption -->` comments and add your memories.

### 4. Personalize the Streaming Section
- Update the time: Change "Tonight at 8PM"
- Update the streaming link: Replace `href="#"` with your Teleparty/streaming link
- Modify the snacks message as needed

### 5. Add Your Name
Find `<!-- Replace [Your Name] with your actual name -->` and update it.

## 🚀 How to Deploy

### Option 1: GitHub Pages (Free & Easy)
1. Create a GitHub account if you don't have one
2. Create a new repository (name it something like "birthday-surprise")
3. Upload all files (index.html, styles.css, script.js, and your images folder)
4. Go to Settings → Pages
5. Set Source to "Deploy from a branch" → Main → Root
6. Wait 2-3 minutes, your site will be live at: `https://[your-username].github.io/[repository-name]`

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com)
2. Drag your entire project folder to the deployment area
3. Get instant URL
4. (Optional) Create account to customize the URL

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy with one click

## 📱 Testing Your Site

Before sharing, test on:
- Your phone (most important!)
- Different browsers
- Different screen sizes

Quick test: Open `index.html` directly in your browser by double-clicking it.

## 🖼️ Image Optimization Tips

For best performance:
1. Use [TinyPNG.com](https://tinypng.com) to compress images
2. Keep images under 500KB each
3. Use JPEG for photos, PNG for graphics with transparency
4. Ideal dimensions: 800-1200px width

## 🎭 Optional Customizations

### Change Colors
In `styles.css`, update these color values:
```css
/* Primary background */
#FFF4E6 → Your color choice

/* Accent colors */
#FFE1A8 → Your accent color 1
#FADADD → Your accent color 2
```

### Remove Memory Cards
If you only want 3 photos instead of 5, simply delete the entire `<div class="memory-card">...</div>` blocks you don't need.

### Change Fonts
Replace the Google Fonts in `index.html` `<head>` section with your choices from [fonts.google.com](https://fonts.google.com)

## 📝 Checklist Before Sharing

- [ ] All placeholder text replaced
- [ ] All photos added and working
- [ ] Streaming link updated
- [ ] Your name added
- [ ] Tested on mobile
- [ ] Site deployed and link works

## 💝 Final Tips

1. **Keep it personal** - The placeholder text is just an example. Write from your heart!
2. **Quality over quantity** - 3 great photos are better than 5 okay ones
3. **Test the surprise** - Open the link in incognito/private mode to see it fresh
4. **Save the moment** - Take a screenshot of her reaction when she sees it!

## 🆘 Troubleshooting

**Images not showing?**
- Check file paths (case-sensitive!)
- Make sure images are in the `images` folder
- Use forward slashes: `images/photo.jpg` not `images\photo.jpg`

**Animations not working?**
- Make sure `script.js` is in the same folder as `index.html`
- Check browser console for errors (F12 → Console)

**Site looks broken?**
- Ensure all three files (HTML, CSS, JS) are in the same folder
- Check that file names match exactly in the HTML

---

Made with love for your special someone 💛
Good luck with your birthday surprise!
