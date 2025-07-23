# 🚀 Preronaa

Preronaa is your aesthetic digital pinboard — think Pinterest with a chill twist. Save your favorite images or pins, drop captions, vibe with others through likes and comments, and keep your profile as fresh as your feed. Built with cutting-edge tech, full of useful features, and designed for modern creators.

---

## 📸 Features

### 🔐 Authentication via NextAuth

### 📌 Pin Management
- Create, Edit, Delete Pins (only your own)
- Add captions to each pin
- Upload images with Cloudinary

### ❤️ Interactions
- Like / Dislike any pin
- Comment on pins
- Delete your own comments

### 🧑‍💼 User Profiles
- Name, Username, Avatar, and Bio
- Edit profile details anytime
- View followers & following counts

### 🔍 Search & Explore
- Search for pins or users
- Pagination for search results if content overflows

### 👥 Social Stuff
- Follow and unfollow users
- View follower/following on profiles

### 🔁 Password Reset
- Forgot password? No worries, reset via email

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| **Next.js 15** | Core framework |
| **Tailwind CSS** | Styling like a breeze |
| **shadcn/ui** | Sleek UI components |
| **React Hook Form + Zod** | Form handling + validation |
| **NextAuth** | Authentication & sessions |
| **MongoDB + Mongoose** | Database & ODM |
| **Cloudinary** | Image upload & storage |
| **Nodemailer** | Email service (for password reset) |
| **bcryptjs** | Password hashing & security |

---

## 🔧 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/preronaa.git

# 2. Install dependencies
cd preronaa
npm install

# 3. Create .env file and add environment variables
# e.g. NEXTAUTH_SECRET, MONGODB_URI, CLOUDINARY creds, etc.

# 4. Run the dev server
npm run dev
